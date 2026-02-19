import axios from "axios";
import { ClipboardList, CookingPot, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AREA_COLORS, CATEGORY_COLORS } from "../constans/Recipe";

function ModalRecipe({ showModal, onClose, recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showModal]);

  useEffect(() => {
    if (!recipeId) return;
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(({ data: { meals } }) => setRecipe(meals ? meals[0] : null))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [recipeId]);

  const toggleView = () => setShowInstructions(!showInstructions);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] relative hidden-scroll">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          <X size={24} />
        </button>

        {loading ? (
          <p className="text-center text-lg text-gray-700 animate-pulse">
            Cargando...
          </p>
        ) : recipe ? (
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-slate-500">
              <span className="text-[12px] uppercase tracking-widest font-semibold">
                ID
              </span>

              <span className="w-1 h-1 rounded-full bg-slate-400" />

              <span className="text-sm font-mono text-slate-600">
                {recipe.idMeal}
              </span>
            </div>

            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
            />

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {recipe.strMeal}
              </h2>

              <div className="flex flex-wrap gap-2">
                <span
                  className={` px-3 py-1  text-white rounded-full text-sm 
                    ${CATEGORY_COLORS[recipe.strCategory] || "bg-slate-200 text-slate-900"}
                    `}
                >
                  {recipe.strCategory}
                </span>
                <span
                  className={`px-3 py-1 bg-green-500 text-white rounded-full text-sm ${AREA_COLORS[recipe.strArea] || "bg-slate-200 text-slate-900"}`}
                >
                  {recipe.strArea}
                </span>
              </div>

              {!showInstructions ? (
                <div>
                  <h3 className="mt-2 font-semibold text-lg text-gray-700 flex gap-2 mb-2">
                    <ClipboardList strokeWidth={3} />
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {Array.from({ length: 20 }, (_, i) => i + 1)
                      .map((n) => ({
                        ingredient: recipe[`strIngredient${n}`],
                        measure: recipe[`strMeasure${n}`],
                      }))
                      .filter(
                        (item) =>
                          item.ingredient && item.ingredient.trim() !== "",
                      )
                      .map((item, idx) => (
                        <li
                          key={idx}
                          className="hover:bg-gray-100 p-1 rounded transition-colors duration-200"
                        >
                          {item.ingredient} - {item.measure}
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className="mt-2 font-semibold text-lg text-gray-700 flex gap-2 mb-2">
                    <CookingPot strokeWidth={3} />
                    Start Cooking
                  </h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {recipe.strInstructions}
                  </p>
                </div>
              )}

              <button
                onClick={toggleView}
                className="self-start mt-2 px-6 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer w-full"
              >
                {showInstructions ? "Ingredients" : "Start Cooking"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">Receta no encontrada</p>
        )}
      </div>
    </div>
  );
}

export default ModalRecipe;
