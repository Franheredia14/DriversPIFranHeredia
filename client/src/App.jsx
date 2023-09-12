import './App.css'
import { useEffect, useState } from 'react'
import React from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Detail from './components/detail/Detail';
import Nav from './components/navBar/Nav';
import Cards from './components/cardsContainer/Cards';
import Form from './components/form/Form';
// import SearchBar from './components/searchBar/SearchBar';


function App() {

//   const [drivers, setDrivers] = useState([]);
  
// const onSearch = async (name) => {
//   try {
//     const response = (await axios.get(`http://localhost:3001/drivers/name?name=${name}`)).data;

//  // Verifica los datos en la consola
//     // const matchingDrivers = response.filter((driver) => driver.name === name);

//       setDrivers(response);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };


  // const onSearch = async (name) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/drivers/name?name=${name}`);
  //     const data = response.data;
  //     console.log(data); // Verifica la respuesta completa
      
  //     if (data && data.length > 0) { // Asumiendo que la respuesta es un array de conductores
  //       const driverWithName = data.find(driver => driver.name === name);
        
  //       if (driverWithName) {
  //         setDrivers([driverWithName]);
  //       } else {
  //         alert('No se encontró un conductor con ese nombre');
  //       }
  //     } else {
  //       alert('No se encontraron conductores con ese nombre');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  const [access, setAccess] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    !access && navigate('/')
  }, [access])
  
  return (
    <div className='App'>
      {
        location.pathname !== '/' ? <Nav setAccess={setAccess}/> : null
      }
      <Routes>
        <Route path='' element={<Landing/>}/>
        <Route path='/home' element={<Cards/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App

// const [drivers, setDrivers] = useState([])

// const searchDriversByName = async (name) => {
  //   try {
    //     const response = (await axios.get(`http://localhost:3001/drivers/name?name=${name}`)).data
    //     setDrivers(response)
    //   } catch (error) {
      //     alert('Error al buscar drivers. Por favor, inténtalo nuevamente.');
  //   }
  // };
  
  
  {/* <Routes>
  <Route path='/' element={<Landing/>}/>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/detail/:id' element={<Detail/>}></Route>
  <Route path='/form' element={<Form/>}></Route>
</Routes> */}
// const onSearch = () => {
//   setDrivers([...drivers, example])
// }
// console.log(drivers);