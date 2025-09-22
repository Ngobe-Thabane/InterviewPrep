const quiz = [
  {
    id: "q1",
    question: "How do you prefer to receive feedback?",
    choices: [
      { id: "a1", choice: "Direct and immediate" },
      { id: "a2", choice: "Scheduled performance reviews" },
      { id: "a3", choice: "Written, so I can reflect on it" },
      { id: "a4", choice: "Through collaboration and discussion" },
    ],
    answer: {
      id: "a1",
      answer: "Direct and immediate",
    },
  },
  {
    id: "q2",
    question: "What type of work environment helps you thrive?",
    choices: [
      { id: "a1", choice: "Fast-paced and dynamic" },
      { id: "a2", choice: "Structured and predictable" },
      { id: "a3", choice: "Creative and collaborative" },
      { id: "a4", choice: "Independent and self-driven" },
    ],
    answer: {
      id: "a3",
      answer: "Creative and collaborative",
    },
  },
  {
    id: "q3",
    question: "How do you typically approach problem-solving?",
    choices: [
      { id: "a1", choice: "Rely on past experience" },
      { id: "a2", choice: "Brainstorm with the team" },
      { id: "a3", choice: "Research and analyze before acting" },
      { id: "a4", choice: "Experiment and learn by trial and error" },
    ],
    answer: {
      id: "a2",
      answer: "Brainstorm with the team",
    },
  },
  {
    id: "q4",
    question: "What motivates you most in your work?",
    choices: [
      { id: "a1", choice: "Achieving results and goals" },
      { id: "a2", choice: "Continuous learning and growth" },
      { id: "a3", choice: "Collaboration and teamwork" },
      { id: "a4", choice: "Recognition and appreciation" },
    ],
    answer: {
      id: "a2",
      answer: "Continuous learning and growth",
    },
  },
  {
    id: "q5",
    question: "How do you handle conflicts with colleagues?",
    choices: [
      { id: "a1", choice: "Address issues openly and directly" },
      { id: "a2", choice: "Seek mediation from a manager" },
      { id: "a3", choice: "Step back and reflect before responding" },
      { id: "a4", choice: "Avoid conflict and move on" },
    ],
    answer: {
      id: "a1",
      answer: "Address issues openly and directly",
    },
  },
];

function App() {
  const [question, setQuestion] = React.useState(1);
  const [showResults, setResults] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  const [start, setStart] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState(
    quiz.map((q) => ({ ...q, userAnswer: "" })),
  );

  const calculateTotal = () => {
    const userResults = userAnswers.reduce((lastvalue, answers) => {
      if (answers.answer.answer === answers.userAnswer) {
        return lastvalue + 1;
      }
      return lastvalue;
    }, 0);
    setTotal(userResults);
  };

  const handleAnswer = (questionId, choice) => {
    setUserAnswers((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, userAnswer: choice.choice } : q,
      ),
    );
  };

  const handleNext = () => {
    if (question < quiz.length) {
      setQuestion((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (question > 1) {
      setQuestion((prev) => prev - 1);
    } else {
      setStart(false);
    }
  };

  return (
    <div>
      <div>
        {!start && (
          <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full flex flex-col justify-between">
              <div class="space-y-4 text-center">
                <h1 class="text-2xl font-bold ">Culture Fit Interview Quiz</h1>
                <p class="text-gray-600">
                  You are about to take a quiz designed to help you prepare for
                  your upcoming interview.
                </p>
              </div>
              <div class="mt-8">
                <button
                  class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition"
                  onClick={() => setStart(true)}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {start && !showResults && (
        <div className="shadow w-1/2 mt-20 rounded-2xl bg-gray-100 m-auto flex p-8 self-center flex-col gap-5">
          <div>
            <QuizCard
              quizQuestion={userAnswers[question - 1]}
              handleAnswer={handleAnswer}
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-600 uppercase text-white"
            >
              back
            </button>

            <h3 className="text-xl font-bold">
              {question}/{quiz.length}
            </h3>
            {question != userAnswers.length ? (
              <button
                onClick={handleNext}
                className="text-white px-2 py-1 rounded bg-blue-600 hover:bg-blue-600 uppercase"
              >
                next
              </button>
            ) : (
              <button
                className="text-white px-2 py-1 rounded bg-blue-600 hover:bg-blue-600 uppercase"
                onClick={() => {
                  calculateTotal();
                  setResults(true);
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
      {showResults && (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
          <div class="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">
              Quiz Results
            </h2>

            <div class="grid grid-cols-2 gap-6 mb-8">
              <div class="bg-green-100 text-green-700 rounded-xl p-4 shadow">
                <p class="text-lg font-bold">{total}</p>
                <p class="text-sm">Correct</p>
              </div>

              <div class="bg-red-100 text-red-700 rounded-xl p-4 shadow">
                <p class="text-lg font-bold">{quiz.length - total}</p>
                <p class="text-sm">Wrong</p>
              </div>
            </div>

            <button
              onClick={() => {
                setResults(false);
                setStart(false);
                setQuestion(1);
              }}
              class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizCard({ quizQuestion, handleAnswer }) {
  const [userAnswer, setUserAnswer] = React.useState("");
  return (
    <div>
      <p className="text-4xl font-bold mb-2 text-center">
        {quizQuestion.question}
      </p>
      <div className="flex gap-2 flex-col">
        {quizQuestion.choices.map((choice) => {
          return (
            <div
              className={`text-2xl p-2 hover:cursor-pointer hover:bg-blue-600 shadow-sm rounded ${userAnswer == choice.choice ? "bg-blue-600 text-white" : ""}`}
              onClick={() => {
                handleAnswer(quizQuestion.id, choice);
                setUserAnswer(choice.choice);
              }}
            >
              <p>{choice.choice}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
