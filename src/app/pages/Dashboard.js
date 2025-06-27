'use client';

import CustomerTable from "@/components/Dashboard/CustomerTable";
import LeadsTable from "@/components/Dashboard/LeadsTable";
import LeadsChart from "@/components/Dashboard/LeadsChart";
import Calender from "@/components/Dashboard/Calender";
export default function Dashboard() {    return (
        <div className="p-6">
            <div className="grid grid-cols-10 gap-4 mb-6">
                <div className="col-span-7">
                    <LeadsChart />
                </div>
                <div className="col-span-3">
                    <Calender />
                </div>
            </div>
            <CustomerTable />
            <LeadsTable />
        </div>
    );
}