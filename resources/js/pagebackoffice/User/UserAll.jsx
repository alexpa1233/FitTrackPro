import React, { use, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Config from '../../Config';
import Swal from 'sweetalert2';

function UserAll() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserAll();
    
    
    },[]);

    const getUserAll = async () => {
        try {
            const response = await Config.getUserAll();
            if (response.data.data && Array.isArray(response.data.data)) {
                
                setUser(response.data.data);
            } else {   
                console.log(response.data.message);
               
                setUser([]); 
            }
        } catch (error) {
            console.log(error);
            setUser([]); 
        }
    }

    const handleDeleteUser = async (id) => {
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
                if (response.ok) {
                    Swal.fire("Deleted!", "The type has been deleted.", "success");
                    getUserAll();
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
        <Sidebar/>
        <div className="col-sm-9 mt-3 mb-3">
            <div className="card-body">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ORDEN</th>
                            <th>NAME</th>
                            <th>ACCION</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            user && user.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => navigate(`/backoffice/user/${item.id}`)}>View</button>
                                            <button className="btn btn-danger" onClick={()=>{handleDeleteUser(item.id);}} >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td>orden</td>
                            <td>orden</td>
                            <td>orden</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
   </div>
  )
}

export default UserAll