import { GET_ALL_DRIVERS, GET_DRIVERS_BY_NAME, FILTER_DRIVERS_BY_TEAMS, GET_ALL_TEAMS } from "./action-types";

const initialState = {
    allDrivers: [],
    allDriversCopy: [],
    allTeams: []
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type){
        case GET_ALL_DRIVERS: 
            return {
            ...state,
            allDrivers: payload,
            allDriversCopy: payload
        }
        case GET_DRIVERS_BY_NAME:
            return {
                ...state,
                allDrivers: payload
            }
        case GET_ALL_TEAMS:
            return{
                ...state,
                allTeams: payload
            }
        case FILTER_DRIVERS_BY_TEAMS:
            const drvrsCopy = state.allDriversCopy.filter((driver) => driver.teams !== undefined && driver.teams.includes(payload))
            return {
                ...state,
                allDrivers: drvrsCopy,
            }
        default: return{
            ...state
        } 
    }
};

export default reducer;