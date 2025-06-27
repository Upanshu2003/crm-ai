'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase';

const getDayName = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });

export default function LeadsStatusGraph() {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const fetchGraphData = async () => {
    const { data: leads, error } = await supabase.from('leads').select('*');

    if (error) {
      console.error('Error fetching leads:', error);
      return;
    }

    const grouped = {};

    leads.forEach((lead) => {
      const day = getDayName(lead.created_at);

      if (!grouped[day]) {
        grouped[day] = {
          day,
          New: 0,
          Hold: 0,
          Intrested: 0,
          Lost: 0,
          Won: 0,
        };
      }

      grouped[day][lead.status] += 1;
    });

    const orderedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formatted = orderedDays.map((day) => grouped[day] || {
      day,
      New: 0,
      Hold: 0,
      Intrested: 0,
      Lost: 0,
      Won: 0,
    });

    setGraphData(formatted);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 pt-8 w-full h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Leads Status Analytics</h2>
        <div className="flex gap-2 text-sm text-gray-500">
          <span>View: Week</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={graphData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip contentStyle={{ borderRadius: '8px' }} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="New" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line 
            type="monotone" 
            dataKey="Hold" 
            stroke="#facc15" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line 
            type="monotone" 
            dataKey="Intrested" 
            stroke="#a855f7" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line 
            type="monotone" 
            dataKey="Lost" 
            stroke="#ef4444" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <Line 
            type="monotone" 
            dataKey="Won" 
            stroke="#22c55e" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
