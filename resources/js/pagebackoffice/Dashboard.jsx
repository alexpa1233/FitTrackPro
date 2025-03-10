import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { FaUsers, FaClipboardList, FaDumbbell } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Config from '../Config';

const Dashboard = () => {
  const data = [
    { name: 'Jan', logins: 120 },
    { name: 'Feb', logins: 98 },
    { name: 'Mar', logins: 150 },
    { name: 'Apr', logins: 170 },
    { name: 'May', logins: 200 },
    { name: 'Jun', logins: 130 },
    { name: 'Jul', logins: 160 },
    { name: 'Aug', logins: 180 },
    { name: 'Sep', logins: 140 },
    { name: 'Oct', logins: 190 },
    { name: 'Nov', logins: 220 },
    { name: 'Dec', logins: 210 },
  ];
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRoutines, setTotalRoutines] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  useEffect(() => {
    fetchDashboardData();
  }, []);


  const fetchDashboardData = async () =>{
    try {
      const userTotal = await Config.getCountUser();
      const routineTotal = await Config.getCountRoutine();
      const exerciseTotal = await Config.getCountExercise();


      setTotalUsers(userTotal.data.data);
      setTotalRoutines(routineTotal.data.data);
      setTotalExercises(exerciseTotal.data.data);

    } catch (error) {
        console.log("Error: " + error)
    }
  }

  return (
  <div className="container bg-light">
    <div className="row justify-content-center">
      <Sidebar/>
      <div className="col-sm-9">
        <h2 className="text-center">BACKOFFICE</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow p-3 mb-4 bg-light">
                <FaUsers size={30} className="text-primary" />
                <h5 className="mt-2">Total Users</h5>
                <h3>{totalUsers}</h3>
            </div>
          </div>
          <div className="col-md-4">
              <div className="card shadow p-3 mb-4 bg-light">
                  <FaClipboardList size={30} className="text-primary" />
                  <h5 className="mt-2">Total Routines</h5>
                  <h3>{totalRoutines}</h3>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card shadow p-3 mb-4 bg-light">
                  <FaDumbbell size={30} className="text-primary" />
                  <h5 className="mt-2">Total Exercises</h5>
                  <h3>{totalExercises}</h3>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="card p-3 shadow bg-light">
              <h5 className="text-primary">Activity Overview</h5>
              <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#10497F" />
                    <YAxis stroke="#10497F" />
                    <Tooltip />
                    <Bar dataKey="logins" fill="var(--bs-primary)" />
                </BarChart>
              </ResponsiveContainer>
          </div>
        </div>
      </div>

      
    </div>
  </div>
  
  )
}

export default Dashboard