import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Edit,
  ListFilter,
  Plus,
  SortDesc,
  X,
} from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
      <main className="min-h-[calc(100vh-64px)]">
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-4">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-3xl text-on-surface">Fields</h1>
            <p className="text-body-md text-on-surface-variant max-w-2xl">
              Monitor real-time field performance, irrigation status, and crop
              health across your entire operational footprint.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-primary text-on-primary px-5 py-3 rounded-lg font-bold flex flex-row items-center justify-center gap-2 hover:bg-[#0a3d2a] transition-colors shadow-sm"
          >
            <Plus
              className="material-symbols-outlined text-[20px]"
              data-icon="add"
            />
            Add New Field
          </button>
        </header>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-4">
          <div className="bg-white p-5 rounded-lg shadow-ambient">
            <p className="text-bold text-outline mb-1 uppercase tracking-wider">
              Total Area
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">1,240</span>
              <span className="text-body-md text-outline">Acres</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-ambient">
            <p className="text-bold text-outline mb-1 uppercase tracking-wider">
              Active Crops
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">8</span>
              <span className="text-body-md text-outline">Varieties</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-ambient">
            <p className="text-bold text-outline mb-1 uppercase tracking-wider">
              Irrigation Level
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-secondary">94%</span>
              <Droplet
                className="material-symbols-outlined text-secondary text-sm"
                data-icon="water_drop"
              >
                water_drop
              </Droplet>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-ambient">
            <p className="text-bold text-outline mb-1 uppercase tracking-wider">
              Field Agents
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">12</span>
              <span className="text-body-md text-outline">On-site</span>
            </div>
          </div>
        </div> */}
        <div className="bg-white rounded-xl shadow-ambient overflow-hidden">
          <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-zinc-50/30">
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-md flex items-center gap-2 hover:bg-zinc-50 transition-colors">
                <ListFilter
                  className="material-symbols-outlined text-[18px]"
                  data-icon="filter_list"
                >
                  filter_list
                </ListFilter>
                Filter
              </button>
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-md flex items-center gap-2 hover:bg-zinc-50 transition-colors">
                <SortDesc
                  className="material-symbols-outlined text-[18px]"
                  data-icon="sort"
                >
                  sort
                </SortDesc>
                Sort
              </button>
            </div>
            <div className="font-bold text-outline">
              Showing {fields.length} active fields
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                    Field Name
                  </th>
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                    Crop Type
                  </th>
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                    Planting Date
                  </th>
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                    Assigned Agent
                  </th>
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-4 font-label-md text-outline text-[12px] uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {fields.map((field) => (
                  <tr
                    key={field.id}
                    className="table-row-hover transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-label-md text-on-surface">
                            {field.name}
                          </div>
                          <div className="text-caption text-outline">
                            120 Acres • Soil Type: Loamy
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-gutter py-4 text-body-md text-on-surface-variant">
                      {field.cropType}
                    </td>
                    <td className="px-gutter py-4 text-body-md text-on-surface-variant">
                      {new Date(field.plantingDate).toDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-caption text-primary font-semibold">
                        {field.currentStage}
                      </span>
                    </td>
                    <td className="px-gutter py-4">
                      <span className="text-body-md">
                        {field.agent?.name || "Unassigned"}{" "}
                      </span>
                    </td>
                    <td className="px-gutter py-4">
                      <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-caption font-bold">
                        Optimal
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => openEditModal(field)}
                        className="p-2 hover:bg-zinc-200 rounded-lg transition-colors text-outline"
                      >
                        <Edit
                          className="material-symbols-outlined"
                          data-icon="edit"
                        >
                          edit
                        </Edit>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-outline-variant bg-zinc-50/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="p-2 border border-outline-variant rounded-lg bg-white disabled:opacity-50">
                <ChevronLeft
                  className="material-symbols-outlined"
                  data-icon="chevron_left"
                >
                  chevron_left
                </ChevronLeft>
              </button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-caption">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-zinc-200 text-on-surface text-caption">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-zinc-200 text-on-surface text-caption">
                  3
                </button>
              </div>
              <button className="p-2 border border-outline-variant rounded-lg bg-white">
                <ChevronRight
                  className="material-symbols-outlined"
                  data-icon="chevron_right"
                >
                  chevron_right
                </ChevronRight>
              </button>
            </div>
            <div className="text-[12px] text-outline">Page 1 of 6</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-xl shadow-ambient border border-emerald-50">
            <h3 className="font-h3 text-2xl text-primary mb-2">
              Active Alerts
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-3 bg-error-container/20 rounded-lg border-l-4 border-error">
                <TriangleAlert
                  className="material-symbols-outlined text-error"
                  data-icon="warning"
                >
                  warning
                </TriangleAlert>
                <div>
                  <p className="font-label-md text-[18px] text-on-surface">
                    Low Moisture: South Ridge G2
                  </p>
                  <p className="text-[15px] text-on-surface-variant">
                    Sensor readings below 15% threshold. Manual irrigation
                    override suggested.
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-3 bg-error-container/20 rounded-lg border-l-4 border-error">
                <CircleCheck
                  className="material-symbols-outlined text-secondary"
                  data-icon="check_circle"
                >
                  check_circle
                </CircleCheck>
                <div>
                  <p className="font-label-md text-[18px] text-on-surface">
                    Harvest Ready: East Valley B4
                  </p>
                  <p className="text-[15px] text-on-surface-variant">
                    Maturity index reached. Scheduling harvesting equipment for
                    Thursday.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-primary-container p-5 rounded-xl shadow-ambient relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-h3 text-2xl text-white mb-3">
                Field Insights
              </h3>
              <p className="text-body-md text-primary-fixed mb-5">
                Predictive models suggest an 18% increase in yield for North
                Plateau A1 based on recent soil enrichment protocols.
              </p>
              <button className="bg-white text-primary px-4 py-2 rounded-lg font-label-md hover:bg-zinc-50 transition-all">
                View Details Analysis
              </button>
            </div>
          </div>
        </div>
      </main>

      {mode && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
            <form
              onSubmit={mode === "edit" ? handleUpdateField : handleCreateField}
              className="relative bg-white w-full max-w-lg rounded-2xl custom-shadow-lvl2 overflow-hidden flex flex-col"
            >
              <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-50/10">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {mode === "edit" ? "Update Field" : "Add New Field"}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Enter plot details for new cultivation
                  </p>
                </div>
                <button
                  className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  onClick={closeModal}
                  type="button"
                >
                  <X className="material-symbols-outlined" data-icon="close">
                    close
                  </X>
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="font-semibold text-neutral">
                    Field Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none"
                    placeholder="e.g. West Coast Hill Plot 3"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
                      Crop Type
                    </label>
                    <input
                      type="text"
                      placeholder="Crop type"
                      value={formData.cropType}
                      onChange={(e) =>
                        setFormData({ ...formData, cropType: e.target.value })
                      }
                      className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
                      Planting Date
                    </label>
                    <input
                      className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none"
                      type="date"
                      value={formData.plantingDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          plantingDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
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
                      className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none"
                    >
                      <option value="planted">Planted</option>
                      <option value="growing">Growing</option>
                      <option value="ready">Ready</option>
                      <option value="harvested">Harvested</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
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
                      className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none"
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
                  className="px-6 py-2.5 text-zinc-600 font-label-md hover:bg-zinc-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-emerald-900 text-white px-8 py-2.5 rounded-lg font-label-md transition-colors custom-shadow-lvl1"
                >
                  {mode === "edit" ? "Update Field" : "Save Field"}{" "}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </RoleDashboardLayout>
  );
}
