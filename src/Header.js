import { ETAT_TERMINE } from "./etats";

function Header({taches = []}) {
    const nbTaches = taches.length;
    
    const nbTachesFinies = taches.filter(t => ETAT_TERMINE.includes(t.etat)).length;

    return(
        <div>
            <div className='App-header'>{nbTaches} tâche(s)</div>
            <div className="App-header">{nbTachesFinies} tâche(s) terminée(s)</div>
        </div>
    )
}

export default Header;