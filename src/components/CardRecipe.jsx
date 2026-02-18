const CardRecipe = ({ recipe, search }) => {
  const CATEGORY_COLORS = {
    Beef: "bg-red-600 text-white",
    Chicken: "bg-yellow-400 text-slate-900",
    Dessert: "bg-pink-400 text-white",
    Lamb: "bg-rose-700 text-white",
    Miscellaneous: "bg-slate-400 text-white",
    Pasta: "bg-orange-500 text-white",
    Pork: "bg-red-400 text-white",
    Seafood: "bg-sky-500 text-white",
    Side: "bg-emerald-400 text-white",
    Starter: "bg-lime-400 text-slate-900",
    Vegan: "bg-green-600 text-white",
    Vegetarian: "bg-green-400 text-slate-900",
    Breakfast: "bg-amber-400 text-slate-900",
    Goat: "bg-stone-600 text-white",
  };

  const categoryCapitalized = search
    ? search.charAt(0).toUpperCase() + search.slice(1)
    : "Unknown";

  return (
    <article className="border border-transparent rounded-lg overflow-hidden shadow-md cursor-pointer pb-3">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2 className="text-md ml-3 my-3 font-semibold text-start">
        {recipe.strMeal}
      </h2>
      <span
        className={`${CATEGORY_COLORS[categoryCapitalized || recipe.strCategory] || "bg-slate-100 text-slate-800"} ml-3 px-2 py-1 rounded-lg text-xs`}
      >
        {categoryCapitalized || recipe.strCategory}
      </span>
    </article>
  );
};

export default CardRecipe;
