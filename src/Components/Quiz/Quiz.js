import React, { useState, useEffect } from "react";
import QuizHeader from "./QuizHeader";
import QuizHeader2 from "./QuizHeader2";
import QuizAttempts from "./QuizHeaderSolved";
import { useLocation } from "react-router-dom";

const TopQuestions = () => {
  const { state } = useLocation();
  const quizId = state?.quizId || 3;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [latestQuizAttempt, setLatestQuizAttempt] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load persisted quiz attempt on mount
  useEffect(() => {
    const storedQuizAttempt = localStorage.getItem("latestQuizAttempt");
    if (storedQuizAttempt) {
      setLatestQuizAttempt(JSON.parse(storedQuizAttempt));
      setQuizFinished(true);
    }
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        setToken(storedToken);

        if (!storedToken) {
          console.log("No token found, aborting fetch.");
          return;
        }

        // Fetch Quiz Data
        const quizResponse = await fetch(
          `https://backend-lms-xpp7.onrender.com/api/quizzes/?id=${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!quizResponse.ok) {
          throw new Error("Failed to fetch quiz data");
        }

        const quizData = await quizResponse.json();
        if (!quizData.length) {
          throw new Error("Quiz with ID 3 not found");
        }
        const quiz = quizData[0];
        const questionIDs = quiz.questions_ids;

        // Fetch Questions
        const questionsResponse = await fetch(
          "https://backend-lms-xpp7.onrender.com/api/questions/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!questionsResponse.ok) {
          throw new Error("Failed to fetch questions");
        }

        const questionsData = await questionsResponse.json();
        const filteredQuestions = questionsData.filter((question) =>
          questionIDs.includes(question.id)
        );

        // Fetch Options
        const optionsResponse = await fetch(
          "https://backend-lms-xpp7.onrender.com/api/options/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!optionsResponse.ok) {
          throw new Error("Failed to fetch options");
        }

        const optionsData = await optionsResponse.json();

        // Map each filtered question with its corresponding options
        const formattedQuestions = filteredQuestions.map((question) => {
          const matchedOptions = optionsData.filter(
            (option) => option.question_id === question.id
          );
          return { ...question, options: matchedOptions, quiz_id: quiz.id };
        });

        setQuestions(formattedQuestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch quiz data if quiz is not finished
    if (!quizFinished) {
      fetchQuizData();
    }
  }, [token, quizFinished, quizId]);

  const handleOptionSelect = (option) => {
    setSelectedResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      const existingIndex = updatedResponses.findIndex(
        (res) => res.question === questions[currentQuestionIndex].id
      );

      if (existingIndex !== -1) {
        updatedResponses[existingIndex] = {
          ...updatedResponses[existingIndex],
          selected_option: option.id,
          is_correct: option.is_correct || false,
        };
      } else {
        updatedResponses.push({
          question: questions[currentQuestionIndex].id,
          selected_option: option.id,
          is_correct: option.is_correct || false,
          visibility: true,
          reviewed: true,
          created_by: Number(localStorage.getItem("userId")),
          updated_by: Number(localStorage.getItem("userId")),
        });
      }

      return updatedResponses;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    setShowSubmitAlert(false);
    const userId = localStorage.getItem("userId");

    if (!userId || selectedResponses.length === 0) {
      console.error("User ID not found or no responses available.");
      return;
    }

    const payload = {
      quiz: questions.length > 0 ? questions[0].quiz_id : 3,
      taken_time: new Date().toISOString(),
      responses: selectedResponses,
    };

    try {
      // Submit quiz responses
      const response = await fetch(
        "https://backend-lms-xpp7.onrender.com/api/submit-quiz/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit quiz responses");
      }

      // Fetch quiz attempt data
      const quizAttemptsResponse = await fetch(
        `https://backend-lms-xpp7.onrender.com/api/quiz-attempts/?student=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!quizAttemptsResponse.ok) {
        throw new Error("Failed to fetch quiz attempts");
      }

      const quizAttemptsData = await quizAttemptsResponse.json();

      if (!quizAttemptsData.length) {
        console.log("No quiz attempts found.");
        return;
      }

      // Get the most recent quiz attempt and store it
      const latestAttempt = quizAttemptsData.sort(
        (a, b) => new Date(b.attempt_time) - new Date(a.attempt_time)
      )[0];

      localStorage.setItem("latestQuizAttempt", JSON.stringify(latestAttempt));
      setLatestQuizAttempt(latestAttempt);
      setQuizFinished(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleBack = () => {
    setCurrentQuestionIndex(
      (prev) => (prev - 1 + questions.length) % questions.length
    );
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  useEffect(() => {
    if (quizFinished) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [quizFinished]);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!questions.length && !quizFinished) return <p>No questions available.</p>;

  if (quizFinished) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <QuizAttempts latestQuizAttempt={latestQuizAttempt} />;
  }

  const currentQuestion = questions[currentQuestionIndex] || {};
  const options = Array.isArray(currentQuestion.options)
    ? currentQuestion.options
    : [];

  const areOptionsImages = options.some(
    (option) =>
      typeof option === "string" &&
      (option.includes(".jpg") || option.includes(".png"))
  );

  return areOptionsImages ? (
    <QuizHeader2
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      onNext={handleNext}
      onBack={handleBack}
      onQuestionClick={handleQuestionClick}
    />
  ) : (
    <QuizHeader
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      onNext={handleNext}
      onBack={handleBack}
      onQuestionClick={handleQuestionClick}
      onOptionSelect={handleOptionSelect}
      latestQuizAttempt={latestQuizAttempt}
    />
  );
};

export default TopQuestions;
