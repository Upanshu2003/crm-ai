'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchCustomers(); },
    []);
    const fetchCustomers = async () => {
        setLoading(true);
        const { data,error } = await supabase.from('customers').select('*');
        if (error) { console.error('Error fetching customers:', error.message); } 
        else { setCustomers(data); }
        setLoading(false);
    };
    return (
        <div className="bg-white shadow-lg rounded-2x1 p-6 mt-4 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Customer List</h2>
            {loading ? (
                <p className="text-gray-500">Loading customers...</p>
            ) : (
                <table className="min-w-full table-auto text-left">
                    <thead className="bg-orange-100 text-orange-700">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customers.map((customer)=>(
                            <tr key={customer.id} className="border-b border-gray-200 hover:bg-orange-50">
                                <td className="px-4 py-3 text-gray-700">{customer.name}</td>
                                <td className="px-4 py-3 text-gray-700">{customer.email}</td>
                                <td className="px-4 py-3 text-gray-700">{customer.company}</td>
                                <td className="px-4 py-3 text-gray-700">{new Date(customer.created_at).toLocaleDateString()}</td>  
                                <td className="px-4 py-3 flex gap-3">    
                                    <FiEdit className="text-orange-600 cursor-pointer hover:text-orange-800" size={20} />
                                    <FiTrash2 className="text-red-600 cursor-pointer hover:text-red-800" size={20} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
