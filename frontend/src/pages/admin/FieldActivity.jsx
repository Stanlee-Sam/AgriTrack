import {
  Bug,
  ChevronDown,
  CircleCheck,
  Download,
  Droplet,
  History,
  Leaf,
  ListFilter,
  MapPin,
  Tractor,
  User,
} from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function FieldActivity() {
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successful");
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        
        const response = await api.get("/updates",{
          headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUpdates(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <RoleDashboardLayout
      roleLabel="Admin"
      avatarName="Amina Admin"
      navItems={navigationByRole.admin}
      onLogout={handleLogout}
    >
      <main className="flex flex-col gap-7">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl text-on-surface">
              Activity Feed
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Monitor real-time updates from field agents across all operational
              zones.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors text-sm font-semibold shadow-sm">
              <ListFilter className="material-symbols-outlined text-lg">
                filter_list
              </ListFilter>
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors text-sm font-semibold shadow-sm">
              <Download className="material-symbols-outlined text-lg">
                download
              </Download>
              Export Log
            </button>
          </div>
        </div>
        <div className="mb-gutter grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Tractor className="material-symbols-outlined">
                agriculture
              </Tractor>
            </div>
            <div>
              <p className="font-semibold text-on-surface-variant">
                Active Fields
              </p>
              <p className="text-3xl font-bold text-on-surface">12</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <User className="material-symbols-outlined">support_agent</User>
            </div>
            <div>
              <p className="font-semibold text-on-surface-variant">
                Agents Online
              </p>
              <p className="text-3xl font-bold text-on-surface">8</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <History className="material-symbols-outlined">update</History>
            </div>
            <div>
              <p className="font-semibold text-on-surface-variant">
                Updates Today
              </p>
              <p className="text-3xl font-bold text-on-surface">142</p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative w-full">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 z-0"></div>
            <div className="space-y-5 relative z-10">
              {updates.map((update) => (
                <div className="flex gap-5 group w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border-4 border-background bg-white shadow-md flex items-center justify-center z-20">
                      <Leaf className="material-symbols-outlined text-primary">
                        eco
                      </Leaf>
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(45,106,79,0.06)] border border-slate-50 group-hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] transition-shadow w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          alt="Sarah Miller"
                          className="w-10 h-10 rounded-full object-cover"
                          data-alt="close-up portrait of a professional female field agent wearing a khaki uniform shirt with soft natural morning light"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZEAoAnveHuPqOpx6EjeIba4gXU2VIGAvI3keiKuR7gLkntpW-huvBK1D-OKqRIEqqtb5_wNZdvAMX9JrrJLG8v1wLZ5vm0BiXU0F9sYBauXxJzIUw_zLVa1NB-eljWSTgbWR37iXlID7iy7kmADpsNsxkJpXQV2z3cmlHuqEsXs2xh15LCpyFDSmtSg5qGC4588z6HLhq_rSX64sZjcCKpBdzKBhhvqXAkSjzCINQblGFqDf5mVw636m1ZTyiO3LBLXAbkpMBgpdo"
                        />
                        <div>
                          <p className="font-label-md text-on-surface">
                            {update.agent.name}
                          </p>
                          <p className="text-caption text-slate-500">
                            Field Agent • West Sector
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                          {update.newStage}
                        </span>
                      </div>
                    </div>
                    <div className="pl-0 md:pl-[52px]">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="material-symbols-outlined text-primary text-base">
                          location_on
                        </MapPin>
                        <span className="font-semibold text-emerald-800 text-sm">
                          {update.field.name}
                        </span>
                      </div>
                      <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
                        {update.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-9 text-center">
            <button className="px-4 py-3 bg-white border border-slate-200 text-primary font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-2 mx-auto">
              <ChevronDown className="material-symbols-outlined">
                expand_more
              </ChevronDown>
              Load Earlier Activity
            </button>
          </div>
        </div>
      </main>
    </RoleDashboardLayout>
  );
}
