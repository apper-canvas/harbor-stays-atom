import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MobileSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/", label: "Dashboard", icon: "Home" },
    { path: "/rooms", label: "Rooms", icon: "Grid3x3" },
    { path: "/bookings", label: "Bookings", icon: "Calendar" },
    { path: "/guests", label: "Guests", icon: "Users" },
    { path: "/reports", label: "Reports", icon: "BarChart3" }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div 
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-primary text-white flex flex-col z-50 transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center">
                <ApperIcon name="Building2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Harbor Stays</h1>
                <p className="text-xs text-white/70">Hotel Management</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <ApperIcon name="X" size={24} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-white/70">Front Desk</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;