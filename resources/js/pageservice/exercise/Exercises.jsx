import React, { useState } from "react";
import TabNavigation from "./TabNavigation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Exercises() {
  const [activeTab, setActiveTab] = useState("custom");

  // Cambia el estado al hacer clic en una pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-4">
      {/* Componente de navegación de pestañas */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Contenido que cambia dependiendo de la pestaña seleccionada */}
      <div className="text-center mt-5">
        <h3>
          {activeTab === "custom" ? "Custom Exercises" : "Exercise Database"}
        </h3>
      </div>
    </div>
  );
}

export default Exercises;
