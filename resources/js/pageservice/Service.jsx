import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../Config';
import { getUser } from '../pageauth/AuthUser';

const Service = () => {
  const navigate = useNavigate();
  const [routineActive, setRoutineActive] = useState();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchActiveRoutine = async () => {
      const user = getUser();
      if (!user) return;
      try {
        const response = await Config.getRoutineActiveByUserId(user.id);
        if (response.data && response.data.data) {
          const routineData = response.data.data;
          setRoutineActive(routineData);
          // Una vez obtenida la rutina activa, se recuperan los workouts asociados
          fetchWorkouts(routineData.id);
        } else {
          setRoutineActive(null);
        }
      } catch (error) {
        console.error("Error fetching active routine:", error);
        setRoutineActive(null);
      }
    };

    const fetchWorkouts = async (routineId) => {
      try {
        const response = await Config.getWorkoutByRoutineId(routineId);
        if (response.data && response.data.data) {
          setWorkouts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchActiveRoutine();
  }, []);

  const handleSelectWorkout = (workout) => {
    // Navega a la pantalla para rellenar los datos del exercise (por ejemplo, exercises-statics)
    navigate(`/service/exercises-statics/${workout.id}`);
  };

  // Mientras routineActive sea undefined (petición sin resolver), no renderiza nada
  if (routineActive === undefined) return null;

  return (
    <div className="container-fluid bg-light">
      <div className="row">
       <h2>Routine Active</h2>
        <div className="col-sm-4">
          {routineActive ? (
            <div className="card">
              <div className="card-body">
                <label>Routine Image</label>
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
                  {routineActive.image ? (
                    <img
                      src={
                        typeof routineActive.image === "string"
                          ? routineActive.image
                          : URL.createObjectURL(routineActive.image)
                      }
                      alt="Routine Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "16px", color: "#ccc" }}>
                      No image
                    </span>
                  )}
                </div>
                <div className="mb-3 mt-3">
                  <label className="form-label">
                    <strong>Routine Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={routineActive.name || ""}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Routine Description</strong>
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={routineActive.description || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ) : (
            <p>No tienes una rutina activa aún.</p>
          )}
        </div>
        {/* Panel derecho: Lista de workouts de la rutina activa */}
        <div className="col-sm-8">
          {routineActive && workouts.length > 0 ? (
            <div>
              <h3>Workouts</h3>
              <ul className="list-group">
                {workouts.map((workout) => (
                  <li
                    key={workout.id}
                    className="list-group-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectWorkout(workout)}
                  >
                    {workout.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay workouts disponibles en esta rutina.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;