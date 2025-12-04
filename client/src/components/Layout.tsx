import { useState, useEffect, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, pageTitle, activePage, onNavigate }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        activePage={activePage}
        onNavigate={onNavigate}
        onClose={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          pageTitle={pageTitle}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMobile={isMobile}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
