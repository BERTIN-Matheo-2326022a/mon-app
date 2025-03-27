import "./App.css"
import { useContext } from "react";
import { useState } from "react";
import { EtatContext } from "./etatContext";
import { ETAT_TERMINE } from "./etats";

function Todos({taches = [], setCurrentTodos}) {
    let i = 0;

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
                        return a.title.localeCompare(b.title);
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

            console.log(sortedTaches);
            return { ...prevTodos, taches: sortedTaches };
        });
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
        <div className='App-todo'>
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

            {taches.map((t) => (
                ++i,
                <div key={t.id} className={t.etat + " " + (t.urgent ? 'urgent' : '')}>
                    {i}. {t.title} 
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