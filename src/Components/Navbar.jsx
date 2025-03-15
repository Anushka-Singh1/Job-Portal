import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import Image from "../assets/job.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: <FaHome className="h-6 w-8" />, label: "Home" },
    { to: "/about", icon: <IoNewspaper className="h-6 w-8" />, label: "About" },
    {
      to: "/applied",
      icon: <SiTicktick className="h-6 w-8" />,
      label: "Applied Jobs",
    },
  ];

  return (
    <div className="bg-[#000000] h-[10vh] flex justify-between items-center px-[2rem] fixed top-0 left-2 right-2 z-[99999] rounded-lg mt-[3vh] mx-[2%]">
      <div className="flex items-center">
        <NavLink to="/">
          <img src={Image} alt="error" className="w-[17%] object-cover" />
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        {navItems.map((item, index) =>
          item.isButton ? (
            <button key={index} className="text-white" onClick={item.onClick}>
              {item.label}
            </button>
          ) : (
            <NavLink
              to={item.to}
              key={index}
              className="flex items-center space-x-2 text-white"
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          )
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center z-[100001]">
        {isMenuOpen ? (
          <MdOutlineClose
            className="h-8 w-8 text-white cursor-pointer z-[100002]"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <GiHamburgerMenu
            className="h-8 w-8 text-white cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black flex flex-col items-left pl-10 justify-center z-[100000]">
          {navItems.map((item, index) => (
            <NavLink
              to={item.to}
              key={index}
              className="flex items-center space-x-2 text-white text-2xl mb-4"
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
