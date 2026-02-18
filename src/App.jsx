import { Utensils } from "lucide-react";
import ListRecipes from "./components/ListRecipes";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("chicken");

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      // .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
      .then(({ data }) => {
        setRecipes(data.meals || []);
      })
      .catch(console.log);
  }, []);

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="flex justify-center items-center gap-3 text-4xl font-bold">
          <Utensils size={36} />
          Recipe Finder
        </h1>
        <p className="mt-2 text-slate-600">
          Find delicious recipes from around the world
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Data from{" "}
          <a
            href="https://www.themealdb.com/api.php"
            target="_blank"
            className="underline font-medium hover:text-slate-700"
          >
            TheMealDB
          </a>
        </p>
      </header>

      <section className="flex gap-3 justify-center mb-10">
        <input
          type="text"
          placeholder="Search for meal or keywords"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
        />

        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Search
        </button>
      </section>

      {recipes.length === 0 && (
        <article className="text-center text-slate-500 mt-10">
          <p>The recipe {search} is not found</p>
        </article>
      )}

      {/* LIST */}
      <ListRecipes recipes={recipes} search={search} />
    </main>
  );
}

export default App;
