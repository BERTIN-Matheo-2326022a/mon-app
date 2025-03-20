import { useState } from 'react';
import './App.css';
import Header from './Header.js';
import Todos from './Todos.js';
import todos from './Todos.json';
import { ETATS } from './etats.js';
import { EtatContext } from './etatContext.js';

function App() {

  const [currentTodos, setCurrentTodos] = useState(todos);
  const taches = currentTodos.taches

  const randomEtat = () => {
    const etatValues = Object.values(ETATS)
    setCurrentTodos((todos) => {
      return {
        ...todos,
        taches: [...todos.taches.map(t => {
          const n = Math.floor(Math.random() * etatValues.length);
          return {...t, etat: etatValues[n]}
        })]
      }
    })
  }
  
  const ajoutTache = () => {
    const tache = {
      id: 111, title: "Nouvelle tâche", etat: ETATS.NOUVEAU
    }
    setCurrentTodos((todos) => {
      return ajouterTacheAState(todos, tache)
    })
  }
  
  const ajouterTacheAState = (currentTodos, tache) => {
    return{
      ...currentTodos,
      taches: [
        ...currentTodos.taches,
        tache
      ]
    }
  }

  return (
    <EtatContext.Provider value={ETATS}>
      <div className="App">
        <Header taches={taches}/>
        <Todos taches={taches} />
        <button onClick={ajoutTache}>Ajouter tâche</button>
        <footer>
          <button onClick={randomEtat}>
            Random état
          </button>
        </footer>
      </div>
    </EtatContext.Provider>
  );
}

export default App;
