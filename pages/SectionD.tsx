
import React from 'react';
import { School, Calendar, CheckSquare, FileSignature } from 'lucide-react';

interface SectionDProps {
  data: any;
  updateData: (val: any) => void;
}

const SectionD: React.FC<SectionDProps> = ({ data, updateData }) => {
  const responsibilities = [
    "Admission Committee", "Grievance Cell", "Alumni Association", "ERP Coordinator", 
    "Hostel Warden", "Sports Incharge", "Placement Coordinator", "Exam Cell Incharge"
  ];

  const toggleResp = (resp: string) => {
    const current = [...data.responsibilities];
    const index = current.indexOf(resp);
    if (index > -1) current.splice(index, 1);
    else current.push(resp);
    updateData({ ...data, responsibilities: current });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
            <School size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Section D: Institute Activity</h2>
            <p className="text-slate-500 font-medium">Exam duties, answer sheet valuation and institutional contributions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="text-purple-500" size={20} /> Invigilation Duties
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Odd Semester</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200" value={data.invigilationOdd} onChange={e => updateData({...data, invigilationOdd: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Even Semester</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200" value={data.invigilationEven} onChange={e => updateData({...data, invigilationEven: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileSignature className="text-purple-500" size={20} /> Valuation Details
              </h3>
              <textarea 
                placeholder="Details of answer sheets evaluated (University/Autonomous)..." 
                className="w-full h-32 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500"
                value={data.valuation}
                onChange={e => updateData({...data, valuation: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckSquare className="text-purple-500" size={20} /> Institutional Responsibilities
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {responsibilities.map(r => (
                <button 
                  key={r}
                  onClick={() => toggleResp(r)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${data.responsibilities.includes(r) ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'}`}
                >
                  <span className="font-bold">{r}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${data.responsibilities.includes(r) ? 'bg-white border-white text-purple-600' : 'border-slate-200'}`}>
                    {data.responsibilities.includes(r) && <CheckSquare size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionD;
