// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate ,useParams} from "react-router-dom";
import "./Quiz.css";

import { msQuestions, tallyQuestions } from "../data";

const Quiz = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const { type } = useParams();
  const questions = type === "ms" ? msQuestions : tallyQuestions;

  // Load saved progress from localStorage (if available)
  const savedCurrent = parseInt(localStorage.getItem("quiz-current")) || 0;
  const savedScore = parseInt(localStorage.getItem("quiz-score")) || 0;
  const savedTime = parseInt(localStorage.getItem("quiz-time")) || 30 * 60;

  const [current, setCurrent] = useState(savedCurrent);
  const [score, setScore] = useState(savedScore);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(savedTime); // 30 minutes default
  const [completed, setCompleted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(timer);
    return () => clearInterval(timer);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (!completed) {
      localStorage.setItem("quiz-current", current);
      localStorage.setItem("quiz-score", score);
      localStorage.setItem("quiz-time", timeLeft);
    }
  }, [current, score, timeLeft, completed]);

  const handleAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (selected === null) return;

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      finishQuiz(score);
    }
  };

  const finishQuiz = (finalScore = score) => {
    setCompleted(true);
    setShowConfetti(true);
    if (timerId) clearInterval(timerId);

    // Clear saved progress when quiz is done
    localStorage.removeItem("quiz-current");
    localStorage.removeItem("quiz-score");
    localStorage.removeItem("quiz-time");

    setTimeout(() => setShowConfetti(false), 5000);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(30 * 60);
    setCompleted(false);
    setAnswered(false);
    setShowConfetti(false);

    // Reset saved progress
    localStorage.removeItem("quiz-current");
    localStorage.removeItem("quiz-score");
    localStorage.removeItem("quiz-time");

    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(newTimer);
          finishQuiz(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(newTimer);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ---------- Completed State ----------
  if (completed) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#f5f9ff]">
        {showConfetti && <Confetti width={width} height={height} />}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-200"
        >
          <div className="flex justify-center mb-4">
            <img
              src="https://user-images.githubusercontent.com/74038190/213844263-a8897a51-32f4-4b3b-b5c2-e1528b89f6f3.png"
              alt="🎉"
              className="w-16 h-16"
            />
          </div>

          <h2 className="text-4xl font-extrabold text-[#007AFF] mb-4">
            Quiz Completed!
          </h2>

          <div className="bg-white rounded-xl shadow-inner p-6 mb-6">
            <p className="text-lg text-gray-600 mb-2">Your Score</p>
            <p className="text-5xl font-extrabold text-[#007AFF] drop-shadow-sm">
              {score} / {questions.length}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="bg-[#007AFF] hover:bg-[#0066d6] text-white font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105"
            >
              Restart
            </button>

            <button
              onClick={() => navigate("/SkillTest-Hub-React-Tailwind")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105"
            >
              Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------- Quiz State ----------
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#f5f9ff]">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold text-gray-700">
            Question {current + 1} / {questions.length}
          </h2>

          <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 font-bold rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-6 h-6"
            >
              <g id="button-top" className="animate-button-top">
                <path
                  fill="none"
                  stroke="#DC2626"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  d="M128 8v29"
                />
                <path
                  fill="none"
                  stroke="#DC2626"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  d="M112 8h32"
                />
              </g>
              <circle
                cx="128"
                cy="143"
                r="105"
                fill="#FFF"
                stroke="#DC2626"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                id="big-hand"
                className="animate-big-hand"
                fill="none"
                stroke="#DC2626"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                d="M128 72v71"
              />
            </svg>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Question with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              {questions[current].question}
            </h3>

            {/* Options */}
            <div className="space-y-4">
              {questions[current].options.map((option, idx) => (
                <motion.label
                  key={idx}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center px-6 py-4 rounded-xl border cursor-pointer transition shadow-sm ${
                    selected === option
                      ? "bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF] font-medium"
                      : "hover:bg-gray-50 border-gray-300 text-gray-700"
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  <input
                    type="radio"
                    name={`question-${current}`}
                    checked={selected === option}
                    readOnly
                    className="mr-3"
                  />
                  {option}
                </motion.label>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#007AFF] text-white rounded-xl shadow-md hover:bg-[#0066d6] transition disabled:opacity-50"
            onClick={handleNext}
            disabled={selected === null}
          >
            {current === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
