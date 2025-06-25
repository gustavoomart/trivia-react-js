import { useState, useEffect } from "react";
import { fetchQuestions, getCategoryName } from "../services/triviaApi";

export function useQuizGameManager({ amount, difficulty, category, type }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    async function load() {
      try {
        if (category) {
          const name = await getCategoryName(category);
          setCategoryName(name);
        }
        
        const data = await fetchQuestions(amount, difficulty, category, type);
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [amount, difficulty, category, type]);

  const currentQuestion = questions[currentIndex];

  const answerQuestion = (answer) => {
    const newAnswer = { 
      question: currentQuestion, 
      selected: answer,
      isCorrect: answer === currentQuestion.correct_answer
    };
    
    setAnswers(prev => [...prev, newAnswer]);
    setCurrentIndex(prev => prev + 1);
  };

  const isQuizFinished = currentIndex >= questions.length;

  const correctCount = answers.reduce((acc, answer) => {
    return answer.isCorrect ? acc + 1 : acc;
  }, 0);

  const accuracy = answers.length > 0 ? (correctCount / answers.length) * 100 : 0;

  return {
    loading,
    error,
    currentQuestion,
    currentIndex,
    total: questions.length,
    answerQuestion,
    isQuizFinished,
    answers,
    correctCount,
    accuracy: Math.round(accuracy),
    incorrectCount: answers.length - correctCount,
    categoryName,
  };
}