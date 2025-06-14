"use client";

import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="w-full h-16 bg-white flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <Menu className="md:hidden cursor-pointer" size={24} />
                <h1 className="hidden md:block text-gray-600 text-xl">Dashboard</h1>
                <h1 className="md:hidden text-orange-500 font-bold text-xl">CRM.ai</h1>
            </div>
            
            <div className={`${showSearch ? 'flex' : 'hidden'} md:flex items-center w-full md:w-1/2 max-w-md bg-gray-100 rounded-md px-3 py-1 absolute md:static left-0 top-16 mx-6 md:mx-0 focus-within:ring-2 focus-within:ring-orange-300 focus-within:ring-opacity-50`}>
                <input type="text" placeholder="Search..." className="w-full text-gray-500 bg-transparent focus-visible:outline-none" />
                <Search size={20} className="text-gray-600" />
            </div>
            
            <div className="flex items-center gap-4">
                <Search onClick={() => setShowSearch(!showSearch)} className="md:hidden cursor-pointer" size={20} />
                <Bell size={20} className="text-yellow-400 cursor-pointer" />
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                    U
                </div>
            </div>
        </header>
    );
}