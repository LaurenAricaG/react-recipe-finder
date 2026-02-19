import CardRecipe from "./CardRecipe";

const ListRecipes = ({ recipes, search }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {recipes.map((recipe) => (
        <CardRecipe key={recipe.idMeal} recipe={recipe} search={search} />
      ))}
    </section>
  );
};

export default ListRecipes;
