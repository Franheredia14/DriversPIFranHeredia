import { GET_ALL_DRIVERS, GET_ALL_TEAMS, GET_DRIVERS_BY_NAME, FILTER_DRIVERS_BY_TEAMS } from "./action-types";
import axios from "axios";

export const getAllDrivers = () => {
    return async (dispatch)=> {
        try {
            const {data} = await axios.get('http://localhost:3001/drivers')

            return dispatch({type: GET_ALL_DRIVERS, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getDriversByName = (name) => {
    return async(dispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:3001/drivers/name?name=${name}`)
            return dispatch({type: GET_DRIVERS_BY_NAME, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getAllTeams = () => {
    return async(dispatch) =>{
        try {
            const {data} = await axios.get('http://localhost:3001/teams')
            return dispatch({type: GET_ALL_TEAMS, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const filterDriversByTeams = (teams) => ({
    type: FILTER_DRIVERS_BY_TEAMS,
    payload: teams,
  });

// export const getDriverById = (id) => {
//     return async(dispatch) => {
//         try {
//             const {data} = await axios.get(`http://localhost:3001/drivers/${id}`)
//             return dispatch({type: GET_DRIVER_BY_ID, payload: data})
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
// }