Run the AI predictor Flask app locally

Prereqs:
- Python 3.8+
- Create and activate a virtual environment

Install dependencies:

# Windows PowerShell
python -m venv .venv; .\.venv\Scripts\Activate.ps1; python -m pip install --upgrade pip; pip install -r requirements.txt

Run the app (will listen on port 5003):

# Windows PowerShell
python app.py

Notes:
- Ensure `model.joblib` and `Master_Skills_Dictionary.csv` are present in this folder.
- If you want to run the Flask app in the background, consider using a process manager or Windows service.
- The frontend expects the AI API at http://localhost:5003 by default or you can set `VITE_AI_URL` in the frontend environment.
