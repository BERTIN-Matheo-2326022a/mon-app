import "./App.css"

function Categories({categories = []}) {
    
    let i = 0;
    
    return(
        <div>
            {categories.map((c) => (
            ++i,
            <div key={c.id}>
                {i}. {c.title}
            </div>
        ))}
        </div>
    )
}

export default Categories;