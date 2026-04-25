import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardAgent from "./pages/agent-pages/DashboardAgent";
import Fields from "./pages/admin/Fields";
import FieldActivity from "./pages/admin/FieldActivity";
import MyFields from "./pages/agent-pages/MyFields";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/*Admin pages */}
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fields-admin"
          element={
            <ProtectedRoute role="admin">
              <Fields />
            </ProtectedRoute>
          }
        />
        <Route
          path="/field-activity-admin"
          element={
            <ProtectedRoute role="admin">
              <FieldActivity />
            </ProtectedRoute>
          }
        />

        {/*Agent pages */}
        <Route
          path="/dashboard-agent"
          element={
            <ProtectedRoute role="agent">
              <DashboardAgent />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-fields-agent"
          element={
            <ProtectedRoute role="agent">
              <MyFields />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
