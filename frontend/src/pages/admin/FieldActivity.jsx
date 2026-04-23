import { Bug, ChevronDown, CircleCheck, Download, Droplet, History, Leaf, ListFilter, MapPin, Tractor, User } from "lucide-react";
import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";

export default function FieldActivity() {
  const handleLogout = () => {
    window.alert("Logout action goes here.");
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 z-0"></div>
            <div className="space-y-5 relative z-10">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-4 border-background bg-white shadow-md flex items-center justify-center z-20">
                    <Leaf className="material-symbols-outlined text-primary">
                      eco
                    </Leaf>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(45,106,79,0.06)] border border-slate-50 group-hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] transition-shadow">
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
                          Sarah Miller
                        </p>
                        <p className="text-caption text-slate-500">
                          Field Agent • West Sector
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                        Harvesting
                      </span>
                      <span className="text-caption text-slate-400">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                  <div className="pl-0 md:pl-[52px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="material-symbols-outlined text-primary text-base">
                        location_on
                      </MapPin>
                      <span className="font-semibold text-emerald-800 text-sm">
                        North Cornfield
                      </span>
                    </div>
                    <p className="font-body-md text-on-surface-variant leading-relaxed mb-4">
                      Yield is looking better than expected after recent rains.
                      Harvesting 30% complete in Sector A. Soil moisture levels
                      are stabilizing within the target range.
                    </p>
                    <div className="flex gap-2">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-100">
                        <img
                          alt="Field crop view"
                          className="w-full h-full object-cover"
                          data-alt="close-up of healthy corn plants in a vast field under clear blue sky with golden sunlight"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9qtLb8GX3Wv1UCvD4ithO2JDOhe78lKcV6CyBcDFRT1YurOgsXnEFG0XTl4_zqyEvtglwA5PZaiCd0uUyai-y7EKYw7m7Od_kGuWlgzzFc_x1VZhDXwmjB0hKF-wfjkQdSwBeNgu6KEtfS6bMoTZgo0akbQCn7njiMuN9Sd1sUYmHiojkQOFB43HbXkOkfBpcvtPJiuSxuN3Ep40lZIZPo8jeEpzyfar4LlmV3HfNDhCy4xjRa8FXbKO6X3ajMeNme7Np-hG1lfS_"
                        />
                      </div>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-100">
                        <img
                          alt="Tractor operation"
                          className="w-full h-full object-cover"
                          data-alt="modern green tractor harvesting corn in a large agricultural field at sunset"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp8i_A3YAY_ZjJflCCVYf3QNdq8GQgB3qCTf_V9TjlRp_ZoNnbRnm0D8D2XNkMsdSCfcH9dIkBwSRCgtFRIy3C7T5GL2dEeHdhcnW39Z1GRQ_uvmpTPiBDQiVA5ufl4S2PVQM4L6oizwOebymQSleZukoELKGOj8kQ09M7wgFNvBwpYqmHO3GE_VRl6MipBsczVbIYCDGd6_4Vx5cdzx4rU72soSgR0uQeo75BH0UDvMVNQsh-wHNYXcdrD54hHSffmv8RwR1WPH55"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-4 border-background bg-white shadow-md flex items-center justify-center z-20">
                    <Droplet className="material-symbols-outlined text-primary">
                      water_drop
                    </Droplet>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(45,106,79,0.06)] border border-slate-50 group-hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        alt="Marcus Chen"
                        className="w-10 h-10 rounded-full object-cover"
                        data-alt="portrait of a focused young man in a denim work shirt with a sun-kissed complexion in an outdoor setting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXqpUAEKl6QrfJMzu1V0pk0KAlptSCFpBk6JBYXAyJw8VpExC-aLMLaOSnyRQUSX86pMyHXqjbVt3AqoOvt2zNQ2GxBqh-GK9nJ8GB5W7Gv18XjwQX_vtb3Eo0pNbqAloqyWBjICiV12di5ld6yGHLEeg0kSAEeGUmblZcWUgdtK5pdJPmJDtPdahErHwgrKCOZpSNLfwadYdzV6iXPuJ6feKwRi3QWM0oVsGMgzKbMMDB4tbx48tJWmEGKzcd3wCJdZeDH8TSY7u2"
                      />
                      <div>
                        <p className="font-label-md text-on-surface">
                          Marcus Chen
                        </p>
                        <p className="text-caption text-slate-500">
                          Irrigation Tech • South Sector
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-[11px] font-bold uppercase tracking-wider">
                        Irrigating
                      </span>
                      <span className="text-caption text-slate-400">
                        4 hours ago
                      </span>
                    </div>
                  </div>
                  <div className="pl-0 md:pl-[52px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="material-symbols-outlined text-primary text-base">
                        location_on
                      </MapPin>
                      <span className="font-semibold text-emerald-800 text-sm">
                        South Soybean Ridge
                      </span>
                    </div>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      Pivot system #4 required a nozzle adjustment. Flow rate is
                      now back to optimal 850 GPM. Scheduled cycle will complete
                      by 22:00 tonight.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-4 border-background bg-white shadow-md flex items-center justify-center z-20">
                    <Bug className="material-symbols-outlined text-primary">
                      pest_control
                    </Bug>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(45,106,79,0.06)] border border-slate-50 group-hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        alt="Elena Rossi"
                        className="w-10 h-10 rounded-full object-cover"
                        data-alt="professional headshot of a young woman with dark hair wearing glasses and a light green polo shirt with a farm landscape in the background"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMRusaoaXq4NrRdpT4hEpX4BlZ0xHbR66-CpmLDSam9PhGK81L4OpRJFaC-5oq066vlKHGp0pwT2cPeHJt6IHJjOwI5kSGFjZ5XNjHucQq_S9607Tte_n2d-gpqEJZwUEJomF2iQVOstSc73LuqlVjVCnCnS93B5i-_DM14zglu84QhrNOAbGtQ0YW7CqoDUF2AGiwksq0mQufDH2Dr8-q_FiLVMEUYf1FIvQLvt5JXNbi23llRQlchrQ_TuJjWw-OTkSWnWvgWzQH"
                      />
                      <div>
                        <p className="font-label-md text-on-surface">
                          Elena Rossi
                        </p>
                        <p className="text-caption text-slate-500">
                          Agronomist • Central Zone
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-[11px] font-bold uppercase tracking-wider">
                        Alert
                      </span>
                      <span className="text-caption text-slate-400">
                        Oct 24, 10:15 AM
                      </span>
                    </div>
                  </div>
                  <div className="pl-0 md:pl-[52px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="material-symbols-outlined text-primary text-base">
                        location_on
                      </MapPin>
                      <span className="font-semibold text-emerald-800 text-sm">
                        East Vineyard
                      </span>
                    </div>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      Spotted early signs of powdery mildew in Block 7.
                      Recommending immediate organic fungicidal treatment for
                      the next 48 hours to prevent spread.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-4 border-background bg-white shadow-md flex items-center justify-center z-20">
                    <CircleCheck className="material-symbols-outlined text-primary">
                      task_alt
                    </CircleCheck>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(45,106,79,0.06)] border border-slate-50 group-hover:shadow-[0_8px_24px_rgba(45,106,79,0.12)] transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        AS
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface">
                          Auto-System
                        </p>
                        <p className="text-caption text-slate-500">
                          AgriTrack IoT • Global
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary-fixed-dim text-on-primary-fixed text-[11px] font-bold uppercase tracking-wider">
                        Analysis Complete
                      </span>
                      <span className="text-caption text-slate-400">
                        Oct 24, 08:30 AM
                      </span>
                    </div>
                  </div>
                  <div className="pl-0 md:pl-[52px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="material-symbols-outlined text-primary text-base">
                        location_on
                      </MapPin>
                      <span className="font-semibold text-emerald-800 text-sm">
                        All Sectors
                      </span>
                    </div>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      Daily satellite health index calculated. Overall farm
                      vegetation vigor is at 0.82 NDVI, showing a 4% increase
                      from last week's report.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-9 text-center">
            <button className="px-4 py-3 bg-white border border-slate-200 text-primary font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-2 mx-auto">
              <ChevronDown className="material-symbols-outlined">expand_more</ChevronDown>
              Load Earlier Activity
            </button>
          </div>
        </div>
      </main>
    </RoleDashboardLayout>
  );
}
