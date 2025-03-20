function Header({taches = []}) {
    const nbTaches = taches.length;
    return(
        <div className='App-header'>{nbTaches} tâches</div>
    )
}

export default Header;