"use client";

import { useState, useEffect } from "react";
import { 
  FilePieChart, Plus, Download, Send, Search, Filter, 
  CheckCircle, Clock, Database, HardDrive, Share2, MoreVertical
} from "lucide-react";

export default function ReportDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/api/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch reports", err);
        setLoading(false);
      });
  }, []);

  const handleTriggerReport = (name: string) => {
    fetch("http://localhost:5005/api/trigger-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportName: name, dataSource: "Main Database" })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert("Error triggering report"));
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b pb-8 border-gray-100">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <FilePieChart className="text-indigo-600" />
              ReportStream <span className="text-indigo-600">Enterprise</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Automated data aggregation and professional PDF reporting engine.</p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="bg-white border text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition shadow-sm">
              <Database size={18} className="text-indigo-600"/> Data Sources
            </button>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20">
              <Plus size={18}/> New Report
            </button>
          </div>
        </header>

        {/* Action Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4 group cursor-pointer hover:border-indigo-200 transition">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition"><Database size={20}/></div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Connected</p>
                 <h4 className="font-bold text-slate-800">4 Data Sources</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4 group cursor-pointer hover:border-emerald-200 transition">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition"><CheckCircle size={20}/></div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Success Rate</p>
                 <h4 className="font-bold text-slate-800">99.8% Reliability</h4>
              </div>
           </div>
           <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4 group cursor-pointer hover:border-blue-200 transition">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition"><HardDrive size={20}/></div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Storage</p>
                 <h4 className="font-bold text-slate-800">12.4 GB Generated</h4>
              </div>
           </div>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input className="w-full h-full pl-12 pr-4 bg-white border rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm font-medium" placeholder="Search reports..." />
           </div>
        </div>

        {/* Report List */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-gray-50 overflow-hidden">
          <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
             <span className="font-bold text-slate-500 text-xs uppercase tracking-widest">Report Archive ({reports.length})</span>
             <button className="text-slate-400 hover:text-indigo-600 transition font-bold text-xs flex items-center gap-1"><Filter size={14}/> Filter Archive</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-4">Report Details</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">File Status</th>
                  <th className="px-8 py-4">Generated On</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {reports.map(report => (
                  <tr key={report.id} className="hover:bg-slate-50/80 transition group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                            <FilePieChart size={20}/>
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">{report.name}</p>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{report.id}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{report.type}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${
                         report.status === 'Generated' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                       }`}>
                          {report.status === 'Generated' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                          {report.status}
                       </span>
                       {report.size !== "N/A" && <span className="text-[10px] text-slate-400 block font-bold mt-1 ml-1">{report.size}</span>}
                    </td>
                    <td className="px-8 py-6 font-medium text-slate-500">{report.date}</td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex justify-center gap-3">
                          <button className="text-slate-400 hover:text-indigo-600 transition"><Download size={18}/></button>
                          <button className="text-slate-400 hover:text-indigo-600 transition"><Share2 size={18}/></button>
                          <button className="text-slate-400 hover:text-indigo-600 transition"><MoreVertical size={18}/></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise Strategy Footer */}
        <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/30 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
           <div className="relative z-10 space-y-2">
              <h4 className="text-2xl font-bold">Automation Insight</h4>
              <p className="text-indigo-100 leading-relaxed font-medium max-w-2xl opacity-90">
                 Your automated scheduling has reduced manual reporting time by 14 hours this month. The next "User Growth Analysis" report will include the newly integrated Stripe data source for more accurate financial forecasting.
              </p>
           </div>
           <div className="mt-8 md:mt-0 relative z-10">
              <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-extrabold hover:bg-indigo-50 transition shadow-lg">
                 Schedule Q2 Audit
              </button>
           </div>
           <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12">
              <FilePieChart size={200}/>
           </div>
        </div>
      </div>
    </main>
  );
}
