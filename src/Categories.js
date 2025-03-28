import { useState } from "react";
import { SketchPicker } from "react-color";
import "./App.css"

function Categories({categories = [], setCategories}) {
    
    const [categoryList, setCategoryList] = useState(categories);
    const [selectedColor, setSelectedColor] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState("#000000");

    const changeColor = (id, newColor) => {
        setCategoryList((prevCategories) =>
            prevCategories.map((c) =>
            c.id === id ? {...c, color: newColor} : c
        ))
    }

    const toggleColorPicker = (id) => {
        setSelectedColor((prev) => ({
            ...prev,
            [id]: !prev[id], // Bascule l'affichage pour l'ID cliqué
        }));
    };

    const ajoutCategory = () => {
        const category = {
          id: 108 + categories.length, title:categoryName, color: categoryColor
        }
        setCategoryList([...categoryList, category])
        setCategories((categories) => {
            return (ajouterCategoryAState(categories, category))
        })
        setCategoryName('');
        setCategoryColor("#000000");
    }
      
    const ajouterCategoryAState = (currentTodos, category) => {
        return{
            ...currentTodos,
            categories: [
            ...currentTodos.categories,
            category
            ]
        }
    }

    return(
        <div className="App-body">
            <div className="add">
                Ajouter une nouvelle catégorie  : <br/>
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Entrez le nom de la Catégorie" />
                <button onClick={ajoutCategory}>Ajouter une catégorie</button>
            </div>
            Cliquez sur une catégorie pour en changer la couleur.
            {categoryList.map((c, index) => (
                <div key={c.id} style={{color: c.color}}>
                    <div
                        onClick={() => toggleColorPicker(c.id)}
                        style={{
                            display: "inline-block",
                            padding: "10px",
                            color: c.color,
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                    >
                        {index + 1}. {c.title}
                    </div>

                    {selectedColor[c.id] && (
                        <div style={{ position: "absolute", zIndex: 2 }}>
                            <SketchPicker 
                                id="colorPicker" 
                                color={c.color} 
                                onChange={(color) => changeColor(c.id, color.hex)}
                                styles={{
                                    default: {
                                        picker: {
                                            width: "200px",
                                            height: "200px",
                                            overflow: "hidden"
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Categories;