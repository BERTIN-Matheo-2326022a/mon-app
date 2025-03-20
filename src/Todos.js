import { useContext } from "react";
import { EtatContext } from "./etatContext";

function Todos({taches = []}) {
    const etat = useContext(EtatContext)
    return(
        <div className='App-todo'>
            {taches.map((t) => (
                <div>
                    {t.title}({t.etat})
                </div>
            ))}
        </div>
    )
}

export default Todos;