import React from "react";

export default function CalculusIntegralGame() {
  const chapters = {
    "Functions and Graphs (Chapter 1)": generateQuestions("basic"),
    "Limits and Continuity (Chapter 2)": generateQuestions("basic"),
    "Derivatives (Chapter 3)": generateQuestions("basic"),
    "Applications of Derivatives (Chapter 4)": generateQuestions("applications"),
    "Integration (Chapter 5)": generateQuestions("basic"),
    "Applications of Integration (Chapter 6)": generateQuestions("applications"),
    "Techniques and Improper Integrals (Chapter 7)": generateQuestions("techniques"),
  };

  const [gameStarted, setGameStarted] = React.useState(false);
  const [selectedChapter, setSelectedChapter] = React.useState(
    "Functions and Graphs (Chapter 1)"
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [showResult, setShowResult] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const questions = chapters[selectedChapter];
  const currentQuestion = questions[currentIndex];

  function handleAnswer(answer) {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correct) {
      setScore(score + currentQuestion.points);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setShowResult(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Chapter completed!");
      setCurrentIndex(0);
    }
  }

  function redeemReward(cost, rewardName) {
    if (score < cost) {
      setMessage("You do not have enough points for this reward");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to redeem ${rewardName} for ${cost} points?`
    );

    if (confirmed) {
      setScore(score - cost);
      setMessage(`You redeemed: ${rewardName}`);
    } else {
      setMessage("Redemption cancelled");
    }
  }

  function changeChapter(chapter) {
    setSelectedChapter(chapter);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStarted(true);
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl text-center">
          <h1 className="text-6xl font-extrabold mb-8 text-pink-500 italic drop-shadow-lg">
            Ishita's Awesome Integral Practice
          </h1>

          <h2 className="text-2xl font-bold mb-6 text-purple-700">
            Choose a Chapter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {Object.keys(chapters).map((chapter) => (
              <button
                key={chapter}
                onClick={() => changeChapter(chapter)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl text-lg font-bold transition shadow-lg"
              >
                {chapter}
              </button>
            ))}
          </div>

          {message && (
            <div className="mb-6 bg-white border-2 border-pink-400 text-pink-600 rounded-2xl p-4 font-bold text-center">
              {message}
            </div>
          )}

          <div className="bg-pink-100 rounded-3xl p-6 shadow-inner text-left">
            <h3 className="text-3xl font-bold text-pink-600 mb-4 text-center">
              Rewards
            </h3>

            <div className="grid gap-4">
              <button
                onClick={() => redeemReward(2500, "I visit you for the weekend")}
                className="bg-white rounded-2xl p-4 shadow font-semibold hover:bg-pink-50 transition text-left"
              >
                ⭐ 2500 Points → “I visit you for the weekend”
              </button>

              <button
                onClick={() => redeemReward(5000, "Dinner date wherever you want")}
                className="bg-white rounded-2xl p-4 shadow font-semibold hover:bg-pink-50 transition text-left"
              >
                ⭐ 5000 Points → “Dinner date wherever you want”
              </button>

              <button
                onClick={() => redeemReward(7400, "Sephora + Garage + Aritzia Shopping Spree and Dinner")}
                className="bg-white rounded-2xl p-4 shadow font-semibold hover:bg-pink-50 transition text-left"
              >
                ⭐ 7400 Points → “Sephora + Garage + Aritzia Shopping Spree and Dinner”
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex justify-center items-center relative">
      <div className="fixed top-4 right-4 bg-pink-500 text-white px-4 py-4 rounded-2xl shadow-xl z-50 text-center min-w-[140px]">
        <div className="text-sm font-semibold tracking-wide">
          Current Points
        </div>
        <div className="text-3xl font-extrabold mt-1">{score}</div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setGameStarted(false)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl font-bold"
          >
            ← Home
          </button>

          <h1 className="text-4xl font-bold text-center text-pink-500 flex-1">
            Ishita's Awesome Integral Practice
          </h1>

          <div className="w-[90px]"></div>
        </div>

        <h1 className="hidden">
          Ishita's Awesome Integral Practice
        </h1>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="text-lg font-semibold">
            Question {currentIndex + 1} / {questions.length}
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">
              Correct: {correctAnswers}
            </div>

            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold">
              Incorrect: {incorrectAnswers}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 mb-6 shadow-inner">
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-purple-700">
              Difficulty: {currentQuestion.difficulty}
            </span>

            <span className="font-bold text-orange-600">
              {currentQuestion.points} pts
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.answers.map((answer, idx) => {
              let styles =
                "bg-white hover:bg-slate-100 border border-slate-300";

              if (showResult) {
                if (answer === currentQuestion.correct) {
                  styles = "bg-green-200 border-green-600";
                } else if (answer === selectedAnswer) {
                  styles = "bg-red-200 border-red-600";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(answer)}
                  className={`p-4 rounded-xl text-left transition font-medium ${styles}`}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className="flex justify-center">
            <button
              onClick={nextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-lg font-bold"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function generateQuestions(type) {
  const questions = [];

  const templates = {
    basic: [
      {
        q: "Evaluate ∫ x^n dx when n ≠ -1",
        correct: "x^(n+1)/(n+1) + C",
        wrong: [
          "nx^(n-1) + C",
          "ln(x) + C",
          "1/(n+1)x^n + C",
        ],
      },
      {
        q: "Evaluate ∫ cos(x) dx",
        correct: "sin(x) + C",
        wrong: ["-sin(x) + C", "cos(x)+C", "tan(x)+C"],
      },
      {
        q: "Evaluate ∫ e^x dx",
        correct: "e^x + C",
        wrong: ["xe^x + C", "ln(x)+C", "1/e^x + C"],
      },
      {
        q: "Evaluate ∫ 1/x dx",
        correct: "ln|x| + C",
        wrong: ["1/x^2 + C", "xln(x)+C", "e^x + C"],
      },
      {
        q: "Evaluate ∫ sec²(x) dx",
        correct: "tan(x) + C",
        wrong: ["sec(x)+C", "-cot(x)+C", "sin(x)+C"],
      },
    ],

    techniques: [
      {
        q: "Use substitution to evaluate ∫ 2x cos(x²) dx",
        correct: "sin(x²) + C",
        wrong: ["cos(x²)+C", "2sin(x²)+C", "xsin(x²)+C"],
      },
      {
        q: "Evaluate ∫ x e^x dx using integration by parts",
        correct: "xe^x - e^x + C",
        wrong: ["xe^x + C", "e^x - x + C", "x²e^x + C"],
      },
      {
        q: "Evaluate ∫ 1/(x²+1) dx",
        correct: "arctan(x) + C",
        wrong: ["ln(x²+1)+C", "1/(x²+1)+C", "arcsin(x)+C"],
      },
      {
        q: "Evaluate ∫ sin³(x)cos(x) dx",
        correct: "sin⁴(x)/4 + C",
        wrong: ["cos⁴(x)/4 + C", "sin²(x)+C", "-cos(x)+C"],
      },
      {
        q: "Evaluate ∫ dx/(x²-1)",
        correct: "(1/2)ln|(x-1)/(x+1)| + C",
        wrong: ["ln|x²-1|+C", "1/(x²-1)+C", "arctan(x)+C"],
      },
    ],

    applications: [
      {
        q: "Find the area under y=x² from x=0 to x=2",
        correct: "8/3",
        wrong: ["4", "2", "16/3"],
      },
      {
        q: "Find the average value of f(x)=x on [0,4]",
        correct: "2",
        wrong: ["4", "1", "8"],
      },
      {
        q: "Volume using disks generally involves which expression?",
        correct: "πr²",
        wrong: ["2πr", "πd", "πh²"],
      },
      {
        q: "Arc length formula contains which term?",
        correct: "√(1+(dy/dx)²)",
        wrong: ["1/(dy/dx)", "dy/dx", "(dy/dx)² only"],
      },
      {
        q: "Work done by a variable force is found using:",
        correct: "A definite integral",
        wrong: ["A derivative", "A limit only", "A sequence"],
      },
    ],

    improper: [
      {
        q: "An improper integral occurs when:",
        correct: "The interval is infinite or the integrand is undefined",
        wrong: [
          "The derivative is zero",
          "The function is polynomial",
          "The interval is finite",
        ],
      },
      {
        q: "Evaluate ∫₁^∞ 1/x² dx",
        correct: "1",
        wrong: ["∞", "0", "2"],
      },
      {
        q: "Does ∫₁^∞ 1/x dx converge?",
        correct: "No",
        wrong: ["Yes, to 1", "Yes, to 0", "Yes, to ln(2)"],
      },
      {
        q: "The p-test says ∫₁^∞ 1/x^p converges when:",
        correct: "p > 1",
        wrong: ["p < 1", "p = 1", "p > 0"],
      },
      {
        q: "Improper integrals are evaluated using:",
        correct: "Limits",
        wrong: ["Matrices", "Series only", "Vectors"],
      },
    ],
  };

  const difficultyLevels = [
    { name: "Moderate", points: 10 },
    { name: "Hard", points: 20 },
    { name: "Very Difficult", points: 35 },
  ];

  for (let i = 0; i < 50; i++) {
    const template = templates[type][i % templates[type].length];
    const difficulty = difficultyLevels[i % difficultyLevels.length];

    const answers = [
      template.correct,
      ...template.wrong,
    ].sort(() => Math.random() - 0.5);

    questions.push({
      question: template.q,
      answers,
      correct: template.correct,
      difficulty: difficulty.name,
      points: difficulty.points,
    });
  }

  return questions;
}
