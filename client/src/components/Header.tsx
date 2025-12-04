import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, User, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  pageTitle: string;
  onMenuToggle: () => void;
  isMobile: boolean;
}

export default function Header({ pageTitle, onMenuToggle, isMobile }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{pageTitle}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64 lg:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 bg-transparent outline-none w-full text-sm"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              {!isMobile && (
                <>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </>
              )}
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
                  >
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left">
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Logout</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>
    </header>
  );
}
