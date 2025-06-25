import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DIFFICULTIES, QUESTION_TYPES, fetchCategories } from "../services/triviaApi";
import ReactLogo from '../assets/react.svg';
function StartPage() {
  const navigate = useNavigate();
  const SELECT_STYLE = "border border-white w-full rounded-sm pt-1 pb-1 pl-2"
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
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-black p-8 rounded-3xl space-y-4">
        <div className="flex flex-col items-center">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            🧠 Quiz React
            <img src={ReactLogo} alt="React Logo" className="ml-4 w-12 h-12" />
          </h1>
          <p className="text-sm text-gray-500">Configure seu quiz personalizado</p>
        </div>


        <div className="space-y-2">
          <div>
            <label>
              Quantidade de Perguntas
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
              Dificuldade
            </label>
            <select
              className={SELECT_STYLE}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">🎯 Qualquer</option>
              {Object.values(DIFFICULTIES).map((level) => (
                <option key={level} value={level}>
                  {level === 'easy' && '😊 Fácil'}
                  {level === 'medium' && '🤔 Médio'}
                  {level === 'hard' && '🔥 Difícil'}
                  {!['easy', 'medium', 'hard'].includes(level) && level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>
              Categoria
            </label>
            {loadingCategories ? (
              <div>
                <div></div>
                <span>Carregando categorias...</span>
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
                <option value="">📚 Qualquer</option>
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
              Tipo de Pergunta
            </label>
            <select
              className={SELECT_STYLE}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">❓ Qualquer</option>
              {Object.values(QUESTION_TYPES).map((t) => (
                <option key={t} value={t}>
                  {t === 'multiple' && '🔤 Múltipla Escolha'}
                  {t === 'boolean' && '✅ Verdadeiro/Falso'}
                  {!['multiple', 'boolean'].includes(t) && t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center mt-4">
            <button
              type="button"
              className="w-full"
              onClick={handleStart}
            >
              🚀 Iniciar Quiz
            </button></div>
        </div>

        <div className="flex flex-col items-center ">
          <p className="text-xs text-gray-500">
            Teste seus conhecimentos com perguntas personalizadas
          </p>
        </div>
      </div>
    </div>
  );
}

export default StartPage;