import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Signup from "./pages/Signup";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardAgent from "./pages/agent-pages/DashboardAgent";

function App() {
  return(
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/*Admin pages */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />

        {/*Agent pages */}
        <Route path="/dashboard-agent" element={<DashboardAgent />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App

