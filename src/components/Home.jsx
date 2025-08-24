// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const quizzes = [
    {
      title: "Microsoft Quiz",
      description: "Test your knowledge on Word, Excel & PowerPoint",
      image: "https://img.icons8.com/color/96/microsoft.png",
      link: "/quiz",
      comingSoon: false,
    },
    {
      title: "Tally Quiz",
      description: "Coming Soon...",
      image: "https://img.icons8.com/color/96/commercial.png",
      link: "#",
      comingSoon: true,
    },
    {
      title: "SAP Quiz",
      description: "Coming Soon...",
      image: "https://img.icons8.com/color/96/sap.png",
      link: "#",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-[#ffffff] to-[#f5f9ff]">
      {/* Animated Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-[#007AFF]/20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-pulse"></div>
      <div className="absolute w-[700px] h-[700px] bg-[#007AFF]/10 rounded-full blur-3xl bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 text-center drop-shadow-sm"
      >
        Welcome to{" "}
        <span className="text-[#007AFF]">Quiz Portal</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-gray-700 mb-14 text-center max-w-2xl leading-relaxed"
      >
        Sharpen your skills with engaging quizzes. <br />
        <span className="font-semibold text-gray-900">Microsoft Quiz is ready</span> — Tally & SAP are{" "}
        <span className="italic">coming soon</span>.
      </motion.p>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`p-8 rounded-3xl shadow-lg text-center border transition-all duration-300 backdrop-blur-2xl ${
              quiz.comingSoon
                ? "bg-white/40 border-gray-200 cursor-not-allowed"
                : "bg-white/70 border border-gray-100 hover:shadow-2xl hover:-translate-y-2"
            }`}
          >
            <img
              src={quiz.image}
              alt={quiz.title}
              className="mx-auto mb-6 w-20 h-20 drop-shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {quiz.title}
            </h2>
            <p className="text-gray-600 mb-8">{quiz.description}</p>
            {quiz.comingSoon ? (
              <button
                disabled
                className="bg-gray-300 text-white font-semibold py-2 px-8 rounded-full cursor-not-allowed shadow-md"
              >
                Coming Soon
              </button>
            ) : (
              <Link
                to={quiz.link}
                className="bg-[#007AFF] hover:bg-[#0066d6] text-white font-semibold py-2 px-8 rounded-full shadow-md transition"
              >
                Start Quiz
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
