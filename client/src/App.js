import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layouts/layout";
import ProtectedLayout from "./Layouts/userLayouts/ProtectedLayout";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <ProtectedLayout />
            </AuthProvider>
          }
        >
          <Route index path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
