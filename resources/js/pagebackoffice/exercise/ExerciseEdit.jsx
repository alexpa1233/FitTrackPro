import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import Config from "../../Config";
import { getUser } from "../../pageauth/AuthUser";



const ExerciseEdit = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await Config.getExerciseById(id);
                setName(response.data.data.name);
                setDescription(response.data.data.description);
                setSelectedType(response.data.data.type_id);


                const types = await Config.getTypeAll();
                setTypes(types.data.data);
            } catch (error) {
                Swal.fire("Error", "Failed to fetch exercise data", "error");
            }
        };
        fetchExercise();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name || !description) {
            Swal.fire("Error", "Please fill in all fields", "error");
            return;
        }

        try {
            const userId = getUser().id;
            const data = {
                name: name,
                description: description,
                type_id: selectedType,
                user_id:userId,
            }
            
            
            await Config.updateExercise(id, data); 
            Swal.fire("Success", `Exercise "${name}" updated!`, "success");

        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to update exercise", "error");
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar/>
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card-body">
                        <h3>Edit Exercise</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Exercise Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter exercise name"/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Exercise Type</label>
                                <select className="form-control" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    {types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <button type="submit" className="btn btn-success">Update Exercise</button>
                                <button type="button" className="btn btn-danger" onClick= {() => {navigate(-1)}}>Back</button>
                            </div>
                            
                        </form>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseEdit;
