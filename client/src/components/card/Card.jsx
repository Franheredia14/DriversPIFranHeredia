import { Link } from "react-router-dom";
import './card.css'

function Card({ id, name, surname, teams, image }) {
    return (
        <div className="card-style">
            <div className="image-container">
                <img src={image} alt="" />
            </div>
            <div className="info-container">
                <Link to={`/detail/${id}`}>
                    <h2 className="name">{name?.forename || name}</h2>
                </Link>
                <h2 className="surname">{name?.surname || surname}</h2>
                <h2 className="teams">{teams}</h2>
            </div>
        </div>
    );
}

export default Card;