import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../card/Card";

function Detail() {

    const {id} = useParams()
    const [driver, setDriver] = useState({})
    console.log('Mensaje', driver);
    
    useEffect(() => {
        const getResponse = async () => {
            try {
                const response = (await axios.get(`http://localhost:3001/drivers/${id}`)).data;
                if(response.name) {
                    setDriver(response)
                } else {
                    window.alert('No hay personajes con ese ID')
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getResponse()
    }, [id])
    
    return (
    <div>
        <img src={driver?.image?.url || driver?.image} alt={driver?.name} />
        <h2>Name: {driver?.name?.forename || driver?.dataValues?.name}</h2>
        <h2>Surname: {driver?.name?.surname || driver?.surname}</h2>
        <h2>Teams: {driver?.teams || driver?.Teams?.map((team)=> team.name).join(',')}</h2>
        <h2>Nationality: {driver?.nationality}</h2>
        <h2>Date: {driver?.dob || driver?.date}</h2>
    </div>)
}; 

export default Detail;


{/* <h2>Teams: {driver?.teams?.map((team) => team.name).join(', ')}</h2> */}