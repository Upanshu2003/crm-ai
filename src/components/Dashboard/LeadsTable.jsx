'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const statusOptions = ['New', 'Hold', 'Intrested', 'Lost', 'Won'];

export default function LeadsTable() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('leads').select('*');
        if (error) {
            console.error('Error fetching leads:', error);
        } else {
            setLeads(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLeads();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('leads_channel')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'leads' }, 
                (payload) => {
                    fetchLeads();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleStatusChange = async (id, newStatus, leadData) => {
        try {
            const { error: updateError } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', id);

            if (updateError) {
                throw new Error(updateError.message);
            }

            if (newStatus === 'Won') {
                const { error: insertError } = await supabase
                    .from('customers')
                    .insert({
                        name: leadData.name,
                        email: leadData.email,
                        company: leadData.company,
                        phone: leadData.phone,
                    });

                if (insertError) {
                    throw new Error(insertError.message);
                }
            }
            
            setError(null);
            await fetchLeads();
        } catch (err) {
            setError(err.message);
            console.error('Error updating lead status:', err);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 mt-4 overflow-x-auto">
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            <h2 className="text-2xl font-bold text-orange-600 mb-6 flex items-center">
                <span>Leads Overview</span>
                <span className="ml-3 text-sm bg-orange-100 text-orange-600 py-1 px-3 rounded-full">
                    {leads.length} total
                </span>
            </h2>
            <table className="min-w-full table-auto text-left text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-gray-600 font-semibold tracking-wider">Name</th>
                        <th className="px-6 py-3 text-gray-600 font-semibold tracking-wider">Email</th>
                        <th className="px-6 py-3 text-gray-600 font-semibold tracking-wider">Company</th>
                        <th className="px-6 py-3 text-gray-600 font-semibold tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-gray-600 font-semibold tracking-wider">Status</th>
                        <th className="px-6 py-3 text-gray-600 font-semibold tracking-wider">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 font-medium text-gray-800">{lead.name}</td>
                            <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                            <td className="px-6 py-4 text-gray-600">{lead.company}</td>
                            <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                            <td className="px-6 py-4">
                                <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value, lead)}
                                    className="font-medium cursor-pointer text-gray-700 focus:outline-none">
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}