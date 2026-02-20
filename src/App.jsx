import { Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ListRecipes from "./components/ListRecipes";

const FILTER_BY_CATEGORY =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const FILTER_BY_AREA = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
const SEARCH_BY_NAME = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const SEARCH_BY_FIRST_LETTER =
  "https://www.themealdb.com/api/json/v1/1/search.php?f=";
const SEARCH_BY_MAIN_INGREDIENT =
  "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const SEARCH_TYPES = {
  reset: { label: "Restart", url: SEARCH_BY_NAME },
  name: { label: "Name", url: SEARCH_BY_NAME },
  category: { label: "Category", url: FILTER_BY_CATEGORY },
  area: { label: "Area", url: FILTER_BY_AREA },
  letter: { label: "First letter", url: SEARCH_BY_FIRST_LETTER },
  ingredient: { label: "Main ingredient", url: SEARCH_BY_MAIN_INGREDIENT },
};

function App() {
  const RESET_URL = SEARCH_BY_NAME + "egg";
  const INITIAL_URL = SEARCH_BY_NAME + "pork";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const [confirmedSearch, setConfirmedSearch] = useState("pork");
  const [searchType, setSearchType] = useState("name");
  const [requestUrl, setRequestUrl] = useState(INITIAL_URL);

  useEffect(() => {
    if (!requestUrl) return;

    axios
      .get(requestUrl)
      .then(({ data }) => {
        setRecipes(data.meals || []);
      })
      .catch(console.log);
  }, [requestUrl]);

  const handleSearch = () => {
    if (!search.trim()) return;

    const baseUrl = SEARCH_TYPES[searchType].url;
    setConfirmedSearch(search);
    setRequestUrl(baseUrl + search);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (searchType === "letter") {
      setSearch(value.slice(0, 1).toLowerCase());
    } else {
      setSearch(value);
    }
  };

  const handleSearchTypeChange = (e) => {
    const value = e.target.value;

    if (value === "reset") {
      setSearchType("reset");
      setSearch("");
      setConfirmedSearch("pork");
      setRecipes([]);
      setRequestUrl(RESET_URL);
      return;
    }

    setSearchType(value);
    setSearch("");
    setConfirmedSearch("");
    setRecipes([]);
    setRequestUrl("");
  };

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-8">
      <header className="text-center mb-10">
        <h1 className="flex flex-wrap justify-center items-center gap-3 text-4xl xs:text-lg font-extrabold text-center text-[#fe7e60]">
          <Utensils className="h-9 w-9 shrink-0" />
          <span className="whitespace-normal sm:whitespace-nowrap">
            Recipe Finder
          </span>
        </h1>
        <p className="text-slate-700 mt-2">
          Find delicious recipes from around the world
        </p>
      </header>

      <section className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="px-4 py-2 border rounded-lg cursor-pointer"
        >
          {Object.entries(SEARCH_TYPES).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          maxLength={searchType === "letter" ? 1 : undefined}
          disabled={searchType === "reset"}
          placeholder={
            searchType === "reset"
              ? "List of recipes"
              : searchType === "letter"
                ? "One letter only"
                : "Type your search"
          }
          className="w-full sm:max-w-md px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleSearch}
          disabled={!search.trim()}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Search
        </button>
      </section>

      {recipes.length === 0 && (
        <section className="flex justify-center mt-10">
          <div
            className={` flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center justify-center rounded-md border px-4 py-3 text-sm max-w-lg w-full${confirmedSearch === "" ? "border-blue-300 bg-blue-50 text-blue-700" : "border-red-300 bg-red-50 text-red-700"}`}
          >
            {confirmedSearch === "" ? (
              <span className="font-medium">
                Select a search type and enter a value
              </span>
            ) : (
              <>
                <span className="font-medium">No recipes found for</span>

                <span className="italic break-all sm:break-normal">
                  "{confirmedSearch}"
                </span>

                <span>. Try another search term!</span>
              </>
            )}
          </div>
        </section>
      )}

      <ListRecipes recipes={recipes} search={confirmedSearch} />
    </main>
  );
}

export default App;
