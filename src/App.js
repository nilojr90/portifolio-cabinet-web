import React, { useState , useEffect } from "react";
import api from "services/api"

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  //trigger once onLoad
  useEffect(() => {
    api.get('repositories').then(response =>{
      setProjects(response.data)
    });
  },[]);
  

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);
  }

  return (
    <div>
      <ul data-testid="repository-list">{
        projects.map(project => 
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
             Remover
            </button>
          </li> 
        )
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}



export default App;
