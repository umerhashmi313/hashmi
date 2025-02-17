import React, { useState, useEffect } from "react";
import QuizHeader from "./QuizHeader";
import QuizHeader2 from "./QuizHeader2";

const TopQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [selectedResponses, setSelectedResponses] = useState([]); // Store all responses
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const storedToken = localStorage.getItem("authToken");
                console.log( localStorage.getItem("userId"))
                setToken(storedToken);
    
                if (!storedToken) {
                    console.log("No token found, aborting fetch.");
                    return;
                }
    
                // Fetch Questions
                const questionsResponse = await fetch("https://backend-lms-xpp7.onrender.com/api/questions/", {
                    headers: {
                        "Authorization": `Bearer ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });
    
                if (!questionsResponse.ok) {
                    throw new Error("Failed to fetch questions");
                }
    
                const questionsData = await questionsResponse.json();
                // console.log("Fetched Questions:", questionsData);
    
                // Fetch Options
                const optionsResponse = await fetch("https://backend-lms-xpp7.onrender.com/api/options/", {
                    headers: {
                        "Authorization": `Bearer ${storedToken}`,
                        "Content-Type": "application/json"
                    }
                });
    
                if (!optionsResponse.ok) {
                    throw new Error("Failed to fetch options");
                }
    
                const optionsData = await optionsResponse.json();
                // console.log("Fetched Options:", optionsData);


                const formattedQuestions = questionsData.map((question) => {
                    const matchedOptions = optionsData.filter((option) => {
                        // console.log("Comparing question id:", question.id, "with option question_id:", option.question_id);
                        return option.question === question.id;
                    });
                
                    // console.log(`Matched options for question ${question.id}:`, matchedOptions);
                
                    return { ...question, options: matchedOptions };
                });
                
                
                
    
                // console.log("Formatted Questions:", formattedQuestions);
                setQuestions(formattedQuestions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchQuestions();
    }, [token]);
    

    const handleOptionSelect = (option) => {
        setSelectedResponses((prevResponses) => {
            const updatedResponses = [...prevResponses];
            const existingIndex = updatedResponses.findIndex((res) => res.question === questions[currentQuestionIndex].id);

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
        const userId = localStorage.getItem("userId");
    
        if (!userId || selectedResponses.length === 0) {
            console.error("User ID not found or no responses available.");
            return;
        }
    
        const payload = {
            quiz: 1, // Set the quiz ID dynamically if needed
            responses: selectedResponses,
        };
    
        try {
            // Step 1: Submit quiz responses
            const response = await fetch("https://backend-lms-xpp7.onrender.com/api/submit-quiz/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error("Failed to submit quiz responses");
            }
    
            console.log("Quiz submitted successfully!");
            setSelectedResponses([]); // Clear responses after submission
            setCurrentQuestionIndex(0); // Reset to first question
    
            // Step 2: Fetch quiz attempt data using the correct URL with query parameter
            const quizAttemptsResponse = await fetch(`https://backend-lms-xpp7.onrender.com/api/quiz-attempts/?student=${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (!quizAttemptsResponse.ok) {
                throw new Error("Failed to fetch quiz attempts");
            }
    
            const quizAttemptsData = await quizAttemptsResponse.json();
            // console.log("All Quiz Attempts Data:", quizAttemptsData);
    
            if (!quizAttemptsData.length) {
                console.log("No quiz attempts found.");
                return;
            }
    
            // Step 3: Get the most recent quiz attempt based on `attempt_time`
            const latestQuizAttempt = quizAttemptsData.sort(
                (a, b) => new Date(b.attempt_time) - new Date(a.attempt_time)
            )[0];
    
            // Convert timestamps to a normal readable format
            const formattedAttemptTime = new Date(latestQuizAttempt.attempt_time).toLocaleString();
            const formattedUpdatedAt = new Date(latestQuizAttempt.updated_at).toLocaleString();
    
            console.log("Latest Quiz Attempt:", {
                ...latestQuizAttempt,
                attempt_time: formattedAttemptTime,
                updated_at: formattedUpdatedAt
            });
    
            // Step 4: Optionally, store the latest quiz attempt in a state
            // setLatestQuizAttempt({ ...latestQuizAttempt, attempt_time: formattedAttemptTime, updated_at: formattedUpdatedAt });
    
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };
    
    
    


    const handleBack = () => {
        setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
    };

    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index);
    };

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!questions.length) return <p>No questions available.</p>;

    const currentQuestion = questions[currentQuestionIndex] || {};
    const options = Array.isArray(currentQuestion.options) ? currentQuestion.options : [];
    
    const areOptionsImages = options.some(
        (option) => typeof option === "string" && (option.includes(".jpg") || option.includes(".png"))
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
        />

    );
};

export default TopQuestions;
