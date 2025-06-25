import { useLocation, useSearchParams, Link } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();


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


  return (
    <div className="p-4">

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Revisão das Respostas:</h2>
        <div className="space-y-4">
          {answers.map((answerObj, index) => {
            const { question, selected, isCorrect } = answerObj;
            const allAnswers = [...question.incorrect_answers, question.correct_answer];
            const shuffledAnswers = allAnswers.sort();

            return (
              <div key={index} className="p-4 border rounded-lg">
                <div
                  className="font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question.question}` }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {shuffledAnswers.map((ans, idx) => {
                    const isUserChoice = ans === selected;
                    const isTheCorrect = ans === question.correct_answer;

                    let colorClass = "border-gray-300";

                    if (isTheCorrect && isUserChoice) colorClass = "bg-green-200 border-green-500";
                    else if (isTheCorrect) colorClass = "bg-green-100 border-green-400";
                    else if (isUserChoice) colorClass = "bg-red-200 border-red-500";

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

      <div className="flex gap-4 mt-6">
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Novo Quiz
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
