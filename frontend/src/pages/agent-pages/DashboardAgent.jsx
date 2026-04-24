import {
  ClipboardList,
  Eye,
  MapPinPlusInside,
  Tractor,
  TriangleAlert,
} from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function DashboardAgent() {
  const [data, setData] = useState(null);
  const [fields, setFields] = useState([]);
  const agentId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cropType: "",
    plantingDate: "",
    currentStage: "planted",
  });

  const navigate = useNavigate();

 const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successful");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateField = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/fields", {
        ...formData,
        assignedAgentId: agentId,
      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      setFields((prev) => [...prev, response.data]);

      setShowCreateModal(false);
      setFormData({
        name: "",
        cropType: "",
        plantingDate: "",
        currentStage: "planted",
      });

      
    } catch (error) {
      console.error(error);
      alert("Failed to create field");
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/dashboard/agent/`,{
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, [agentId]);

  useEffect(() => {
    const fetchAssignedFields = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/fields/assigned-fields`,
          {
            headers : {
              Authorization : `Bearer ${token}`
            }
          }
        );
        setFields(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedFields();
  }, [agentId]);

  const stageProgress = (stage) => {
    const map = {
      planted: 25,
      growing: 50,
      ready: 75,
      harvested: 100,
    };
    return map[stage] || 0;
  };

  return (
    <RoleDashboardLayout
      roleLabel="Agent"
      avatarName={data?.agentName || "Agent"}
      navItems={navigationByRole.agent}
      onLogout={handleLogout}
    >
      <main className="pb-xl min-h-screen">
        <div className="max-w-7xl mx-auto space-y-md  flex flex-col gap-5">
          <header className="flex flex-col gap-3 md:flex-row md:items-end justify-between gap-sm">
            <div>
              <h1 className="font-bold text-3xl text-on-surface">
                Your Assigned Fields
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Welcome back, {data?.agentName || "Agent"}. Here is your current operational
                overview.
              </p>
            </div>
            {/* <div className="flex ">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary w-full text-on-primary px-5 py-3 rounded-lg font-label-md hover:bg-primary/90 transition-all flex items-center justify-center gap-xs"
              >
                <MapPinPlusInside className="material-symbols-outlined text-[20px]">
                  add_location
                </MapPinPlusInside>{" "}
                New Field Report
              </button>
            </div> */}
          </header>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-lg shadow-[0_12px_24px_rgba(45,106,79,0.08)] flex flex-col justify-between min-h-40">
              <div className="flex justify-between items-start">
                <div className="bg-secondary p-3   rounded-lg">
                  <ClipboardList
                    className="text-foreground "
                    data-icon="assignment"
                  ></ClipboardList>
                </div>

                <span className="text-caption font-semibold text-secondary">
                  Updated Today
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-on-surface">
                  {data?.assignedFields}
                </p>
                <p className="font-semibold text-on-surface-variant">
                  Assigned Fields
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-lg shadow-[0_12px_24px_rgba(45,106,79,0.08)] border-l-4 border-error flex flex-col justify-between min-h-40">
              <div className="flex justify-between items-start">
                <div
                  className="p-3 rounded-lg bg-error-container text-on-error-container "
                  data-icon="warning"
                >
                  <TriangleAlert />
                </div>
                <span className="text-caption font-semibold text-error">
                  Attention Required
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-on-surface">
                  {data?.atRiskFields}
                </p>
                <p className="font-semibold text-on-surface-variant">
                  Fields At Risk
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-lg shadow-[0_12px_24px_rgba(45,106,79,0.08)] flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <div
                  className="p-3 bg-tertiary-container text-on-tertiary-container rounded-lg"
                  data-icon="agriculture"
                >
                  <Tractor />
                </div>
                <span className="text-caption font-semibold text-tertiary">
                  Optimal Window
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-on-surface">
                  {data?.completedFields}
                </p>
                <p className="font-semibold text-on-surface-variant">
                  Fields Ready for Harvest
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-[0_12px_24px_rgba(45,106,79,0.08)] overflow-hidden">
            <div className="px-5 py-6 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-semibold text-2xl">
                Active Field Monitoring
              </h3>
              {/* <div className="">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-base top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    search
                  </span>
                  <input
                    className="pl-xl pr-base py-xs bg-[#F1F3F5] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/10"
                    placeholder="Search fields..."
                    type="text"
                  />
                </div>
              </div> */}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container text-on-surface-variant font-label-md">
                  <tr>
                    <th className="px-5 py-4 border-b border-outline-variant">
                      Field Name
                    </th>
                    <th className="px-5 py-4 border-b border-outline-variant">
                      Crop Type
                    </th>
                    <th className="px-5 py-4 border-b border-outline-variant">
                      Current Stage
                    </th>
                    <th className="px-5 py-4 border-b border-outline-variant">
                      Status
                    </th>
                    <th className="px-5 py-4 border-b border-outline-variant text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-on-surface">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-5 py-10 text-center">
                        Loading fields...
                      </td>
                    </tr>
                  ) : fields.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-5 py-5 text-center">
                        No assigned fields yet
                      </td>
                    </tr>
                  ) : (
                    fields.map((field) => (
                      <tr
                        key={field.id}
                        className="hover:bg-primary/5 transition-colors border-b border-outline-variant"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-sm">
                            <span className="font-semibold">{field.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">{field.cropType}</td>
                        <td className="px-5 py-3">
                          <div className="flex flex-col gap-xs">
                            <span className="text-caption">
                              {field.currentStage}
                            </span>
                            <div className="w-32 h-1.5 bg-surface-container-highest rounded-full">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{
                                  width: `${stageProgress(field.currentStage)}%`,
                                }}
                              ></div>{" "}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-caption font-bold border border-secondary/20">
                            Active
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button className="text-primary hover:bg-primary/10 p-xs rounded-full transition-all">
                            <Eye className="material-symbols-outlined">
                              visibility
                            </Eye>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                  {/* <tr className="hover:bg-primary/5 transition-colors border-b border-outline-variant">
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-sm">
                        <span className="font-semibold">North Cornfield</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">Corn</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-xs">
                        <span className="text-caption">Maturity (85%)</span>
                        <div className="w-32 h-1.5 bg-surface-container-highest rounded-full">
                          <div className="w-[85%] h-full bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-caption font-bold border border-secondary/20">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-primary hover:bg-primary/10 p-xs rounded-full transition-all">
                        <Eye className="material-symbols-outlined">
                          visibility
                        </Eye>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors border-b border-outline-variant bg-surface-container-low">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-sm">
                        <span className="font-semibold">East Vineyard</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">Grapes</td>
                    <td className="px-5 py-3">Irrigating</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 bg-error-container/30 text-on-error-container rounded-full text-caption font-bold border border-error/20">
                        At Risk
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-primary hover:bg-primary/10 p-xs rounded-full transition-all">
                        <Eye className="material-symbols-outlined">
                          visibility
                        </Eye>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors border-b border-outline-variant">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-sm">
                        <span className="font-semibold">West Wheat Patch</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">Wheat</td>
                    <td className="px-5 py-3">Harvesting</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-1 bg-tertiary-container/30 text-foreground rounded-full text-caption font-bold border border-tertiary/20">
                        Completed
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-primary hover:bg-primary/10 p-xs rounded-full transition-all">
                        <Eye className="material-symbols-outlined">
                          visibility
                        </Eye>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-sm">
                        <span className="font-semibold">South Soy Sector</span>
                      </div>
                    </td>
                    <td className="px-5 py-m3">Soybeans</td>
                    <td className="px-5 py-m3">Emergence</td>
                    <td className="px-5 py-m3">
                      <span className="px-2 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-caption font-bold border border-secondary/20">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-m3 text-right">
                      <button className="text-primary hover:bg-primary/10 p-xs rounded-full transition-all">
                        <Eye className="material-symbols-outlined">
                          visibility
                        </Eye>
                      </button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[500px]">
              <h2 className="text-2xl font-bold mb-6">New Field Report</h2>

              <form
                onSubmit={handleCreateField}
                className="flex flex-col gap-4"
              >
                <input
                  name="name"
                  placeholder="Field Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg"
                />

                <input
                  name="cropType"
                  placeholder="Crop Type"
                  value={formData.cropType}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg"
                />

                <input
                  type="date"
                  name="plantingDate"
                  value={formData.plantingDate}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded-lg"
                />

                <select
                  name="currentStage"
                  value={formData.currentStage}
                  onChange={handleChange}
                  className="border p-3 rounded-lg"
                >
                  <option value="planted">Planted</option>
                  <option value="growing">Growing</option>
                  <option value="ready">Ready</option>
                  <option value="harvested">Harvested</option>
                </select>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 border py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg"
                  >
                    Create Field
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </RoleDashboardLayout>
  );
}
