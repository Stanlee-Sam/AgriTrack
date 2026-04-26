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
import EmptyState from "../../components/common/EmptyState";

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
    navigate("/");
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

        const response = await api.get(
          `/dashboard/agent`,
          {
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
        const response = await api.get(
          `/fields/assigned-fields`,
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
                  {data?.assignedFields || 0}
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
                  {data?.atRiskFields || 0}
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
                  {data?.completedFields || 0}
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
            </div>
            <div className="overflow-x-auto">
              {fields.length === 0 && !loading ? (
                <div className="p-12">
                  <EmptyState 
                    title="No fields assigned"
                    description="You don't have any fields assigned to you at the moment. Please contact the administrator if you believe this is an error."
                    icon={Tractor}
                  />
                </div>
              ) : (
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
                        <td colSpan="5" className="px-5 py-12 text-center text-on-surface-variant font-body-md italic">
                          Loading fields...
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
                            <button 
                              onClick={() => navigate("/agent/my-fields")}
                              className="text-primary hover:bg-primary/10 p-xs rounded-full transition-all"
                            >
                              <Eye className="material-symbols-outlined" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>
    </RoleDashboardLayout>
  );
}
