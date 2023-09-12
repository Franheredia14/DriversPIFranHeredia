import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDriversByName } from "../../redux/actions";

function SearchBar () {

    const [name, setNameDriver] = useState('');

    const handleChange = (event) => {
        setNameDriver(event.target.value);
    }
    const dispatch = useDispatch()
    const onSearch = (name) => {
        dispatch(getDriversByName(name))
    }

    return(
        <div>
        <input type="search" placeholder="Search by name" onChange={handleChange} value={name}/>
        <button onClick={() => onSearch(name)}>Search</button>
        <select name="Teams" id="">Teams</select>
    </div>
    )
}; 


export default SearchBar;
// const [searchDriver, setSearchDriver] = useState('')

// const handleChange = (event) => {
//    setSearchDriver(event.target.value) 
// }

// return ()