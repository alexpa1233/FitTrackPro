import React from 'react'
import { useParams } from 'react-router-dom'
import Config from '../../Config';

function RoutineDetail() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [routine,setRoutine] = useState();






    const fetchRoutine = async () => {
        try{
            const response = await Config.getRoutineById(id);
            setRoutine(response.data.data);
        }catch (error){
            console.error("Error fetching routine: " + error);

        }
    }

    const handleDeleteRoutine = async () => {
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
            const response = await Config.deleteRoutine(id);
            if (response.data.code === 200) {
              Swal.fire("Deleted!", "The routine has been deleted.", "success");
              navigate("/backoffice/routine");
            } else {
              Swal.fire("Error", "Failed to delete routine.", "error");

            }
          } catch (error) {
            Swal.fire("Error", "Server error", "error");

          }
        }
      };




  return (
    <div className="container bg-light p-4">
        <h3>Routine</h3>
        
    </div>
  )
}

export default RoutineDetail