import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaDumbbell, FaClipboardList, FaTags } from "react-icons/fa"; // Íconos opcionales

const Sidebar = () => {
    return (
        <div className="col-sm-3 pt-3 pb-3 bg-light" style={{ height: "100vh", borderRight: "2px solid #AFAFB0" }}>
            <div className="list-group">
                <NavLink to={'/backoffice/user'} 
                    className={({ isActive }) => `list-group-item d-flex align-items-center ${isActive ? " bg-primary text-white" : "bg-light text-dark"}`}
                >
                    <FaUsers className="me-2" /> Users
                </NavLink>
                <NavLink to={'/backoffice/routine'} 
                    className={({ isActive }) => `list-group-item d-flex align-items-center ${isActive ? "active bg-primary text-white" : "bg-light text-dark"}`}
                >
                    <FaClipboardList className="me-2" /> Routines
                </NavLink>
                <NavLink to={'/backoffice/exercise'} 
                    className={({ isActive }) => `list-group-item d-flex align-items-center ${isActive ? "active bg-primary text-white" : "bg-light text-dark"}`}
                >
                    <FaDumbbell className="me-2" /> Exercises
                </NavLink>
                <NavLink to={'/backoffice/type'} 
                    className={({ isActive }) => `list-group-item d-flex align-items-center ${isActive ? "active bg-primary text-white" : "bg-light text-dark"}`}
                >
                    <FaTags className="me-2" /> Types
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
