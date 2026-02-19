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

const CardRecipe = ({ recipe, search }) => {
  const label =
    recipe.strCategory ||
    (search ? search.charAt(0).toUpperCase() + search.slice(1) : "Unknown");

  return (
    <article className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <h2 className="font-semibold text-sm mb-2">{recipe.strMeal}</h2>

        <span
          className={`inline-block px-2 py-1 rounded text-xs ${
            CATEGORY_COLORS[label] || "bg-slate-200 text-slate-900"
          }`}
        >
          {label}
        </span>
      </div>
    </article>
  );
};

export default CardRecipe;
