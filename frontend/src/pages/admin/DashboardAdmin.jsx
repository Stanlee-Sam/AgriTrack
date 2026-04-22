import RoleDashboardLayout from "../../components/layout/RoleDashboardLayout";
import { navigationByRole } from "../../components/layout/navigation";
import { CircleCheck, ClipboardCheck, Leaf, Map, TriangleAlert } from "lucide-react";
import DoughnutChart from "../../components/charts/AdminDashboardChart";

export default function DashboardAdmin() {
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
      <main className="flex flex-col gap-5">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                <Map className="material-symbols-outlined" />
              </div>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-caption font-bold">
                +12%
              </span>
            </div>
            <p className="text-zinc-500 text-label-md font-medium">
              Total Fields
            </p>
            <h3 className="text-h3 font-h3 text-on-surface mt-1">128</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                <CircleCheck className="material-symbols-outlined" />
              </div>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-caption font-bold">
                Stable
              </span>
            </div>
            <p className="text-zinc-500 text-label-md font-medium">
              Active Fields
            </p>
            <h3 className="text-h3 font-h3 text-on-surface mt-1">84</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <TriangleAlert className="material-symbols-outlined" />
              </div>
              <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-caption font-bold">
                +3
              </span>
            </div>
            <p className="text-zinc-500 text-label-md font-medium">
              At Risk Fields
            </p>
            <h3 className="text-h3 font-h3 text-on-surface mt-1">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-50 rounded-lg text-zinc-700">
                <ClipboardCheck className="material-symbols-outlined" />
              </div>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-caption font-bold">
                94%
              </span>
            </div>
            <p className="text-zinc-500 text-label-md font-medium">
              Completed Fields
            </p>
            <h3 className="text-h3 font-h3 text-on-surface mt-1">32</h3>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-zinc-100 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] flex flex-col">
            <h4 className="font-h3 text-body-lg mb-6">
              Field Status Breakdown
            </h4>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <DoughnutChart />
                <div className="absolute flex flex-col items-center">
                  <span className="text-h3 font-h3">65%</span>
                  <span className="text-caption text-zinc-500">Active</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 w-full mt-8">
                <div className="flex items-center justify-between text-label-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    <span className="">Active</span>
                  </div>
                  <span className="font-bold">84</span>
                </div>
                <div className="flex items-center justify-between text-label-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="">At Risk</span>
                  </div>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between text-label-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="">Completed</span>
                  </div>
                  <span className="font-bold">32</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 bg-white rounded-xl border border-zinc-100 shadow-[0_12px_24px_-10px_rgba(45,106,79,0.08)] overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h4 className="font-h3 text-body-lg">Recent Field Updates</h4>
              <button className="text-emerald-700 text-label-md hover:underline">
                View All Updates
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low text-zinc-600 text-caption uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Field Name</th>
                    <th className="px-6 py-4 font-bold">Agent</th>
                    <th className="px-6 py-4 font-bold">Stage</th>
                    <th className="px-6 py-4 font-bold">Note</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-label-md text-on-surface">
                        North Cornfield
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                          SM
                        </div>
                        <span className="text-label-md text-zinc-600">
                          Sarah Miller
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[11px] font-bold uppercase">
                        Harvesting
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-zinc-500 italic text-sm">
                      Good yield expected
                    </td>
                    <td className="px-6 py-4 text-caption text-zinc-400">
                      Oct 24
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-label-md text-on-surface">
                        East Vineyard
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-800">
                          JH
                        </div>
                        <span className="text-label-md text-zinc-600">
                          James Holt
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[11px] font-bold uppercase">
                        Irrigating
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-zinc-500 italic text-sm">
                      Optimal soil moisture
                    </td>
                    <td className="px-6 py-4 text-caption text-zinc-400">
                      Oct 23
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-label-md text-on-surface">
                        West Meadow
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[10px] font-bold text-red-800">
                          RB
                        </div>
                        <span className="text-label-md text-zinc-600">
                          Rob Blake
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-[11px] font-bold uppercase">
                        At Risk
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-zinc-500 italic text-sm">
                      Pest detection alerts
                    </td>
                    <td className="px-6 py-4 text-caption text-zinc-400">
                      Oct 23
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-label-md text-on-surface">
                        South Plateau
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                          SM
                        </div>
                        <span className="text-label-md text-zinc-600">
                          Sarah Miller
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-[11px] font-bold uppercase">
                        Seeding
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-zinc-500 italic text-sm">
                      Winter wheat rotation
                    </td>
                    <td className="px-6 py-4 text-caption text-zinc-400">
                      Oct 22
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-label-md text-on-surface">
                        Valley Row 12
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                          JH
                        </div>
                        <span className="text-label-md text-zinc-600">
                          James Holt
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[11px] font-bold uppercase">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-zinc-500 italic text-sm">
                      Storage transfer done
                    </td>
                    <td className="px-6 py-4 text-caption text-zinc-400">
                      Oct 21
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
          <div className="h-64 rounded-xl relative overflow-hidden bg-zinc-900 group">
            <img
              alt="Aerial farm"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              data-alt="Stunning aerial high-angle shot of perfectly geometric green crop fields with irrigation patterns under a clear soft blue sky."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd8cmYtr1rm7AMmYC0c2fqz4D72ncPDrstskHKSzZvc0Ba-P4X8qiVbiCDarLTx-N8UVSaEw1ZsdtFfnM2SKe7I8wYIPr4DSr2qMhR6yri9F2S9JnpkZ8BQD9vqIbBw_Q0qla9-AP3DXyYVGXKY_WmjGVeL9pl4xud5Fi_w9-zKaJDgBh31e903u_LO38hmAXhbECdy65Bg2YC-dYLzyO_WcRuWkApgOomHts384KBkZ-ocMBFJvLzi-OQxHUNJlzUYvhd8Latd7fv"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h5 className="text-2xl font-h3">Satellite Monitoring</h5>
              <p className="text-body-md opacity-80 max-w-sm">
                Precision mapping and NDVI index analysis for all active
                parcels.
              </p>
              <button className="mt-4 w-fit px-4 py-2 bg-emerald-600 text-white rounded-lg text-label-md font-bold hover:bg-emerald-700 transition-colors">
                Launch Map
              </button>
            </div>
          </div>
          <div className="bg-primary-container p-8 rounded-xl flex flex-col justify-center text-white">
            <div className="w-12 h-12 bg-on-primary-container/20 rounded-lg flex items-center justify-center mb-6">
              <Leaf className="material-symbols-outlined text-white"/>
            </div>
            <h5 className="text-2xl font-h3 mb-2">
              Sustainable Yield Projections
            </h5>
            <p className="text-body-md opacity-90 mb-6">
              Based on current weather patterns and soil health telemetry, your
              expected yield is up 14% compared to Q3 2023.
            </p>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-3/4 rounded-full"></div>
            </div>
            <div className="flex justify-between mt-2 text-caption opacity-80">
              <span>Current Target: 850 Tons</span>
              <span>Goal: 1100 Tons</span>
            </div>
          </div>
        </section>
      </main>
    </RoleDashboardLayout>
  );
}
