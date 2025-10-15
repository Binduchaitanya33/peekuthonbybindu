Local development notes

Frontend / Backend local development

- The frontend will call the API base defined by `VITE_API_BASE_URL`. By default it uses the deployed URL. For local development set (PowerShell):

  $env:VITE_API_BASE_URL = "http://localhost:5000/api"

  Then start the frontend from the `frontend` folder (for example `npm run dev`) so Vite injects the variable.

- Start the backend server from `career-gps-backend` with `npm run dev` (requires Node and MongoDB). The backend listens on port 5000 by default.

Signup fix notes

- The signup request no longer sets the `Origin` header from the browser (browsers block scripts from setting 'Origin').
- The backend now returns HTTP 409 on duplicate email which the frontend recognizes and shows a clear message.

Quick test tips

- Health check:
  Invoke-WebRequest -Uri http://localhost:5000/api/health -UseBasicParsing | Select-Object -ExpandProperty Content

- Register via curl (PowerShell using curl alias):
  curl -Method POST -Uri http://localhost:5000/api/auth/register -ContentType 'application/json' -Body '{"name":"Test","email":"test@example.com","password":"password123","role":"student"}'

