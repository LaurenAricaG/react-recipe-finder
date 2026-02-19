import { useState } from "react";
import CardRecipe from "./CardRecipe";
import ModalRecipe from "./ModalRecipe";

const ListRecipes = ({ recipes, search }) => {
  const [open, setOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const onSelectRecipeId = (id) => {
    setSelectedRecipeId(id);
    setOpen(true);
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {recipes.map((recipe) => (
        <CardRecipe
          key={recipe.idMeal}
          recipe={recipe}
          search={search}
          onClick={() => onSelectRecipeId(recipe.idMeal)}
        />
      ))}

      <ModalRecipe
        showModal={open}
        onClose={() => setOpen(false)}
        recipeId={selectedRecipeId}
      />
    </section>
  );
};

export default ListRecipes;
