import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-lg bg-[#151517] sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-[#ffffff08] rounded-2xl ml-2 mr-2">
      <Link to="/">
        <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
          VOIDMAIL
        </div>
      </Link>
      <div className="space-x-8 text-sm font-medium hidden md:flex uppercase tracking-wider">
        {["Home", "About", "Contact", "PrivacyPolicy"].map((item) => (
          <Link
            key={item}
            to={
              item === "Home" 
                ? "/" 
                : item === "PrivacyPolicy" 
                  ? "/privacy" 
                  : `/${item.toLowerCase()}`
            }
            className="hover:text-[#10B981] transition-all duration-300"
          >
            {item.split(/(?=[A-Z])/).join(" ")} {/* Converts "PrivacyPolicy" to "Privacy Policy" */}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;