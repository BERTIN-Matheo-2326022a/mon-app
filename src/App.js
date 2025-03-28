import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';

import './App.css';
import Header from './Header.js';
import Todos from "./Todos";
import Categories from './Categories.js';
import todos from './Todos.json';
import { ETATS } from './etats.js';
import { EtatContext } from './etatContext.js';


function App() {

  const [currentTodos, setCurrentTodos] = useState(todos);
  const taches = currentTodos.taches.sort((a, b) => {
    if (a.date_echeance < b.date_echeance) {
      return -1;
    }
  });

  const categories = currentTodos.categories;

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

  return (
    <EtatContext.Provider value={ETATS}>
      <div className="App">
        <Header taches={taches}/>
        <Tabs>
          <TabList>
            <Tab>Tâches</Tab>
            <Tab>Catégories</Tab>
          </TabList>

          <TabPanel>
            <Todos taches={taches} setCurrentTodos={setCurrentTodos}/>
            <footer>
              <button onClick={randomEtat}>Randomiser les états</button>
            </footer>
          </TabPanel>
          <TabPanel>
            <Categories categories={categories} setCategories={setCurrentTodos}/>
          </TabPanel>
        </Tabs>
      </div>
    </EtatContext.Provider>
  );
}

export default App;
