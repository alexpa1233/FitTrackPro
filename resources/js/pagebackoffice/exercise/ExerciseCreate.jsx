import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Config from "../../Config";
import Sidebar from "../Sidebar";
import { getUser } from "../../pageauth/AuthUser";

const CreateExercise = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("")

    useEffect(()=>{
        const fetchTypes = async () => {
            try {
                const response = await Config.getTypeAll();
                setTypes(response.data.data);
            } catch (error) {
                Swal.fire("Error", "Failed to load exercise types", "error");
            }
        };
        fetchTypes();
    },[]);

    const handleCreate = async (e) => {
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
            await Config.createExercise(data);
            Swal.fire("Success", `Exercise "${name}" created!`, "success");
        } catch (error) {
            Swal.fire("Error", "Failed to create exercise", "error");
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card-body">
                        <h3>Create Exercise</h3>
                        <form onSubmit={handleCreate}>
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
                                <select className="form-control" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    {types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <button type="submit" className="btn btn-success">Create Exercise</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateExercise;
