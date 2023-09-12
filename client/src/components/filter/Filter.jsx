import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDriversByTeams, getAllTeams } from '../../redux/actions'; // Asegúrate de tener estas acciones definidas

function Filter() {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.allTeams);

  useEffect(() => {
    // Llama a la acción para obtener todos los equipos cuando se monta el componente
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleTeamChange = (event) => {
    // Actualiza el estado con el equipo seleccionado
    dispatch(filterDriversByTeams(event.target.value));
  };

//   const handleFilterByTeam = () => {
//     // Aplica el filtro llamando a la acción con el equipo seleccionado
//     dispatch(filterDriversByTeams(selectedTeam));
//   };

  return (
    <div>
      <h3>Filter By Team:</h3>
      <select onChange={handleTeamChange}>
        <option value="">All Teams</option>
        {allTeams.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;