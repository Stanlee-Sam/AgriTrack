import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Edit,
  ListFilter,
  Plus,
  SortDesc,
  X,
  Tractor,
  TriangleAlert,
  CircleCheck,
} from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";

export default function Fields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cropType: "",
    plantingDate: "",
    currentStage: "planted",
    assignedAgentId: "",
  });
  const [agents, setAgents] = useState([]);
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [mode, setMode] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logout successful");
  };

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const response = await api.get("/fields");
        setFields(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const handleCreateField = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/fields/create", formData);
      setFields((prev) => [res.data, ...prev]);

      setFormData({
        name: "",
        cropType: "",
        plantingDate: "",
        currentStage: "planted",
        assignedAgentId: "",
      });
      setMode(null);
      toast.success("Field created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create field");
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get("/fields/agents");
        setAgents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, []);

  const handleAssignAgent = async (fieldId, assignedAgentId) => {
    try {
      const res = await api.put(`/fields/${fieldId}/assign`, {
        assignedAgentId,
      });

      setFields((prev) => prev.map((f) => (f.id === fieldId ? res.data : f)));

      toast.success("Field assigned successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign field");
    }
  };

  const openEditModal = (field) => {
    setFormData({
      name: field.name,
      cropType: field.cropType,
      plantingDate: field.plantingDate?.split("T")[0],
      currentStage: field.currentStage,
      assignedAgentId: field.assignedAgentId || field.agent?.id || "",
    });

    setEditingFieldId(field.id);
    setMode("edit");
  };

  const handleUpdateField = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/fields/update/${editingFieldId}`, formData);

      const updated = res.data;

      setFields((prev) =>
        prev.map((f) => (f.id === editingFieldId ? updated : f)),
      );

      setFormData({
        name: "",
        cropType: "",
        plantingDate: "",
        currentStage: "planted",
        assignedAgentId: "",
      });

      setMode(null);
      setEditingFieldId(null);

      toast.success("Field updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update field");
    }
  };
  const openCreateModal = () => {
    setFormData({
      name: "",
      cropType: "",
      plantingDate: "",
      currentStage: "planted",
      assignedAgentId: "",
    });
    setMode("create");
  };
  const closeModal = () => {
    setMode(null);
    setEditingFieldId(null);

    setFormData({
      name: "",
      cropType: "",
      plantingDate: "",
      currentStage: "planted",
      assignedAgentId: "",
    });
  };

  return (
    <RoleDashboardLayout
      roleLabel="Admin"
      avatarName="Amina Admin"
      navItems={navigationByRole.admin}
      onLogout={handleLogout}
    >
      <main className="min-h-[calc(100vh-64px)] pb-10">
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl text-on-surface">Fields</h1>
            <p className="text-body-md text-on-surface-variant max-w-2xl">
              Monitor real-time field performance, irrigation status, and crop
              health across your entire operational footprint.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex flex-row items-center justify-center gap-2 hover:bg-[#0a3d2a] transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add New Field
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-ambient overflow-hidden border border-outline-variant/30">
          <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-zinc-50/30">
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-md flex items-center gap-2 hover:bg-zinc-50 transition-colors">
                <ListFilter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-md flex items-center gap-2 hover:bg-zinc-50 transition-colors">
                <SortDesc className="w-4 h-4" />
                Sort
              </button>
            </div>
            <div className="font-bold text-outline text-sm">
              Showing {fields.length} active fields
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {fields.length === 0 && !loading ? (
              <div className="p-12">
                <EmptyState 
                  title="No fields registered"
                  description="There are currently no fields in the system. Start by adding a new field to begin monitoring."
                  icon={Tractor}
                  actionLabel="Add New Field"
                  onAction={openCreateModal}
                />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50">
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                      Field Name
                    </th>
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                      Crop Type
                    </th>
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                      Planting Date
                    </th>
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                      Current Stage
                    </th>
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                      Assigned Agent
                    </th>
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-on-surface-variant font-body-md italic">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          Loading fields...
                        </div>
                      </td>
                    </tr>
                  ) : (
                    fields.map((field) => (
                      <tr
                        key={field.id}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold text-on-surface">
                                {field.name}
                              </div>
                              <div className="text-caption text-outline">
                                120 Acres • Soil Type: Loamy
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-body-md text-on-surface-variant">
                          {field.cropType}
                        </td>
                        <td className="px-6 py-4 text-body-md text-on-surface-variant">
                          {new Date(field.plantingDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-caption text-primary font-bold uppercase tracking-wider">
                            {field.currentStage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-body-md text-on-surface">
                            {field.agent?.name || "Unassigned"}{" "}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-[10px] font-bold uppercase tracking-widest border border-secondary/20">
                            Optimal
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openEditModal(field)}
                            className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
          
          {fields.length > 0 && (
            <div className="p-5 border-t border-outline-variant bg-zinc-50/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button className="p-2 border border-outline-variant rounded-lg bg-white disabled:opacity-50 hover:bg-zinc-50 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-caption shadow-md">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-zinc-200 text-on-surface text-caption transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-zinc-200 text-on-surface text-caption transition-colors">
                    3
                  </button>
                </div>
                <button className="p-2 border border-outline-variant rounded-lg bg-white hover:bg-zinc-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="text-[12px] text-outline font-medium">Page 1 of 6</div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-ambient border border-emerald-50">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              Active Alerts
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-4 bg-error-container/10 rounded-xl border-l-4 border-error">
                <TriangleAlert className="w-6 h-6 text-error" />
                <div>
                  <p className="font-bold text-on-surface">
                    Low Moisture: South Ridge G2
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Sensor readings below 15% threshold. Manual irrigation
                    override suggested.
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-4 bg-secondary-container/10 rounded-xl border-l-4 border-secondary">
                <CircleCheck className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-bold text-on-surface">
                    Harvest Ready: East Valley B4
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Maturity index reached. Scheduling harvesting equipment for
                    Thursday.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary-container p-8 rounded-2xl shadow-ambient relative overflow-hidden text-white flex flex-col justify-center">
            <div className="relative z-10">
              <div className="bg-white/20 p-3 rounded-xl w-fit mb-6">
                <Tractor className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Field Insights</h3>
              <p className="text-emerald-50 mb-8 max-w-md">
                Predictive models suggest an 18% increase in yield for North
                Plateau A1 based on recent soil enrichment protocols.
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg active:scale-95">
                View Detailed Analysis
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </main>

      {mode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <form
            onSubmit={mode === "edit" ? handleUpdateField : handleCreateField}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500"
          >
            <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-50/10">
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {mode === "edit" ? "Update Field" : "Add New Field"}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Enter plot details for cultivation tracking
                </p>
              </div>
              <button
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
                onClick={closeModal}
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="font-bold text-on-surface-variant text-sm">
                  Field Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="e.g. West Coast Hill Plot 3"
                  type="text"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant text-sm">
                    Crop Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Corn"
                    value={formData.cropType}
                    onChange={(e) =>
                      setFormData({ ...formData, cropType: e.target.value })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant text-sm">
                    Planting Date
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    type="date"
                    value={formData.plantingDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        plantingDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant text-sm">
                    Current Stage
                  </label>
                  <select
                    value={formData.currentStage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentStage: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                  >
                    <option value="planted">Planted</option>
                    <option value="growing">Growing</option>
                    <option value="ready">Ready</option>
                    <option value="harvested">Harvested</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant text-sm">
                    Assign Agent
                  </label>
                  <select
                    value={formData.assignedAgentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedAgentId: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                  >
                    <option value="">Unassigned</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
              >
                {mode === "edit" ? "Update Field" : "Save Field"}
              </button>
            </div>
          </form>
        </div>
      )}
    </RoleDashboardLayout>
  );
}
