import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Config from "../../Config";
import Sidebar from "../Sidebar";

const TypeAll = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        getTypeAll();
    }, []);
    
    const getTypeAll = async () => {
        try {
            const response = await Config.getTypeAll();
            const data = response.data.data;
            setTypes(data);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    
    const handleCreateType = async () => {
        const { value: name } = await Swal.fire({
            title: "Enter new type",
            input: "text",
            inputPlaceholder: "Type name...",
            showCancelButton: true,
            confirmButtonText: "Create",
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage("Type name cannot be empty");
                }
                return value;
            },
        });

        if (name) {
            try {
                const response = await Config.createType(name); // Llamamos la función desde Config.jsx

                if (response.data.code === 201) {
                    Swal.fire("Success", `Type "${name}" created!`, "success");
                    getTypeAll();
                } else {
                    Swal.fire("Error", "Failed to create type", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Server error", "error");
            }
        }
    };

    const handleDeleteType = async (id) => {
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
                const response = await Config.deleteType(id);
                if (response.data.code === 200) {
                    Swal.fire("Deleted!", "The type has been deleted.", "success");
                    getTypeAll();
                } else {
                    Swal.fire("Error", "Failed to delete type.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Server error", "error");
            }
        }
    };

    

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                            <button className="btn btn-success" onClick={handleCreateType}>Add Type</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ORDEN</th>
                                    <th>NAME</th>
                                    <th>ACCION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {types.length > 0 ? (
                                    types.map((type, index) => (
                                        <tr key={index}>
                                            <td>{type.id}</td>
                                            <td>{type.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteType(type.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No types found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypeAll;