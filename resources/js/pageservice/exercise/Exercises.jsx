import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TabNavigation from "./TabNavigation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Config from "../../Config.jsx";
import { getUser } from "../../pageauth/AuthUser.jsx";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

function Exercises() {
  const [activeTab, setActiveTab] = useState("custom");
  const [defaultExercises, setDefaultExercises] = useState([]);
  const [customExercises, setCustomExercises] = useState([]);
  const navigate = useNavigate();
  const isLimitReached = customExercises.length >= 3;

  
  useEffect(() => {
    fetchDefaultExercises();
    fetchCustomExercises();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCardClickView = (id) => {
    navigate(`view/${id}`);
  };

  const handleCreateCustom = () => {
    navigate("create");
  };

  const handleCardClickEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDeleteCustomExercise = async (id) =>{
      const confirm = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
      });

      if (confirm.isConfirmed) {
          try {
              await Config.deleteExercise(id);
              Swal.fire("Deleted!", "Exercise has been deleted.", "success");
              fetchDefaultExercises();
              fetchCustomExercises();
          } catch (error) {
              Swal.fire("Error", "Failed to delete exercise.", "error");
          }
      }
  };
  

  const fetchDefaultExercises = async () => {
    try {
      const response = await Config.getExerciseAllDefault();
      setDefaultExercises(response.data.data);
    } catch (error) {
      console.error("Error fetching default exercises:", error);
    }
  };

  const fetchCustomExercises = async () => {
    try {
      const response = await Config.getExerciseByUserId(getUser().id);
      setCustomExercises(response.data.data);
    } catch (error) {
      console.error("Error fetching custom exercises:", error);
    }
  };

  return (
    <div className="container mt-4">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="mt-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "300px" }}
          placeholder={`Search ${
            activeTab === "custom" ? "Custom" : "Default"
          } Exercises`}
        />
        <button
          className="btn btn-primary"
          onClick={handleCreateCustom}
          disabled={isLimitReached}
        >
          Create custom exercise ({customExercises.length}/3)
        </button>
      </div>

      {activeTab === "custom" ? (
        <div className="row mt-4">
          {customExercises.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No custom exercises</h5>
              <p>You have not created any custom exercises yet.</p>
            </div>
          ) : (
            customExercises.map((ex) => (
              <div className="col-md-3 mb-4" key={ex.id}>
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClickEdit(ex.id)}
                >
                  {ex.image ? (
                    <img
                      src={ex.image}
                      alt={ex.name}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#eee",
                      }}
                    >
                      No image
                    </div>
                  )}
                  <div className="card-body">
                    <h6 className="card-title">{ex.name}</h6>
                    <p className="card-text">
                      {ex.type && ex.type.name ? ex.type.name : "No muscle group"}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-danger"
                     
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCustomExercise(ex.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="row mt-4">
          {defaultExercises.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No default exercises</h5>
              <p>No exercises found.</p>
            </div>
          ) : (
            defaultExercises.map((ex) => (
              <div className="col-md-3 mb-4" key={ex.id}>
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClickView(ex.id)}
                >
                  {ex.image ? (
                    <img
                      src={ex.image}
                      alt={ex.name}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#eee",
                      }}
                    >
                      No image
                    </div>
                  )}
                  <div className="card-body">
                    <h6 className="card-title">{ex.name}</h6>
                    <p className="card-text">
                      {ex.type && ex.type.name ? ex.type.name : "No muscle group"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Exercises;
