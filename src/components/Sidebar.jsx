'use client';

import React from 'react';
import { LayoutDashboard, Users, BarChart2, Mail, StickyNote, Settings } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Contacts', icon: Users, href: '/contacts' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
  { name: 'Email Generator', icon: Mail, href: '/emails' },
  { name: 'Notes', icon: StickyNote, href: '/notes' },
  { name: 'Settings', icon: Settings, href: '/settings' }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 bg-orange-500 text-white p-4 flex flex-col gap-4 shadow-md">
      <div className="text-2xl font-bold mb-6">CRM.ai</div>
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link href={item.href} key={item.name} className="flex items-center gap-3 p-2 rounded hover:bg-orange-600">
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

