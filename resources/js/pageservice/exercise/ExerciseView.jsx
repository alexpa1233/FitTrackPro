import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "../../Config";
import "bootstrap/dist/css/bootstrap.min.css";

function ExerciseView() {
  const { id } = useParams(); // id del ejercicio
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    if (id) {
      fetchExercise();
    }
  }, [id]);

  const fetchExercise = async () => {
    try {
      const response = await Config.getExerciseById(id);
      setExercise(response.data.data);
    } catch (error) {
      console.error("Error fetching exercise:", error);
    }
  };


  return (
    <div className="container bg-light">
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-9 mt-3 mb-3">
          <div className="card mx-auto">
            <div className="card-body">
              <h3 className="text-center">Exercise View</h3>
              <div className="text-center">
                {exercise.image ? (
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="img-fluid"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#eee",
                    }}
                  >
                    No image
                  </div>
                )}
              </div>
              <h4 className="mt-3 text-center">{exercise.name}</h4>
              <p>{exercise.description}</p>
              <p>
                <strong>Type: </strong>
                {exercise.type ? exercise.type.name : "N/A"}
              </p>
              
                <button
                  className="btn btn-danger"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseView;
