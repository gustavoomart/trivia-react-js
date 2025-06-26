import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizGameManager } from "../hooks/useQuizGameManager";
import "../styles/loader.css";
import { useLocation } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount = 5, difficulty, category, type } = location.state || {};

  const getAnswerOptions = () => {
    if (currentQuestion.type === "boolean") {
      return ["☓", "✔"];
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

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-shrink-0">
          <div
            className="text-2xl leading-relaxed min-h-[6rem] max-h-64 overflow-y-auto justify-center flex items-center"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
        </div>

        <div className="flex h-full w-full justify-center pt-8 pb-16 pr-32 pl-32">
          {currentQuestion.type === "boolean" ? (
            <div className="flex w-full gap-32">
              {getAnswerOptions().map((answer, idx) => {
                const isTrue = answer.toLowerCase() === "✔";

                const baseClasses = "px-4 py-2 rounded font-semibold transition duration-200";
                const colorClass = isTrue
                  ? `${baseClasses} bg-green-600 hover:bg-green-700 text-white border border-green-500`
                  : `${baseClasses} bg-red-500 hover:bg-red-700 text-white border border-red-400`;

                return (
                  <button
                    key={idx}
                    className={`flex-1 text-center border-2 rounded-lg transition-all duration-200 min-h-[4rem] text-9xl ${colorClass}`}
                    onClick={() => answerQuestion(answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              {getAnswerOptions().map((answer, idx) => (
                <button
                  key={idx}
                  className="quiz-answer-btn p-4 text-center border-2 rounded-lg transition-all duration-200 min-h-[5rem] text-base font-medium border-gray-300 bg-primaryContainer hover:bg-primaryContainerAlt"
                  onClick={() => answerQuestion(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="flex-shrink-0  ">
        <div className="w-full rounded-full h-2">
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