import "./App.css"
import { useContext } from "react";
import { useState } from "react";
import { EtatContext } from "./etatContext";
import { ETATS } from "./etats";
import { ETAT_TERMINE } from "./etats";

function Todos({taches = [], setCurrentTodos}) {

    const [todoName, setTodoName] = useState('');
    const [todoState, setTodoState] = useState('');

    const etats = useContext(EtatContext);
    const [sortCriteria, setSortCriteria] = useState("");

    function sort(newSort) {
        setSortCriteria(newSort);

        setCurrentTodos((prevTodos) => {
            const sortedTaches = [...prevTodos.taches].sort((a, b) => {
                switch (newSort) {
                    case "date_echeance":
                        return new Date(a.date_echeance) - new Date(b.date_echeance);
                    case "date_creation":
                        return new Date(a.date_creation) - new Date(b.date_creation);
                    case "nom":
                        return a.title.localeCompare(b.title, "fr", {sentisitivy: "base"});
                    case "etat":
                        return a.etat.localeCompare(b.etat);
                    case "urgence":
                        return a.urgent === b.urgent ? 0 : a.urgent ? -1 : 1;
                    case "fait":
                        return ETAT_TERMINE.includes(a.etat) === ETAT_TERMINE.includes(b.etat) ? 0 : ETAT_TERMINE.includes(a.etat) ? 1 : -1;
                    default:
                        return 0;
                }
            });
            console.log(prevTodos);
            return { ...prevTodos, taches: sortedTaches };
        });
    }

    const ajoutTache = () => {
        const tache = {
          id: 108 + taches.length, title:todoName, etat: todoState
        }
        setCurrentTodos((todos) => {
          return ajouterTacheAState(todos, tache)
        })
        setTodoName('');
        setTodoState('');
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

    function changeState(id, newState) {
        setCurrentTodos((prevTodos) => ({
            ...prevTodos,
            taches: prevTodos.taches.map(t => 
                t.id === id ? {...t, etat: newState} : t
            )
        }));
    }

    return(
        <div className='App-body'>
            <div className="add">
                Ajouter une nouvelle Tâche : <br/>
                <input type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} placeholder="Entrez le nom de la tâche" />
                <select value={todoState} onChange={(e) => setTodoState(e.target.value)}>
                    <option value={''}>--Sélectionnez un état.</option>
                    {Object.values(etats).map((etat) => 
                                    <option key={etat} value={etat}>{etat}</option>
                                )
                    }
                </select>
                <button onClick={ajoutTache}>Ajouter une tâche</button>
            </div>
            <p>Trier les tâches :</p>
            <select id="sortSelector" value={sortCriteria} onChange={(e) => sort(e.target.value)}>
                <option value={""}>Aucun tri</option>
                <option value={"date_echeance"}>Date d'échéance</option>
                <option value={"date_creation"}>Date de création</option>
                <option value={"nom"}>Nom</option>
                <option value={"etat"}>État</option>
                <option value={"urgence"}>Urgence</option>
                <option value={"fait"}>Terminées/pas terminées</option>
            </select>
            <br/>

            {taches.map((t, index) => (
                <div key={t.id} className={t.etat + " " + (t.urgent ? 'urgent' : '')}>
                    {index + 1}. {t.title} 
                    <select id="stateSelector" value={t.etat} onChange={(e) => changeState(t.id, e.target.value)}>
                            {Object.values(etats).map((etat) => 
                                <option key={etat} value={etat}>{etat}</option>
                            )
                        }
                    </select>
                </div>
            ))}
            
        </div>
    )
}

export default Todos;