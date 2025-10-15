// Allow overriding the API base URL at build time using Vite's import.meta.env
// For local development set VITE_API_BASE_URL to "http://localhost:5000/api"
const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL as string) || "https://peekuthonbybindu.onrender.com/api";

export default API_BASE_URL;
