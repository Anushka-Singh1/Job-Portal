import React from "react";
import { 
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle
} from '@ionic/react';
import { useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <FaHome className="h-6 w-6" />, label: "Home" },
    { to: "/about", icon: <IoNewspaper className="h-6 w-6" />, label: "About" },
    {
      to: "/applied",
      icon: <SiTicktick className="h-6 w-6" />,
      label: "Applied Jobs",
    },
  ];

  return (
    <IonList>
      {navItems.map((item, index) => (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem 
            routerLink={item.to} 
            routerDirection="root"
            lines="none"
            detail={false}
            className={location.pathname === item.to ? 'selected' : ''}
            button
          >
            <div className="flex items-center w-full py-2">
              {item.icon}
              <IonLabel className="ml-2">{item.label}</IonLabel>
            </div>
          </IonItem>
        </IonMenuToggle>
      ))}
    </IonList>
  );
}

export default Navbar;
