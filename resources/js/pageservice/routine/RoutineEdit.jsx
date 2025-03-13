import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "../../Config";
import Swal from "sweetalert2";
import { getUser } from "../../pageauth/AuthUser";
import "bootstrap/dist/css/bootstrap.min.css";

function RoutineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para los campos de la rutina
  const [routine, setRoutine] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      fetchRoutine();
    }
  }, [id]);

  const fetchRoutine = async () => {
    try {
      const response = await Config.getRoutineById(id);
      const routineData = response.data.data;
      setRoutine(routineData);
      setName(routineData.name);
      setDescription(routineData.description);
      setImage(routineData.image);
      setPreview(routineData.image);
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveRoutine = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // Usamos el id del usuario autenticado para evitar problemas con user_id
    formData.append("user_id", getUser().id);
    if (image instanceof File) {
      formData.append("image", image);
    }
    try {
      const response = await Config.updateRoutine(routine.id, formData);
      if (response.data.code === 200) {
        Swal.fire("Success", "Routine updated successfully", "success");
        navigate("/backoffice/routine"); // Redirige a la lista de rutinas
      } else {
        Swal.fire("Error", "Failed to update routine", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  if (!routine) return null;

  return (
    <div className="container bg-light">
      <div className="row">
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h3>Edit Routine</h3>
              <form onSubmit={handleSaveRoutine} encType="multipart/form-data">
                <div className="form-group">
                  <label>Routine Image</label>
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
                </div>
                <div className="form-group">
                  <label>Routine Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter routine name"
                  />
                </div>
                <div className="form-group">
                  <label>Routine Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <button type="submit" className="btn btn-success">
                    Finish Editing
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
    </div>
  );
}

export default RoutineEdit;
