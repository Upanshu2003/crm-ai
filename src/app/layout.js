import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'CRM.ai',
  description: 'AI-powered CRM dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
