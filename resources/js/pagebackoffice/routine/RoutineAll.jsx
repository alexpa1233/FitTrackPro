import React, { useEffect, useState } from 'react'
import Sidebar from "../Sidebar";
import Config from "../../Config";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUser } from '../../pageauth/AuthUser';

function RoutineAll() {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await Config.getRoutineAllDefault();
      setRoutines(response.data.data);
    } catch (error) {
      console.error("Error fetching routines: "+ error);
    }
  };

  const handleCreateRoutine = async () => {
    const { value: name } = await Swal.fire({
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

    if (name) {
      const data = {
          name:name,
          user_id:getUser().id
      }
      try {
        const response = await Config.createRoutines(data);
        if (response.data.code === 201) {
          const routineId= response.data.data.id;
          const data = {
            name: 'workout1',
            routine_id: routineId,
          }
          const response2 = await Config.createWorkout(data);
          if(response2.data.code === 201){
            navigate(`${routineId}`);
          }else{
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
  }
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
          fetchRoutines();
        } else {
          Swal.fire("Error", "Failed to delete routine.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Server error", "error");
      }
    }
  }

  return (
    <div className="container bg-light p-4">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card p-4">
            <div className="d-flex justify-content-between mb-3">
              <h3>Routine List</h3>
              <button className="btn btn-success" onClick={handleCreateRoutine}>Add Routine</button>
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
                {routines.length > 0 ? (
                  routines.map((routine, index) => (
                    <tr key={index}>
                      <td>{routine.id}</td>
                      <td>{routine.name}</td>
                      <td>
                        <button className="btn btn-primary me-2" onClick={() => navigate(`${routine.id}`)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteRoutine(routine.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No routines found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoutineAll