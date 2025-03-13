import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../Config';


function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const handleBackClick = () => {
        navigate(-1); 
    };

    const getUser = async () => {
        try {
            const response = await Config.getUserById(id);
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        } 
    };



    return (
        <div className="container">
            <h2>User Details</h2>
            {user ? (
                <div>
                    <p><strong>ID:</strong> {user.id || 'N/A'}</p>
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                </div>
            ) : (
                <p>User not found.</p>
                
            )}
            <button onClick={handleBackClick} className="btn btn-secondary mb-3">Back</button>
        </div>
    );
}

export default UserDetail;
