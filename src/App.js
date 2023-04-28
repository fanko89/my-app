import React, { useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Pizza",
      ingredients: "bread, tomato sauce, cheese",
      isFavorited: false,
    },
    {
      id: 2,
      name: "Soup",
      ingredients: "soup powder, coconut milk, water",
      isFavorited: false,
    },
    { id: 3, name: "Hot Dog", ingredients: "beef, bun", isFavorited: false },
  ]);

  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "" });
  const [editRecipe, setEditRecipe] = useState({
    id: null,
    name: "",
    ingredients: "",
  });

  const handleAddRecipe = () => {
    const recipeId = recipes.length + 1;
    const recipeToAdd = { ...newRecipe, id: recipeId, isFavorited: false };
    setRecipes([...recipes, recipeToAdd]);
    setNewRecipe({ name: "", ingredients: "" });
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };
  
  const handleSaveRecipe = () => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === editRecipe.id) {
        return {
          ...recipe,
          name: editRecipe.name,
          ingredients: editRecipe.ingredients,
        };
      } else {
        return recipe;
      }
    });
    setRecipes(updatedRecipes);
    setEditRecipe({ id: null, name: "", ingredients: "" });
  };

  const handleToggleFavorite = (id) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === id) {
        return { ...recipe, isFavorited: !recipe.isFavorited };
      } else {
        return recipe;
      }
    });
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {editRecipe.id === recipe.id ? (
              <>
                <input
                  type="text"
                  value={editRecipe.name}
                  onChange={(e) =>
                    setEditRecipe({ ...editRecipe, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editRecipe.ingredients}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      ingredients: e.target.value,
                    })
                  }
                />
                <button onClick={handleSaveRecipe}>Save</button>
                <button
                  onClick={() =>
                    setEditRecipe({ id: null, name: "", ingredients: "" })
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div>{recipe.name}</div>
                <div>{recipe.ingredients}</div>
                <button onClick={() => handleToggleFavorite(recipe.id)}>
                  {recipe.isFavorited ? "Unfavorite" : "Favorite"}
                </button>
                <button onClick={() => setEditRecipe(recipe)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteRecipe(recipe.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Add Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Ingredients"
        value={newRecipe.ingredients}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, ingredients: e.target.value })
        }
      />
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
}
export default App;