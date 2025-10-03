import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  
  const getUserInitials = () => {
    if (!user) return "AD";
    const firstName = user.firstName || user.first_name || "";
    const lastName = user.lastName || user.last_name || "";
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "AD";
  };
  
  const getUserName = () => {
    if (!user) return "Admin User";
    return `${user.firstName || user.first_name || ""} ${user.lastName || user.last_name || ""}`.trim() || "Admin User";
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: "Home" },
    { path: "/rooms", label: "Rooms", icon: "Grid3x3" },
    { path: "/bookings", label: "Bookings", icon: "Calendar" },
    { path: "/guests", label: "Guests", icon: "Users" },
    { path: "/reports", label: "Reports", icon: "BarChart3" }
  ];

  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center">
            <ApperIcon name="Building2" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Harbor Stays</h1>
            <p className="text-xs text-white/70">Hotel Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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

      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white font-bold">
            {getUserInitials()}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{getUserName()}</p>
            <p className="text-xs text-white/70">Front Desk</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full text-white hover:bg-white/10"
        >
          <ApperIcon name="LogOut" size={16} className="mr-2" />
          Logout
        </Button>
      </div>
</div>
  );
};

export default Sidebar;