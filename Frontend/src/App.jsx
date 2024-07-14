import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Pages
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";

// Auth Context
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider>
      {/* Wrap the app with AuthProvider to provide authentication context */}
      <AuthProvider>
        {/* Wrap the app with Router or Brower Router for routing */}
        <Router>
          {/* Define routes */}
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage /> {/* Protected dashboard route */}
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
