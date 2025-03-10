import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Config from '../../Config'
import Sidebar from "../Sidebar";

function ExerciseAll() {
    
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const fetchExercises = async () => {
        try {
            const response = await Config.getExerciseAllDefault();
            setExercises(response.data.data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    const handleDeleteExercise = async (id) => {
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
                fetchExercises();
            } catch (error) {
                Swal.fire("Error", "Failed to delete exercise.", "error");
            }
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card-body">
                        <button className="btn btn-success mb-3 float-end" onClick={() => navigate("/backoffice/exercise/create")}>Create Exercise</button>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exercises.map((exercise) => (
                                    <tr key={exercise.id}>
                                        <td>{exercise.id}</td>
                                        <td>{exercise.name}</td>
                                        <td>{exercise.type?.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() => navigate(`/backoffice/exercise/edit/${exercise.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseAll;


