import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "../../Config";
import "bootstrap/dist/css/bootstrap.min.css";

function RoutineView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados de la rutina
  const [routine, setRoutine] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  // Workouts asociados (se muestran de forma informativa)
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

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

  // En vista solo lectura, no se permiten acciones de edición
  const handleFinishEditing = () => {
    // Simplemente redirige a la lista de rutinas u otra ruta
    navigate("/service/routine");
  };

  if (!routine) return null;

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <label><strong>Routine Image</strong></label>
              <div
                className="card d-flex align-items-center justify-content-center p-3 mx-auto"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px dashed #ccc",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Routine"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : image ? (
                  <img
                    src={typeof image === "string" ? image : URL.createObjectURL(image)}
                    alt="Routine"
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
              <div className="mb-3 mt-3">
                <label className="form-label"><strong>Routine Name</strong></label>
                <input
                  type="text"
                  className="form-control"
                  value={name || ""}
                  readOnly
                  placeholder="Routine name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label"><strong>Routine Description</strong></label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description || ""}
                  readOnly
                  placeholder="Routine description"
                />
              </div>
            </div>
          </div>
          <div className="mb-3 text-center">
            <button className="btn btn-primary" onClick={handleFinishEditing}>
              Finish Editing
            </button>
          </div>
        </div>


        <div className="col-sm-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>{selectedWorkout ? selectedWorkout.name : "Select a workout"}</h5>
          </div>
          {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? (
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5">
              <p className="mb-0">No exercises</p>
              <small className="text-muted">Workouts have no exercises</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoutineView;
