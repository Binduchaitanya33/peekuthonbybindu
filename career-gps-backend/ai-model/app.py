import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from scipy.sparse import csr_matrix, hstack
import warnings
import pandas as pd
import os

warnings.filterwarnings('ignore')

# --- 1. SETUP AND LOAD ARTIFACTS ---
app = Flask(__name__)
CORS(app) # Enable CORS for frontend communication

# Define paths
# Note: Ensure the 'ai-model' folder exists and Master_Skills_Dictionary.csv is in the root
# Paths (relative to this file). If artifacts are missing we'll fall back to a heuristic predictor.
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ai_success_predictor_v1.joblib')
SKILL_DICT_PATH = os.path.join(os.path.dirname(__file__), 'Master_Skills_Dictionary.csv')

# Define feature constants (MUST match your training data shape)
NUM_SKILL_FEATURES = 17994  # 17996 total - 2 dense features
NUM_DENSE_FEATURES = 2      # experience_months and education_level

# Global variables for the model and dictionaries
PREDICTOR_MODEL = None
SKILL_TO_ID_MAP = {}

# Try to load model and skill dictionary, but don't stop the server if they are missing.
try:
    if os.path.exists(MODEL_PATH):
        PREDICTOR_MODEL = joblib.load(MODEL_PATH)
        print("✅ Model loaded successfully from:", MODEL_PATH)
    else:
        print("⚠️ Model file not found, using heuristic fallback predictor.")

    if os.path.exists(SKILL_DICT_PATH):
        df_skills = pd.read_csv(SKILL_DICT_PATH)
        df_skills['skill_name_lower'] = df_skills['skill_name'].str.lower()
        SKILL_TO_ID_MAP = df_skills.set_index('skill_name_lower')['skill_ID'].to_dict()
        print(f"✅ Skills dictionary loaded: {len(SKILL_TO_ID_MAP)} skills mapped.")
    else:
        print("⚠️ Skills dictionary not found; skill name mapping will be limited.")

except Exception as e:
    print(f"❌ Warning during setup (continuing with fallback): {e}")


# --- 2. HELPER FUNCTION: FORMAT DATA ---
def prepare_input_for_model(data_json):
    """
    Converts incoming data (containing skill indices and dense features)
    into the model's required X_final format (1 row, 42068 columns).
    """
    skill_indices = data_json.get('skill_indices', [])
    data = [1] * len(skill_indices)
    rows = [0] * len(skill_indices)

    # Create the CSR matrix row (Sparse Skill Vector)
    skill_vector_sparse = csr_matrix((data, (rows, skill_indices)),
                                     shape=(1, NUM_SKILL_FEATURES),
                                     dtype=np.uint8)

    # DENSE FEATURES (Experience and Education)
    exp = data_json.get('total_experience_months', 0)
    edu = data_json.get('highest_degree_level', 0)

    X_other = np.array([[exp, edu]])

    # Combine sparse and dense features
    X_model_input = hstack((skill_vector_sparse, X_other))
    return X_model_input


def heuristic_predict_success(data_json):
    """Simple fallback heuristic when trained model is not available.
    Returns a probability between 0 and 1.
    """
    skills_raw = data_json.get('skills', '')
    skill_list = [s.strip().lower() for s in skills_raw.split(',') if s.strip()]

    # Known skill match count (if SKILL_TO_ID_MAP exists)
    known_skills = 0
    if SKILL_TO_ID_MAP:
        for s in skill_list:
            if s in SKILL_TO_ID_MAP:
                known_skills += 1
    else:
        known_skills = len(skill_list)

    exp_months = data_json.get('total_experience_months', 0)
    edu_level = data_json.get('highest_degree_level', 0)

    # scoring: base 30, + (known_skills * 10) capped, + experience factor, + education factor
    score = 30
    score += min(known_skills * 10, 40)
    score += min((exp_months / 12) * 3, 20)  # 3 points per year up to 20
    score += min(edu_level * 5, 10)

    prob = max(0.0, min(1.0, score / 100.0))
    return prob

# --- 3. API ENDPOINTS ---

@app.route('/')
def home():
    return jsonify({
        'message': 'AI Success Predictor API is running ✅',
        'available_endpoints': [
            '/api/predict_success (POST)',
            '/api/recommend_jobs (POST)'
        ]
    })

@app.route('/api/predict_success', methods=['POST'])
def predict_success():
    """Endpoint for the AI Success Predictor."""
    try:
        data = request.json
        
        # Check if the backend loaded artifacts successfully
        if not PREDICTOR_MODEL or not SKILL_TO_ID_MAP:
            return jsonify({'error': 'Backend initialization failed. Check server logs.'}), 503

        # Skill string from frontend (comma-separated)
        raw_skills_string = data.get('skills', '')

        # If model exists and we have skill ID mapping, convert to indices and use model
        if PREDICTOR_MODEL is not None and SKILL_TO_ID_MAP:
            input_skill_names = [s.strip().lower() for s in raw_skills_string.split(',') if s.strip()]
            skill_indices = []
            for name in input_skill_names:
                skill_id = SKILL_TO_ID_MAP.get(name)
                if skill_id is not None:
                    skill_indices.append(skill_id)

            input_for_prep = {
                'skill_indices': skill_indices,
                'total_experience_months': data.get('total_experience_months', 0),
                'highest_degree_level': data.get('highest_degree_level', 0)
            }

            X_input = prepare_input_for_model(input_for_prep)
            prob_success = PREDICTOR_MODEL.predict_proba(X_input)[:, 1][0]

        else:
            # Fallback heuristic predictor
            prob_success = heuristic_predict_success(data)

        return jsonify({
            'success_rate': round(float(prob_success) * 100, 2),
            'status': 'Prediction successful'
        })
    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'error': 'Prediction failed.', 'detail': str(e)}), 500


@app.route('/api/recommend_jobs', methods=['POST'])
def recommend_jobs():
    """Placeholder for recommendation engine."""
    return jsonify({
        'message': 'Recommendation service active',
        'status': 'Ready for job data integration.'
    })


# --- 4. MAIN EXECUTION ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)