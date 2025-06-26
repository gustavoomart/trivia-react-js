import { useLocation, useNavigate } from "react-router-dom";
import "../styles/circular-progress.css";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    answers = [],
    amount,
    correct,
    difficulty,
    categoryName,
    type
  } = location.state || {};

  const total = parseInt(amount);
  const incorrect = total - correct;
  const accuracy = Math.round((correct / total) * 100);
  
  const goToStart = () => {
    navigate("/");
  };

  // Função para formatar texto
  const formatText = (text) => {
    if (!text) return "Any";
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <div className="p-4">
      {/* Summary Header */}
      <div className="bg-primaryContainer border border-outline rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-center mb-6">Quiz Results</h1>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Circular Progress */}
          <div className="flex flex-col items-center">
            <div className="circular-progress" style={{'--percentage': accuracy}}>
              <div className="circular-progress-inner">
                <span className="text-3xl font-bold">{accuracy}%</span>
                <span className="text-sm opacity-75">Accuracy</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold">{correct}/{total}</p>
              <p className="text-sm opacity-75">Questions Correct</p>
            </div>
          </div>

          {/* Quiz Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 max-w-md">
            <div className="text-center p-4 bg-surface rounded-lg border border-outline">
              <h3 className="font-semibold text-sm opacity-75 mb-1">Category</h3>
              <p className="font-bold">{categoryName || "Any"}</p>
            </div>
            
            <div className="text-center p-4 bg-surface rounded-lg border border-outline">
              <h3 className="font-semibold text-sm opacity-75 mb-1">Difficulty</h3>
              <p className="font-bold capitalize">{difficulty || "Any"}</p>
            </div>
            
            <div className="text-center p-4 bg-surface rounded-lg border border-outline">
              <h3 className="font-semibold text-sm opacity-75 mb-1">Question Type</h3>
              <p className="font-bold">{formatText(type) || "Mixed"}</p>
            </div>
            
            <div className="text-center p-4 bg-surface rounded-lg border border-outline">
              <h3 className="font-semibold text-sm opacity-75 mb-1">Total Questions</h3>
              <p className="font-bold">{total}</p>
            </div>
          </div>
        </div>

        {/* Performance Message */}
        <div className="text-center mt-6">
          {accuracy >= 80 && (
            <p className="text-green-600 font-semibold">🎉 Excellent performance!</p>
          )}
          {accuracy >= 60 && accuracy < 80 && (
            <p className="text-yellow-600 font-semibold">👍 Good job!</p>
          )}
          {accuracy < 60 && (
            <p className="text-red-600 font-semibold">💪 Keep practicing!</p>
          )}
        </div>
      </div>

      {/* Questions Review */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Questions Review</h2>
        <div className="space-y-4">
          {answers.map((answerObj, index) => {
            const { question, selected, isCorrect } = answerObj;

            // Tratamento especial para questões boolean
            let displayAnswers;
            if (question.type === "boolean") {
              displayAnswers = ["☓", "✔"];
            } else {
              const allAnswers = [...question.incorrect_answers, question.correct_answer];
              displayAnswers = allAnswers.sort();
            }

            return (
              <div key={index} className="p-4 border border-outline rounded-lg bg-primaryContainer">
                <div
                  className="font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {displayAnswers.map((ans, idx) => {
                    const isUserChoice = ans === selected;
                    let isTheCorrect;

                    // Para questões boolean, precisa converter a resposta correta
                    if (question.type === "boolean") {
                      const correctSymbol = question.correct_answer === "True" ? "✔" : "☓";
                      isTheCorrect = ans === correctSymbol;
                    } else {
                      isTheCorrect = ans === question.correct_answer;
                    }

                    let colorClass = "border-outline";

                    if (isTheCorrect && isUserChoice) colorClass = "bg-emerald-600";
                    else if (isTheCorrect) colorClass = "bg-emerald-900";
                    else if (isUserChoice) colorClass = "bg-rose-900";

                    return (
                      <div
                        key={idx}
                        className={`p-2 border rounded ${colorClass}`}
                        dangerouslySetInnerHTML={{ __html: ans }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col mt-6 gap-4">
        <button
          type="button"
          className="bg-primary hover:bg-primaryAlt rounded-2xl p-2"
          onClick={goToStart}
        >
          New Quiz
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-secondary hover:bg-secondaryAlt rounded-2xl p-2"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ResultPage;