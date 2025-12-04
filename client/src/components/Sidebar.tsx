import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  FileText,
  Settings,
  X,
} from 'lucide-react';
import { MenuItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  activePage: string;
  onNavigate: (page: string) => void;
  onClose: () => void;
  isMobile: boolean;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: 'payments', label: 'Payments', icon: 'CreditCard', path: '/payments' },
  { id: 'students', label: 'Students', icon: 'Users', path: '/students' },
  { id: 'reports', label: 'Reports', icon: 'FileText', path: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  CreditCard,
  Users,
  FileText,
  Settings,
};

export default function Sidebar({ isOpen, activePage, onNavigate, onClose, isMobile }: SidebarProps) {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 },
  };

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          ${isMobile ? 'fixed' : 'relative'}
          ${isOpen ? 'w-64' : 'w-20'}
          ${isMobile && !isOpen ? 'pointer-events-none' : ''}
          h-screen bg-slate-900 text-white transition-all duration-300 z-50
          flex flex-col
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <LayoutDashboard className="w-8 h-8 text-blue-400" />
            {isOpen && <h1 className="text-xl font-bold">EduPay</h1>}
          </motion.div>
          {isMobile && isOpen && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activePage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-medium whitespace-nowrap">Admin User</p>
              <p className="text-xs text-gray-400 whitespace-nowrap">admin@edupay.com</p>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
