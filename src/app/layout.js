import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Dashboard from './pages/Dashboard';

export const metadata = {
  title: 'CRM.ai',
  description: 'AI-powered CRM dashboard',
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            <Dashboard />
          </main>
        </div>
      </body>
    </html>
  );
}
