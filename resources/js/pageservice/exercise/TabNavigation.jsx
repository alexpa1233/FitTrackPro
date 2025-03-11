import React from "react";

function TabNavigation({ activeTab, onTabChange }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "custom" ? "active" : ""}`}
          onClick={() => onTabChange("custom")}
        >
          Custom Exercises
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "database" ? "active" : ""}`}
          onClick={() => onTabChange("database")}
        >
          Exercise Database
        </button>
      </li>
    </ul>
  );
}

export default TabNavigation;
