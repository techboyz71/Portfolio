import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginView from "./views/LoginView";
import DashViewPatient from "./views/DashViewPatient";
import DashViewPhysician from "./views/DashViewPhysician";
import TestView from "./views/TestView";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: login page */}
        <Route path="/" element={<LoginView />} />

        {/* Patient dashboard */}
        <Route path="/dashboard/patient" element={<DashViewPatient />} />

        {/* Physician dashboard */}
        <Route path="/dashboard/physician" element={<DashViewPhysician />} />

        {/* (Optional) your test page */}
        <Route path="/test" element={<TestView />} />
      </Routes>
    </Router>
  );
}

export default App;
