import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuizGameManager } from "../hooks/useQuizGameManager";
import "../styles/loader.css";
import { useLocation } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 5, difficulty, category, type } = location.state || {};

  const getAnswerOptions = () => {
    if (currentQuestion.type === "boolean") {
      return ["True", "False"];
    } else {
      return [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);
    }
  };

  const {
    loading,
    error,
    currentQuestion,
    currentIndex,
    total,
    answerQuestion,
    isQuizFinished,
    answers,
    correctCount,
    categoryName,
  } = useQuizGameManager({ amount: parseInt(amount), difficulty, category, type });

  useEffect(() => {
    if (isQuizFinished && answers.length > 0) {
      const params = new URLSearchParams({
        amount,
        correct: correctCount.toString(),
        ...(difficulty && { difficulty }),
        ...(category && { category }),
        ...(categoryName && { categoryName: encodeURIComponent(categoryName) }),
        ...(type && { type }),
      });

      navigate("/result", {
        state: {
          answers,
          amount,
          correct: correctCount,
          difficulty,
          categoryName,
          type,
        },
      });

    }
  }, [isQuizFinished, answers, correctCount, amount, difficulty, category, categoryName, type, navigate]);

  if (loading) return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="loader"></div>
    </div>
  );

  if (error) return <p>Erro: {error}</p>;

  if (isQuizFinished) {
    return (
      <div className="p-4">
        <p>Redirecionando para resultado...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="flex-shrink-0 p-4 border-b bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-center">
          {currentQuestion.title}
        </h2>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-shrink-0 p-6">
          <div
            className="text-lg leading-relaxed min-h-[4rem] max-h-32 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
        </div>

        <div className="flex-1 px-6 pb-6">
          <div className="grid gap-3 h-full content-start">
            {getAnswerOptions().map((answer, idx) => {
              const lowerAnswer = answer.toLowerCase();
              const colorClass =
                currentQuestion.type === "boolean"
                  ? lowerAnswer === "true"
                    ? "bg-green-100 border-green-400 hover:bg-green-200"
                    : "bg-red-100 border-red-400 hover:bg-red-200"
                  : "border-gray-300 hover:bg-blue-100 hover:border-blue-400";

              return (
                <button
                  key={idx}
                  className={`p-4 text-left border-2 rounded-lg transition-all duration-200 min-h-[3rem] ${colorClass}`}
                  onClick={() => answerQuestion(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-4 border-t bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Progresso: {currentIndex} / {total}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizPage;