import SearchBar from "../searchBar/SearchBar";
import Filter from "../filter/filter";
import './nav.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDrivers } from "../../redux/actions";
import { useEffect } from "react";

function Nav() {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDrivers());
      }, [dispatch]);

      const handleHomeClick = () => {
        dispatch(getAllDrivers());
      };

    return (
    <nav>
        <SearchBar/>
        <Filter/>
        <Link to={'/home'}>
        <button onClick={handleHomeClick}>Home</button>
        </Link>
    </nav>
    )
};


export default Nav;