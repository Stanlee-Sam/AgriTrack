import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardAgent from "./pages/agent-pages/DashboardAgent";
import Fields from "./pages/admin/Fields";
import FieldActivity from "./pages/admin/FieldActivity";
import MyFields from "./pages/agent-pages/MyFields";

function App() {
  return(
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/*Admin pages */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/fields-admin" element={<Fields />} />
        <Route path="/field-activity-admin" element={<FieldActivity />} />

        {/*Agent pages */}
        <Route path="/dashboard-agent" element={<DashboardAgent />} />
        <Route path="/my-fields-agent" element={<MyFields />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
