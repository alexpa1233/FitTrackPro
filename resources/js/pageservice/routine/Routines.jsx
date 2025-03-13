import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabNavigation from "./TabNavigation.jsx";
import Config from "../../Config";
import Swal from "sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css";
import { getUser } from "../../pageauth/AuthUser.jsx";

function Routines() {
  const [activeTab, setActiveTab] = useState("custom");
  const [defaultRoutines, setDefaultRoutines] = useState([]);
  const [customRoutines, setCustomRoutines] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    fetchDefaultRoutines();
    fetchCustomRoutines();
  }, []);

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const fetchDefaultRoutines = async () => {
    try {
      const response = await Config.getRoutineAllDefault();
      setDefaultRoutines(response.data.data);
    } catch (error) {
      console.error("Error fetching default routines: ", error);
    }
  };


  const fetchCustomRoutines = async () => {
    try {
      
      const response = await Config.getRoutineByUserId(getUser().id);
      setCustomRoutines(response.data.data);
    } catch (error) {
      console.error("Error fetching custom routines: ", error);
    }
  };

  const handleCreateRoutine = async () => {
    const { value: routineName } = await Swal.fire({
      title: "Enter new routine name",
      input: "text",
      inputPlaceholder: "Routine name...",
      showCancelButton: true,
      confirmButtonText: "Create",
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("Routine name cannot be empty");
        }
        return value;
      },
    });

    if (routineName) {
      const data = {
        name: routineName,
        user_id: getUser().id,
      };
      try {
        const response = await Config.createRoutines(data);
        if (response.data.code === 201) {
          const routineId = response.data.data.id;
          
          const workoutData = {
            name: "workout1",
            routine_id: routineId,
          };
          const response2 = await Config.createWorkout(workoutData);
          if (response2.data.code === 201) {
            Swal.fire("Created!", "Routine created successfully", "success");
            
            handleEditRoutine(routineId);
          } else {
            Swal.fire("Error", "Failed to create workout", "error");
          }
        } else {
          Swal.fire("Error", "Failed to create routine", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  const handleDeleteRoutine = async (id) => {
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
        const response = await Config.deleteRoutine(id);
        if (response.data.code === 204) {
          Swal.fire("Deleted!", "The routine has been deleted.", "success");
          
          activeTab === "custom"
            ? fetchCustomRoutines()
            : fetchDefaultRoutines();
        } else {
          Swal.fire("Error", "Failed to delete routine.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Server error", "error");
      }
    }
  };


  const handleEditRoutine = (id) => {
    navigate(`edit/${id}`);
  };


  const handleViewRoutine = (id) => {
    navigate(`view/${id}`);
  };

  return (
    <div className="container mt-4">
      <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
      <div className="row">
        <div className="col mt-3 mb-3">
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>
              {activeTab === "custom" ? "Your Routines" : "Routine Database"}
            </h3>
            <button
              className="btn btn-success"
              onClick={handleCreateRoutine}
            >
              Add Routine
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === "custom"
                ? customRoutines.length > 0
                  ? customRoutines.map((routine) => (
                      <tr key={routine.id}>
                        <td>{routine.id}</td>
                        <td>{routine.name}</td>
                        <td>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => handleEditRoutine(routine.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteRoutine(routine.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No routines found.
                      </td>
                    </tr>
                  )
                : defaultRoutines.length > 0
                ? defaultRoutines.map((routine) => (
                    <tr key={routine.id}>
                      <td>{routine.id}</td>
                      <td>{routine.name}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleViewRoutine(routine.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No routines found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Routines;
