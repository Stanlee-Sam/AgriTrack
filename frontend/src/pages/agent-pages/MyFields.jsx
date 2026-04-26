import {
  Bubbles,
  ChevronLeft,
  ChevronRight,
  Component,
  Droplet,
  Flower,
  Leaf,
  Lightbulb,
  ListFilter,
  MapPinPlusInside,
  Plus,
  Sparkle,
  Sprout,
  X,
  Tractor,
} from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";

export default function MyFields() {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [newStage, setNewStage] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const statusStyles = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-700",
    at_risk: "bg-orange-100 text-orange-700",
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logout successful");
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedFieldId("");
    setNewStage("");
    setNote("");
  };

  const openUpdateModal = (fieldId) => {
    setSelectedFieldId(fieldId);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchAssignedFields = async () => {
      setLoading(true);
      try {
        const response = await api.get("/fields/assigned-fields", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFields(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load assigned fields");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedFields();
  }, []);

  const handleUpdateField = async (e) => {
    e.preventDefault();

    if (!selectedFieldId || !newStage || !note) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(
        `/updates/field/${selectedFieldId}`,
        {
          newStage,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Field updated successfully");
      setFields((prev) =>
        prev.map((field) =>
          field.id.toString() === selectedFieldId.toString()
            ? { ...field, currentStage: newStage }
            : field,
        ),
      );
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update field");
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldStatusLabel = (field) => {
    const plantedDate = new Date(field.plantingDate);
    const today = new Date();
    const days = (today - plantedDate) / (1000 * 60 * 60 * 24);

    if (field.currentStage === "harvested") return "completed";
    if (days > 30 && field.currentStage === "ready") return "at_risk";
    return "active";
  };

  return (
    <RoleDashboardLayout
      roleLabel="Agent"
      avatarName="Daniel Agent"
      navItems={navigationByRole.agent}
      onLogout={handleLogout}
    >
      <main className="min-h-screen">
        <div className="mb-8 flex flex-col gap-3 md:justify-between md:flex-row">
          <div>
            <h1 className="font-bold text-3xl text-on-surface">
              Assigned Fields
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Manage and monitor crop progress across your assigned operational sectors.
            </p>
          </div>
          {fields.length > 0 && (
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-white border border-outline-variant text-primary rounded-xl font-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors">
                <ListFilter className="w-5 h-5" />
                Filter
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-on-surface-variant animate-pulse">Loading your fields...</p>
          </div>
        ) : fields.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <EmptyState 
              title="No assigned fields"
              description="You don't have any fields assigned to your account right now. Check back later or contact your administrator."
              icon={Tractor}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fields.map((field) => {
                const status = getFieldStatusLabel(field);

                return (
                  <div
                    key={field.id}
                    className="bg-white rounded-2xl p-5 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] border border-zinc-100 group flex flex-col h-full hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-on-surface mb-1">
                          {field.name}
                        </h3>
                        <p className="font-semibold text-caption text-primary flex items-center gap-1">
                          <Component className="w-4 h-4" />
                          {field.cropType}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[status] || ""}`}
                      >
                        {field.currentStage}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-on-surface-variant">Planted on</span>
                        <span className="font-semibold text-on-surface">
                          {new Date(field.plantingDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000" 
                          style={{ width: field.currentStage === 'harvested' ? '100%' : field.currentStage === 'ready' ? '75%' : field.currentStage === 'growing' ? '50%' : '25%' }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => openUpdateModal(field.id)}
                      className="w-full py-3 bg-primary text-white rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-emerald-900 transition-colors shadow-md active:scale-95"
                    >
                      Update Field
                    </button>
                  </div>
                );
              })}

              <div className="bg-primary-container text-on-primary-container rounded-2xl p-6 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] flex flex-col justify-between border border-emerald-700/20">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-emerald-900/20 p-2 rounded-lg">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded uppercase tracking-widest">
                      Advisory
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 leading-tight">
                    Optimized Harvest Window
                  </h3>
                  <p className="text-emerald-100/80 text-sm leading-relaxed mb-6">
                    Weather patterns suggest a 48-hour window for peak harvest efficiency in your sectors.
                  </p>
                </div>
                <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-50 transition-colors">
                  View Schedule
                </button>
              </div>
            </div>

            {fields.length > 8 && (
              <div className="mt-12 flex items-center justify-between border-t border-zinc-100 pt-8">
                <p className="text-sm text-zinc-500">Showing all {fields.length} fields</p>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-primary transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-primary transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500">
            <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-50/10">
              <div>
                <h3 className="text-2xl font-bold text-primary">Field Status Update</h3>
                <p className="text-sm text-zinc-500 mt-1">Record the latest developments for this plot</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateField} className="p-8 flex flex-col gap-6">
              <div className="space-y-2">
                <label className="font-semibold text-on-surface-variant text-sm">Target Field</label>
                <select
                  value={selectedFieldId}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                  onChange={(e) => setSelectedFieldId(e.target.value)}
                  required
                >
                  <option value="">Select a field...</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-on-surface-variant text-sm">Growth Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                  required
                >
                  <option value="">Select current stage...</option>
                  <option value="planted">Planted</option>
                  <option value="growing">Growing</option>
                  <option value="ready">Ready</option>
                  <option value="harvested">Harvested</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-on-surface-variant text-sm">Field Notes</label>
                <textarea
                  value={note}
                  className="resize-none w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Describe observations, soil conditions, or any concerns..."
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 border border-outline-variant rounded-xl font-label-md hover:bg-surface-container-low transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-primary hover:bg-emerald-900 text-white py-3 rounded-xl font-label-md transition-all shadow-md active:scale-95 disabled:opacity-50"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Submit Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RoleDashboardLayout>
  );
}
