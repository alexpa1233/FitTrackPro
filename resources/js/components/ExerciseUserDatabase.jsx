import React, { useState, useEffect } from "react";
import Config from "../Config";
import { getUser } from "../pageauth/AuthUser";


function UserExerciseDatabase({ onClose, onSelectExercise }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
    
      const response = await Config.getExerciseByUserId(getUser().id);
      setExercises(response.data.data);
    } catch (error) {
      console.error("Error fetching user exercises: ", error);
    }
  };

  return (
    <div className="p-3 bg-white border" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">My Exercises</h4>
        <button className="btn btn-light" onClick={onClose}>
          ✕
        </button>
      </div>
      <ul className="list-group mt-3">
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            className="list-group-item d-flex align-items-center"
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#eee",
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: "#666",
              }}
            >
              {exercise.image ? (
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>No image</span>
              )}
            </div>
            <div>
              <strong>{exercise.name}</strong>
            </div>
            <button
              className="ms-auto btn btn-sm btn-outline-primary"
              onClick={() => onSelectExercise(exercise)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserExerciseDatabase;
