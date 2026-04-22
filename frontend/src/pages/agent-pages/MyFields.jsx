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
import { useState } from "react";

export default function MyFields() {
  const [isOpen, setIsOpen] = useState(false);

  const fields = [
    {
      id: 1,
      name: "North Cornfield",
      crop: "Corn",
      cropType: "Hybrid Z-42",
      icon: <Sprout />,
      status: "growing",
      attribute: "Moisture",
      attributeValue: "68% Optimal",
      datePlanted: "March 15, 2023",
    },
    {
      id: 2,
      name: "East Vineyard",
      crop: "Grapes",
      cropType: "Cabernet Sauvignon",
      icon: <Flower />,
      status: "Ready for harvest",
      attribute: "Sugar Level",
      attributeValue: "24.5 Brix",
      datePlanted: "March 15, 2023",
    },
    {
      id: 3,
      name: "South Wheatfield",
      crop: "Wheat",
      cropType: "Winter Gold",
      icon: <Sprout />,
      status: "growing",
      attribute: "Nitrogen Level",
      attributeValue: "Stable",
    },
    {
      id: 4,
      name: "West Applefield",
      crop: "Apples",
      cropType: "Golden Delicious",
      icon: <Droplet />,
      status: "Irrigating",
      attribute: "Water flow",
      attributeValue: "Active",
      datePlanted: "March 15, 2023",
    },
  ];

  const statusStyles = {
    growing: "bg-secondary text-primary",
    Irrigating: "bg-blue-100 text-blue-700",
    "Ready for harvest": "bg-orange-100 text-orange-700",
  };
  const handleLogout = () => {
    window.alert("Logout action goes here.");
  };

  const openModel = () => {
    setIsOpen(!isOpen);
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
            <button
              onClick={openModel}
              className="px-6 py-2 bg-primary text-[11px] md:text-[15px] text-white rounded-xl font-label-md flex items-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <Plus className="material-symbols-outlined " data-icon="add">
                add
              </Plus>
              Register New Field
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {fields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-xl p-3 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] border border-zinc-100 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <div className="material text-primary" data-icon="grass">
                    {field.icon}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider ${statusStyles[field.status]}`}
                >
                  {field.status}
                </div>
              </div>
              <div className="flex-1">
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
                  {field.crop} • {field.cropType}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-on-surface-variant">Planted on</span>
                    <span className="font-semibold text-on-surface">
                      {field.datePlanted}
                    </span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-on-surface-variant">
                      {field.attribute}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {field.attributeValue}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-white rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors mt-auto">
                Update Field
              </button>
            </div>
          ))}

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

          <div
            onClick={openModel}
            className="border-2 border-dashed border-emerald-100 rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-emerald-300 transition-colors cursor-pointer bg-emerald-50/20"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <MapPinPlusInside
                className="material-symbols-outlined text-emerald-800 text-3xl"
                data-icon="add_location"
              >
                add_location
              </MapPinPlusInside>
            </div>
            <h4 className="font-semibold text-[16px] text-emerald-900 mb-2">
              New Territory?
            </h4>
            <p className="text-[12px] text-zinc-500 max-w-[160px]">
              Register a new plot to start field tracking and data logging.
            </p>
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
            <div className="relative bg-white w-full max-w-lg rounded-2xl custom-shadow-lvl2 overflow-hidden flex flex-col">
              <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-50/10">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    Add New Field
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Enter plot details for new cultivation
                  </p>
                </div>
                <button className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
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
                    <select className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none">
                      <option>Wheat</option>
                      <option>Corn</option>
                      <option>Soybeans</option>
                      <option>Rice</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
                      Planting Date
                    </label>
                    <input
                      className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none"
                      type="date"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
                      Current Stage
                    </label>
                    <select className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none">
                      <option>Planted</option>
                      <option>Growing</option>
                      <option>Ready</option>
                      <option>Harvested</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-neutral">
                      Assign Agent
                    </label>
                    <select className="w-full bg-[#F1F3F5] border-zinc-200 rounded-lg px-4 py-2.5 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all outline-none appearance-none">
                      <option>Marcus Chen</option>
                      <option>Sarah Jenkins</option>
                      <option>David Miller</option>
                      <option>Unassigned</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
                <button
                  onClick={openModel}
                  className="px-6 py-2.5 text-zinc-600 font-label-md hover:bg-zinc-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-primary hover:bg-emerald-900 text-white px-8 py-2.5 rounded-lg font-label-md transition-colors custom-shadow-lvl1">
                  Save Field
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
    </RoleDashboardLayout>
  );
}
