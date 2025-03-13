import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Config from '../../Config';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ExerciseDatabase from '../../components/ExerciseDatabase';
import UserExerciseDatabase from '../../components/ExerciseUserDatabase';
import { getUser } from '../../pageauth/AuthUser';

function RoutineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Routine fields
  const [routine, setRoutine] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  // Workouts
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Control de vista de la base de datos de ejercicios:
  // "db" = Ejercicios por defecto, "user" = Ejercicios creados por el usuario, null = no se muestra ninguno
  const [exerciseDBType, setExerciseDBType] = useState(null);

  useEffect(() => {
    if (id) {
      fetchRoutine();
    }
  }, [id]);

  useEffect(() => {
    if (selectedWorkout && selectedWorkout.id) {
      fetchWorkoutExercises(selectedWorkout.id);
    }
  }, [selectedWorkout?.id]);

  const fetchRoutine = async () => {
    try {
      const response = await Config.getRoutineById(id);
      const routineData = response.data.data;
      setRoutine(routineData);
      setName(routineData.name);
      setDescription(routineData.description);
      setImage(routineData.image);
      fetchWorkouts(id);
    } catch (error) {
      console.error("Error fetching routine: ", error);
    }
  };

  const fetchWorkouts = async (routineId) => {
    try {
      const response = await Config.getWorkoutByRoutineId(routineId);
      const workoutsData = response.data.data;
      setWorkouts(workoutsData);
      if (workoutsData.length > 0) {
        const firstWorkout = workoutsData[0];
        setSelectedWorkout(firstWorkout);
        fetchWorkoutExercises(firstWorkout.id);
      }
    } catch (error) {
      console.error("Error fetching workouts: ", error);
    }
  };

  const fetchWorkoutExercises = async (workoutId) => {
    try {
      const response = await Config.getWorkoutExercisesByWorkoutId(workoutId);
      const exercisesData = response.data.data;
      setSelectedWorkout(prev => ({ ...prev, exercises: exercisesData }));
    } catch (error) {
      console.error("Error fetching workout exercises: ", error);
    }
  };

  const handleAddWorkout = async () => {
    const { value: workoutName } = await Swal.fire({
      title: "New Workout",
      input: "text",
      inputPlaceholder: "Enter workout name",
      showCancelButton: true,
    });
  
    if (workoutName) {
      try {
        const data = {
          routine_id: routine?.id,
          name: workoutName,
        };
        const response = await Config.createWorkout(data);
        if (response.data.code === 201) {
          Swal.fire("Created!", "Workout created successfully.", "success");
          const newWorkout = response.data.data;
          setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
          setSelectedWorkout(newWorkout);
        } else {
          Swal.fire("Error", "Failed to create workout.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  const handleEditWorkoutName = async () => {
    const { value: newName } = await Swal.fire({
      title: "Edit Day Name",
      input: "text",
      inputLabel: "New Day Name",
      inputValue: selectedWorkout ? selectedWorkout.name : "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to write something!";
      },
    });
  
    if (newName) {
      try {
        const response = await Config.updateWorkout(selectedWorkout.id, { name: newName });
        if (response.data.code === 200) {
          Swal.fire("Updated!", "Workout name updated.", "success");
          setSelectedWorkout({ ...selectedWorkout, name: newName });
          setWorkouts(
            workouts.map((workout) =>
              workout.id === selectedWorkout.id ? { ...workout, name: newName } : workout
            )
          );
        } else {
          Swal.fire("Error", "Failed to update workout name.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  const handleDeleteWorkout = async () => {
    if (workouts.length <= 1) {
      Swal.fire("Error", "You must have at least one day.", "error");
      return;
    }
  
    if (!selectedWorkout) return;
    const confirm = await Swal.fire({
      title: "Delete Day",
      text: "Are you sure you want to delete this workout? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (confirm.isConfirmed) {
      try {
        const response = await Config.deleteWorkout(selectedWorkout.id);
        if (response.data.code === 204) {
          Swal.fire("Deleted!", "Workout deleted successfully.", "success");
          const updatedWorkouts = workouts.filter(
            (workout) => workout.id !== selectedWorkout.id
          );
          setWorkouts(updatedWorkouts);
          setSelectedWorkout(updatedWorkouts.length > 0 ? updatedWorkouts[0] : null);
        } else {
          Swal.fire("Error", "Failed to delete workout.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Funciones para mostrar la vista de ejercicios
  const handleShowExerciseDB = () => {
    setExerciseDBType("db");
  };

  const handleShowExerciseUser = () => {
    setExerciseDBType("user");
  };

  const handleCloseExercises = () => {
    setExerciseDBType(null);
  };

  const handleExerciseSelect = async (exercise) => {
    try {
      const data = {
        workout_id: selectedWorkout.id,
        exercise_id: exercise.id,
        sets: 3,
      };
      const response = await Config.createWorkoutExercise(data);
      if (response.data.code === 201) {
        Swal.fire("Added!", "Exercise added to workout.", "success");
  
        const newWorkoutExercise = {
          ...response.data.data,
          exercise: {
            id: exercise.id,
            name: exercise.name,
            image: exercise.image,
          },
        };
        
        setSelectedWorkout((prev) => ({
          ...prev,
          exercises: prev.exercises
            ? [...prev.exercises, newWorkoutExercise]
            : [newWorkoutExercise],
        }));
      } else {
        Swal.fire("Error", "Failed to add exercise.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
    setExerciseDBType(null);
  };

  const handleDeleteExercise = async (workoutExerciseId) => {
    try {
      const response = await Config.deleteWorkoutExercise(workoutExerciseId);
  
      if (response.status === 204 || response.data.code === 204) {
        Swal.fire("Deleted!", "Exercise removed from workout.", "success");
        await fetchWorkoutExercises(selectedWorkout.id);
      } else {
        Swal.fire("Error", "Failed to remove exercise.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  const handleSaveRoutine = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
  
    if (image instanceof File) {
      formData.append("image", image);
    }
  
    try {
      const response = await Config.updateRoutine(routine.id, formData);
      if (response.data.code === 200) {
        Swal.fire("Success", "Routine updated successfully", "success");
        navigate("/service/routine");
      } else {
        Swal.fire("Error", "Failed to update routine", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  // Nueva función para activar la rutina
  const handleSetActiveRoutine = async () => {
    const user = getUser();
    if (!user) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }
    try {
      const data = {
        user_id: user.id,
        routine_id: routine.id,
      };
      // Asegúrate de tener implementado el método en Config que registre la rutina activa.
      const response = await Config.activeRoutine(data);
      if (response.data.code === 201) {
        Swal.fire("Activated!", "Routine set as active.", "success");
      } else {
        Swal.fire("Error", "Failed to set active routine.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        {exerciseDBType === null && (
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <label>Exercise Image</label>
                <div
                  className="card d-flex align-items-center justify-content-center p-3 mx-auto"
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "2px dashed #ccc",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : image ? (
                    <img
                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                      alt="Routine Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "16px", color: "#ccc" }}>No image</span>
                  )}
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
  
                <div className="mb-3 mt-3">
                  <label className="form-label"><strong>Routine Name</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingrese el nombre"
                  />
                </div>
  
                <div className="mb-3">
                  <label className="form-label"><strong>Routine Description</strong></label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ingrese la descripción"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <br />
              <button className="btn btn-primary" onClick={handleSaveRoutine}>
                Finish Editing
              </button>
              {/* Nuevo botón para activar la rutina */}
              <button className="btn btn-secondary ms-2" onClick={handleSetActiveRoutine}>
                Activate Routine
              </button>
            </div>
          </div>
        )}
  
        {/* Panel de workouts y ejercicios */}
        <div className={exerciseDBType ? "col-sm-9" : "col-sm-6"}>
          {exerciseDBType ? (
            exerciseDBType === "db" ? (
              <ExerciseDatabase
                onClose={handleCloseExercises}
                onSelectExercise={handleExerciseSelect}
              />
            ) : (
              <UserExerciseDatabase
                onClose={handleCloseExercises}
                onSelectExercise={handleExerciseSelect}
              />
            )
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="dropdown">
                  <button
                    className="btn border dropdown-toggle"
                    type="button"
                    id="workoutDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedWorkout ? selectedWorkout.name : "Select a day"}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="workoutDropdown">
                    {workouts.map((workout) => (
                      <li key={workout.id}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleSelectWorkout(workout)}
                        >
                          {workout.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn" onClick={handleAddWorkout}>
                  + Add Workout
                </button>
              </div>
              {selectedWorkout ? (
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <h5>{selectedWorkout.name}</h5>
                    <FaEdit
                      className="ms-2"
                      style={{ cursor: "pointer" }}
                      onClick={handleEditWorkoutName}
                    />
                    <div className="ms-auto">
                      <button
                        className="btn btn-outline-danger me-2"
                        onClick={handleDeleteWorkout}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={handleShowExerciseDB}
                      >
                        Add Exercise DB
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={handleShowExerciseUser}
                      >
                        Add Exercise User
                      </button>
                    </div>
                  </div>
                  {selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? (
                    <div className="row">
                      {selectedWorkout.exercises.map((ex) => (
                        <div key={ex.id} className="col-sm-3 mb-3">
                          <div className="card">
                            {ex.exercise && ex.exercise.image ? (
                              <img
                                src={ex.exercise.image}
                                alt={ex.exercise.name}
                                className="card-img-top"
                                style={{ height: "100px", objectFit: "cover" }}
                              />
                            ) : (
                              <div
                                style={{
                                  height: "100px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "#eee",
                                }}
                              >
                                No image
                              </div>
                            )}
                            <div className="card-body p-2">
                              <h6 className="card-title mb-1">
                                {ex.exercise ? ex.exercise.name : "No Name"}
                              </h6>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteExercise(ex.id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center mt-5">
                      <p className="mb-0">No exercises</p>
                      <small className="text-muted">Start building workout</small>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5">
                  <p className="text-center">Please select a day</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoutineEdit;
