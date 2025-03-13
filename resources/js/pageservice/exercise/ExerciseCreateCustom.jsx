// ExerciseCreate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../Config";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUser } from "../../pageauth/AuthUser";

function ExerciseCreateCustom() {
  const navigate = useNavigate();

  // Campos del ejercicio
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [types, setTypes] = useState([]);


  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await Config.getTypeAll();
      setTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  // Manejo del cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Función para crear ejercicio
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("type_id", selectedType);
    formData.append("user_id", getUser().id); 

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await Config.createExercise(formData);
      if (response.data.code === 201) {
        Swal.fire("Created!", "Exercise created successfully.", "success");
        navigate("/service/exercise"); 
      } else {
        Swal.fire("Error", "Failed to create exercise.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  return (
    <div className="container bg-light">
      <div className="row justify-content-center">
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card-body">
            <h3>Create Exercise</h3>
            <form onSubmit={handleCreate} encType="multipart/form-data">
              <div className="form-group">
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
                  ) : (
                    <span style={{ fontSize: "50px", color: "#ccc" }}>+</span>
                  )}
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-group">
                <label>Exercise Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter exercise name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Exercise Type</label>
                <select
                  className="form-control"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-success">
                  Create Exercise
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCreateCustom;
