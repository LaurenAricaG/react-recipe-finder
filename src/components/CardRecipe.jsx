import { CATEGORY_COLORS } from "../constans/Recipe";

const CardRecipe = ({ recipe, search, onClick }) => {
  const label =
    recipe.strCategory ||
    (search ? search.charAt(0).toUpperCase() + search.slice(1) : "Unknown");

  return (
    <article
      onClick={onClick}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
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
