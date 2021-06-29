import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

import '../../css/app.css'
import axios from 'axios';
//este es el contenedor de datos quemados 
const testData = [
  
    {name: "Kevin Guachagmira", avatar_url: "https://avatars.githubusercontent.com/u/33032880?v=4", company: "@Github"},
    {name: "Fercho Rivera", avatar_url: "https://avatars.githubusercontent.com/u/47802477?v=4", company: "@Github"},
    {name: "Jeniffer Guañuna", avatar_url: "https://avatars.githubusercontent.com/u/61261718?v=4", company: "@Github"},
];
//esta parte vamos a mapear por completo
const Lista = (props) => (
	<div>
  	{props.profiles.map(profile => <Carta key = {profile.id} {...profile}/>)}
    {props.profiles1.map(profile1 => <Carta key = {profile1.id} {...profile1}/>)}
	</div>
);
// el api que consume y los datos quemados del array
const Carta = (props) => {


  return (
    <div className="github-profile">
      <img src={props.avatar_url} alt="" />
      <div className="info">
      <div className="name">{props.name}</div>
      <div className="company">{props.company}</div>
      </div>
      
    </div>
  )
}

export const Form = (props) => {

  const [userName, setUserName] = useState("")

  const handleSubmit = async(e) => {
    //peticion get , es una peticion que no deberia cargar
    e.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data)
    // en esta parte se consumen los documentos de la api
    setUser("");
  
  }

  return (
    <div>
      	<form onSubmit={handleSubmit}>
    	  <input type="text" placeholder="Usuario de Github" value={userName} onChange={e => setUserName(e.target.value)}/>
        <button>Añadir</button>
    	</form>
    </div>
  )
}

export const App = (props) => {

  const [profiles, setProfiles] = useState(testData)

  const [profiles1, setProfiles1] = useState([])

  const AddPerfil = (profileData) =>{
    
    setProfiles1([...profiles1,profileData])
  }

  return (
    <div>

      <div className="header"> <h2>Perfiles de GitHub</h2></div>
      
      <Form onSubmit={AddPerfil}/>

      <Lista profiles = {profiles}
                profiles1={profiles1}
      ></Lista>

    </div>
    
  )
}

if (document.getElementById('example')) {
    ReactDOM.render(<App title="The GitHub Cartas App" />, document.getElementById('example'));
}