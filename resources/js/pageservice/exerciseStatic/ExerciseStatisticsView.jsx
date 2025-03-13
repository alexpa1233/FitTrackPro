import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../pageauth/AuthUser';
import Config from '../../Config';
import Swal from 'sweetalert2';

function ExerciseStaticsView() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  
  // Almacenamos todos los workoutexercises asociados al workoutId
  const [workoutExercises, setWorkoutExercises] = useState([]);
  // Índice del ejercicio actual en el array
  const [currentIndex, setCurrentIndex] = useState(0);
  // Ejercicio actual
  const [workoutExercise, setWorkoutExercise] = useState(null);
  
  // Número de series (sets) siempre limitado a 5
  const [selectedSetCount, setSelectedSetCount] = useState(5);
  const [selectedType, setSelectedType] = useState('');
  const [repsWeightValues, setRepsWeightValues] = useState(
    Array.from({ length: 5 }, () => ({ reps: '', weight: '' }))
  );
  const [durationValues, setDurationValues] = useState(
    Array.from({ length: 5 }, () => '')
  );
  const [distanceValues, setDistanceValues] = useState(
    Array.from({ length: 5 }, () => '')
  );

  // Al montar el componente, se consulta la lista de workoutexercises
  useEffect(() => {
    const fetchWorkoutExercises = async () => {
      try {
        const response = await Config.getWorkoutExercisesByWorkoutId(workoutId);
        if (response.data && response.data.data && response.data.data.length > 0) {
          setWorkoutExercises(response.data.data);
          setCurrentIndex(0);
          setWorkoutExercise(response.data.data[0]);
          // Fijamos el número de sets a 5 para todos
          setSelectedSetCount(5);
          setRepsWeightValues(Array.from({ length: 5 }, () => ({ reps: '', weight: '' })));
          setDurationValues(Array.from({ length: 5 }, () => ''));
          setDistanceValues(Array.from({ length: 5 }, () => ''));
        } else {
          Swal.fire("Información", "No se encontraron ejercicios para este workout.", "info");
        }
      } catch (error) {
        console.error("Error fetching workout exercises:", error);
      }
    };
    fetchWorkoutExercises();
  }, [workoutId]);

  const handleSetCountChange = (e) => {
    const count = parseInt(e.target.value);
    setSelectedSetCount(count);
    setRepsWeightValues(Array.from({ length: count }, () => ({ reps: '', weight: '' })));
    setDurationValues(Array.from({ length: count }, () => ''));
    setDistanceValues(Array.from({ length: count }, () => ''));
  };

  const handleRepsChange = (index, value) => {
    const newValues = [...repsWeightValues];
    newValues[index] = { ...newValues[index], reps: value };
    setRepsWeightValues(newValues);
  };

  const handleWeightChange = (index, value) => {
    const newValues = [...repsWeightValues];
    newValues[index] = { ...newValues[index], weight: value };
    setRepsWeightValues(newValues);
  };

  const handleDurationChange = (index, value) => {
    const newValues = [...durationValues];
    newValues[index] = value;
    setDurationValues(newValues);
  };

  const handleDistanceChange = (index, value) => {
    const newValues = [...distanceValues];
    newValues[index] = value;
    setDistanceValues(newValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getUser();
    if (!user || !workoutExercise) return;

    // Enviar un registro por cada set (hasta selectedSetCount, máximo 5)
    for (let i = 0; i < selectedSetCount; i++) {
      let data = {
        user_id: user.id,
        workout_exercise_id: workoutExercise.id,
      };

      if (selectedType === 'reps_weight') {
        data.reps = repsWeightValues[i].reps;
        data.weight = repsWeightValues[i].weight;
      } else if (selectedType === 'duration') {
        data.duration = durationValues[i];
      } else if (selectedType === 'distance') {
        data.distance = distanceValues[i];
      }

      try {
        await Config.createExerciseStatistic(data);
      } catch (error) {
        console.error(`Error guardando set ${i + 1}:`, error);
      }
    }

    // Si hay más ejercicios, pasamos al siguiente; de lo contrario, redirigimos a /service
    if (currentIndex < workoutExercises.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setWorkoutExercise(workoutExercises[nextIndex]);
      // Reinicializamos los campos para el siguiente ejercicio
      setSelectedSetCount(5);
      setRepsWeightValues(Array.from({ length: 5 }, () => ({ reps: '', weight: '' })));
      setDurationValues(Array.from({ length: 5 }, () => ''));
      setDistanceValues(Array.from({ length: 5 }, () => ''));
      setSelectedType('');
      Swal.fire("Éxito", "Datos guardados. Pasando al siguiente ejercicio.", "success");
    } else {
      Swal.fire("Éxito", "Datos guardados para todos los ejercicios.", "success")
        .then(() => {
          navigate('/service');
        });
    }
  };

  if (!workoutExercise) {
    return <div>Cargando datos del ejercicio...</div>;
  }

  return (
    <div className="container">
      <h2>
        Ejercicio: {workoutExercise.exercise?.name || "Sin nombre"}
      </h2>
      {/* Imagen centrada */}
      {workoutExercise.exercise?.image && (
        <div className="mb-3 text-center">
          <img
            src={typeof workoutExercise.exercise.image === "string" 
              ? workoutExercise.exercise.image 
              : URL.createObjectURL(workoutExercise.exercise.image)}
            alt={workoutExercise.exercise.name}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain"
            }}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label><strong>Número de Series (Sets):</strong></label>
          <select 
            className="form-select" 
            value={selectedSetCount} 
            onChange={handleSetCountChange}
          >
            {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label><strong>Tipo de Valor a Registrar:</strong></label>
          <select 
            className="form-select" 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="reps_weight">Reps y Weight</option>
            <option value="duration">Duration</option>
            <option value="distance">Distance</option>
          </select>
        </div>
  
        {selectedType === 'reps_weight' && (
          <div>
            <h4>Ingresar Reps y Weight para cada set</h4>
            {Array.from({ length: selectedSetCount }, (_, index) => (
              <div key={index} className="mb-3">
                <label>Set {index + 1}</label>
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control me-2"
                    placeholder="Reps"
                    value={repsWeightValues[index]?.reps || ''}
                    onChange={(e) => handleRepsChange(index, e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Weight"
                    value={repsWeightValues[index]?.weight || ''}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
  
        {selectedType === 'duration' && (
          <div>
            <h4>Ingresar Duration para cada set</h4>
            {Array.from({ length: selectedSetCount }, (_, index) => (
              <div key={index} className="mb-3">
                <label>Set {index + 1}</label>
                <input
                  type="time"
                  className="form-control"
                  value={durationValues[index] || ''}
                  onChange={(e) => handleDurationChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
  
        {selectedType === 'distance' && (
          <div>
            <h4>Ingresar Distance para cada set</h4>
            {Array.from({ length: selectedSetCount }, (_, index) => (
              <div key={index} className="mb-3">
                <label>Set {index + 1}</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Distance"
                  value={distanceValues[index] || ''}
                  onChange={(e) => handleDistanceChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
  
        <button type="submit" className="btn btn-primary">Guardar Datos</button>
      </form>
    </div>
  );
}

export default ExerciseStaticsView;

