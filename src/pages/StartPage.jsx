import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTIES, QUESTION_TYPES, fetchCategories } from "../services/triviaApi";
import ReactLogo from '../assets/react.svg';
function StartPage() {
  const navigate = useNavigate();
  const SELECT_STYLE = "bg-primary border-b border-outline w-full rounded-sm pt-1 pb-1 pl-2"
  const [amount, setAmount] = useState(5);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar categorias");
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const handleStart = () => {
    navigate("/quiz", {
      state: { amount, difficulty, category, type },
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
      <div className="bg-primaryContainer p-8 rounded-3xl space-y-4">
        <div className="flex flex-col items-center">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            🧠 Quiz React
            <img src={ReactLogo} alt="React Logo" className="ml-4 w-12 h-12" />
          </h1>
          <p className=" text-sm text-gray-500">Configure your custom quiz</p>
        </div>


        <div className="space-y-2">
          <div>
            <label>
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Entre 1 e 50"
              className={SELECT_STYLE}
            />
          </div>

          <div>
            <label>
              Difficulty
            </label>
            <select
              className={SELECT_STYLE}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">🎯 Any</option>
              {Object.values(DIFFICULTIES).map((level) => (
                <option key={level} value={level}>
                  {level === 'easy' && '😊 Easy'}
                  {level === 'medium' && '🤔 Medium'}
                  {level === 'hard' && '🔥 Hard'}
                  {!['easy', 'medium', 'hard'].includes(level) && level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>
              Category
            </label>
            {loadingCategories ? (
              <div>
                <div></div>
                <span>Loading categories...</span>
              </div>
            ) : error ? (
              <p>
                {error}
              </p>
            ) : (
              <select
                className={SELECT_STYLE}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">📚 Any</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label>
              Type of Quiz
            </label>
            <select
              className={SELECT_STYLE}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">❓ Any</option>
              {Object.values(QUESTION_TYPES).map((t) => (
                <option key={t} value={t}>
                  {t === 'multiple' && '🔤 Multiple choice'}
                  {t === 'boolean' && '✅ True/False'}
                  {!['multiple', 'boolean'].includes(t) && t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center mt-4">
            <button
              type="button"
              className="w-full bg-primary hover:bg-primaryAlt rounded-2xl p-2"
              onClick={handleStart}
            >
              🚀 START
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center ">
          <p className="text-xs text-gray-500">
            Test your knowledge with personalized questions
          </p>
        </div>
      </div>
    </div>
  );
}

export default StartPage;