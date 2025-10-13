import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobGuidance from './pages/JobGuidance';
import StudyMaterials from './pages/StudyMaterials';
import VacancyTracker from './pages/VacancyTracker';
import MentorConnect from './pages/MentorConnect';
import AISuccessPredictor from './pages/AISuccessPredictor';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Router>
        <div className="animate-fade">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-guidance" element={<JobGuidance />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/vacancy-tracker" element={<VacancyTracker />} />
            <Route path="/mentor-connect" element={<MentorConnect />} />
            <Route path="/ai-success-predictor" element={<AISuccessPredictor />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
