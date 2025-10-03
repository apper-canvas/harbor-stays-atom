import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Dashboard from "@/components/pages/Dashboard";
import Rooms from "@/components/pages/Rooms";
import Bookings from "@/components/pages/Bookings";
import Guests from "@/components/pages/Guests";
import Reports from "@/components/pages/Reports";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <MobileSidebar 
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Routes>
            <Route path="/" element={<Dashboard onMenuClick={() => setMobileMenuOpen(true)} />} />
            <Route path="/rooms" element={<Rooms onMenuClick={() => setMobileMenuOpen(true)} />} />
            <Route path="/bookings" element={<Bookings onMenuClick={() => setMobileMenuOpen(true)} />} />
            <Route path="/guests" element={<Guests onMenuClick={() => setMobileMenuOpen(true)} />} />
            <Route path="/reports" element={<Reports onMenuClick={() => setMobileMenuOpen(true)} />} />
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;