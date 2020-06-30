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
    const newRepository = {
      "title": `Exercício React ${Date.now()}`,
      "url": "http: //github.com/...",
      "techs": ["React","css"]
    }

    const response = await api.post("repositories", newRepository);
    
    if(response.status === (201) || response.status === (200)){
      setProjects([...projects, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204 || response.status === (200)){
      const filtredProjects = projects.filter(project => project.id !== id);
      setProjects(filtredProjects);
    }
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

      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}



export default App;
