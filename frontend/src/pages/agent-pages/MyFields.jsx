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
} from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
    navigate("/login");
    toast.success("Logout successful");
  };

  const openModel = () => setIsOpen(true);

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

    if (!selectedFieldId || !newStage || !note) return;

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
          field.id.toString() === selectedFieldId
            ? { ...field, currentStage: newStage }
            : field,
        ),
      );
      setIsOpen(false);
      setSelectedFieldId("");
      setNewStage("");
      setNote("");
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
        <div className="mb-5 flex flex-col gap-3 md:justify-between md:flex-row">
          <div>
            <h1 className="font-bold text-3xl text-on-surface">
              Assigned Fields
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Manage and monitor crop progress across 12 active sectors.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white border text-[11px] md:text-[15px] border-outline-variant text-primary rounded-xl font-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors">
              <ListFilter
                className="material-symbols-outlined text-[20px]"
                data-icon="filter_list"
              >
                filter_list
              </ListFilter>
              Filter
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {fields.map((field) => {
            const status = getFieldStatusLabel(field);

            return (
              <div
                key={field.id}
                className="bg-white rounded-xl p-3 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] border border-zinc-100 group flex flex-col h-full"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[18px] text-on-surface mb-1">
                      {field.name}
                    </h3>
                    <p className="font-semibold text-caption text-primary mb-4 flex items-center gap-1">
                      <Component
                        className="material-symbols-outlined text-[14px]"
                        data-icon="category"
                      >
                        category
                      </Component>
                      {/* {field.crop} • {field.cropType} */}
                      {field.cropType}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[status] || ""}`}
                  >
                    {field.currentStage}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-on-surface-variant">
                        Planted on
                      </span>
                      <span className="font-semibold text-on-surface">
                        {new Date(field.plantingDate).toLocaleDateString()}
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-[13px]">
                    <span className="text-on-surface-variant">
                      {field.attribute}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {field.attributeValue}
                    </span>
                  </div> */}
                  </div>
                </div>
                <button
                  onClick={() => openUpdateModal(field.id)}
                  className="w-full py-3 bg-primary text-white rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors mt-auto"
                >
                  Update Field
                </button>
              </div>
            );
          })}

          <div className="bg-primary-container text-on-primary-container rounded-xl p-4 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] flex flex-col justify-between border border-emerald-700/20">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-emerald-900/20 p-2 rounded-lg">
                  <Lightbulb
                    className="material-symbols-outlined"
                    data-icon="insights"
                  >
                    insights
                  </Lightbulb>
                </div>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded">
                  SYSTEM ADVISORY
                </span>
              </div>
              <h3 className="font-semibold text-[20px] mb-2 leading-tight">
                Optimized Harvest Window
              </h3>
              <p className="text-emerald-100/80 text-[13px] leading-relaxed">
                Based on current weather telemetry, East Vineyard harvest should
                begin in 48 hours for maximum yield.
              </p>
            </div>
            <div className="mt-6">
              <div className="w-full bg-emerald-900/30 h-2 rounded-full mb-4 overflow-hidden">
                <div className="bg-on-primary-container h-full w-[85%] rounded-full"></div>
              </div>
              <button className="w-full py-2 bg-white text-primary rounded-lg font-bold text-[15px]">
                View Schedule
              </button>
            </div>
          </div>
        </div>
        <div className="mt-lg flex items-center justify-between border-t border-zinc-100 pt-8">
          <p className="text-[14px] text-zinc-500">Showing 7 of 12 fields</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary transition-all">
              <ChevronLeft
                className="material-symbols-outlined"
                data-icon="chevron_left"
              >
                chevron_left
              </ChevronLeft>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
              1
            </button>
            <button className="w-10 h-10 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-all font-bold text-sm">
              2
            </button>
            <button className="w-10 h-10 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary transition-all">
              <ChevronRight
                className="material-symbols-outlined"
                data-icon="chevron_right"
              >
                chevron_right
              </ChevronRight>
            </button>
          </div>
        </div>
      </main>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
            <div className="relative px-8 py-6 bg-white w-full max-w-lg rounded-2xl custom-shadow-lvl2 overflow-hidden flex flex-col">
              <form
                onSubmit={handleUpdateField}
                className="flex flex-col gap-5"
              >
                <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-50/10">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      Add Update
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <X className="material-symbols-outlined" data-icon="close">
                      close
                    </X>
                  </button>
                </div>
                <select
                  value={selectedFieldId}
                  className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none"
                  onChange={(e) => setSelectedFieldId(e.target.value)}
                >
                  <option value="">Select field</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>

                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none"
                >
                  <option value="">Select stage</option>
                  <option value="planted">Planted</option>
                  <option value="growing">Growing</option>
                  <option value="ready">Ready</option>
                  <option value="harvested">Harvested</option>
                </select>

                <textarea
                  value={note}
                  className="resize-none border rounded-md p-3 w-full bg-[#F1F3F5] border-zinc-200 px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none"
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter notes"
                />

                <button
                  className="bg-primary hover:bg-emerald-900 text-white px-8 py-2.5 rounded-lg font-label-md transition-colors custom-shadow-lvl1"
                  type="submit"
                >
                  {submitting ? "Saving..." : "Submit Update"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </RoleDashboardLayout>
  );
}
