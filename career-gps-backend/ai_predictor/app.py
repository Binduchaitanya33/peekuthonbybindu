
# Final Flask API for Deployment - Task 7



import joblib
import numpy as np
from flask import Flask, request, jsonify
from scipy.sparse import csr_matrix, hstack
import pandas as pd
import warnings
from flask_cors import CORS
warnings.filterwarnings('ignore')


# --- 1. SETUP AND LOAD ARTIFACTS ---
# Place this file, your model.joblib, and Master_Skills_Dictionary.csv in the same folder: ai_predictor/

app = Flask(__name__)
CORS(app)

try:
    # Load the trained model (Ensure this file is present in ai_predictor/)
    PREDICTOR_MODEL = joblib.load('model.joblib')
except FileNotFoundError:
    print("FATAL ERROR: Model file not found. Ensure 'model.joblib' is in ai_predictor/ directory.")
    exit()

# Load the skills dictionary if needed for encoding (optional, for future use)
try:
    SKILLS_DF = pd.read_csv('Master_Skills_Dictionary.csv')
except FileNotFoundError:
    SKILLS_DF = None
    print("Warning: Master_Skills_Dictionary.csv not found. Skill encoding may fail if required.")

# Define feature constants (MUST match your final training data shape)
# Based on your successful run: 42066 skills + 2 dense features
NUM_SKILL_FEATURES = 17988
NUM_DENSE_FEATURES = 2

# --- 2. HELPER FUNCTION: FORMAT DATA ---

def prepare_input_for_model(data_json):
    """
    Converts incoming JSON from frontend (skills, years_experience, highest_degree)
    into the model's required X_final format (1 row, 42068 columns).
    """
    # --- Skill Encoding ---
    # For now, expect frontend to send skill_indices (list of ints)
    skill_indices = data_json.get('skill_indices', [])
    data = [1] * len(skill_indices)
    rows = [0] * len(skill_indices)
    skill_vector_sparse = csr_matrix((data, (rows, skill_indices)),
                                      shape=(1, NUM_SKILL_FEATURES),
                                      dtype=np.uint8)

    # --- Dense Features ---
    # Accept years_experience (years, float/int) and highest_degree (int, encoded)
    years_exp = data_json.get('years_experience', 0)
    # Convert years to months for model if needed
    # Remove these lines:
    exp_months = int(float(years_exp) * 12)
    degree_level = data_json.get('highest_degree_level', 0)
    X_other = np.array([[exp_months, degree_level]])
    X_model_input = hstack((skill_vector_sparse, X_other))
    return X_model_input

# --- 3. API ENDPOINTS ---


@app.route('/api/predict_success', methods=['POST'])
def predict_success():
    """Endpoint for the AI Success Predictor."""
    try:
        data = request.json
        X_input = prepare_input_for_model(data)
        prob_success = PREDICTOR_MODEL.predict_proba(X_input)[:, 1][0]
        return jsonify({
            'success_rate': round(prob_success, 4),  # Return as 0-1 float for frontend
            'status': 'Prediction successful'
        })
    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({'error': 'Prediction failed.', 'detail': str(e)}), 500

@app.route('/api/recommend_jobs', methods=['POST'])
def recommend_jobs():
    """Endpoint for the Recommendation Engine."""
    return jsonify({
        'message': 'Recommendation service active',
        'status': 'Ready for job data integration.'
    })

# --- 4. API ENDPOINT: SKILL TO INDEX MAPPING ---
@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Return a mapping of skill name to index for frontend autocomplete and encoding."""
    if SKILLS_DF is None:
        return jsonify({'error': 'Skills dictionary not loaded.'}), 500
    # CSV columns: 'skill_name', 'skill_id'
    skills = []
    for _, row in SKILLS_DF.iterrows():
        skills.append({'skill': row['skill_name'], 'index': int(row['skill_id'])})
    return jsonify({'skills': skills})



if __name__ == '__main__':
    # Running this will expose the API locally for testing
    app.run(host='0.0.0.0', port=5003)
