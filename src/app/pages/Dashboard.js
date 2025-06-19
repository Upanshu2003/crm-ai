'use client';

import CustomerTable from "@/components/Dashboard/CustomerTable";
import LeadsTable from "@/components/Dashboard/LeadsTable";
export default function Dashboard() {
    return (
        <div className="p-6">
            <CustomerTable />
            <LeadsTable />
        </div>
    );
}