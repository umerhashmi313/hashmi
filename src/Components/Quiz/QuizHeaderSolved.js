import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { PrimaryButton, SecondaryButton } from "../Buttons/Buttons";
import TourIcon from "@mui/icons-material/Tour";
import GradeSharpIcon from "@mui/icons-material/GradeSharp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

function QuizHeader({ onOptionSelect }) {
  const [questions, setQuestions] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptTime, setAttemptTime] = useState(null);
  const [filterType, setFilterType] = useState("all"); // "all", "correct", "incorrect"
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const boxRefs = useRef([]);
  const containerRef = useRef();
  const navigate = useNavigate();

  // Fetch and format quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        const Base_Url = process.env.REACT_APP_BASE_URL;

        const response = await fetch(
          `${Base_Url}/quiz-attempts/latest/?student=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Authorization failed or network error");
        }

        const data = await response.json();
        setAttemptTime(data.attempt_time);

        // Format questions by including an original index and full option objects.
        const formattedQuestions = data.questions.map((q, index) => ({
          originalIndex: index,
          text: q.question_text,
          options: q.options.map((option) => ({
            id: option.option_id,
            text: option.option_text,
            isCorrect: option.option_is_correct,
          })),
          selectedOption: q.selected_option ? q.selected_option.id : null,
          isCorrect: q.is_correct,
          // Use the difficulty text (if provided), converted to lowercase for consistency.
          difficulty: q.difficulty?.text ? q.difficulty.text.toLowerCase() : "unknown",
          q_tags: q.q_tags,
        }));

        // Build initial checked states (keyed by original index).
        const initialCheckedStates = {};
        formattedQuestions.forEach((q, index) => {
          const selectedIndex = q.options.findIndex(
            (opt) => opt.id === q.selectedOption
          );
          initialCheckedStates[q.originalIndex] = selectedIndex;
        });

        setQuestions(formattedQuestions);
        setCheckedStates(initialCheckedStates);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  // useMemo to derive filtered questions based on filterType and difficultyFilter.
  const filteredQuestions = useMemo(() => {
    let filtered = [...questions];
    if (filterType === "correct") {
      filtered = filtered.filter((q) => q.isCorrect);
    } else if (filterType === "incorrect") {
      filtered = filtered.filter((q) => !q.isCorrect);
    }
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((q) => q.difficulty === difficultyFilter);
    }
    return filtered;
  }, [questions, filterType, difficultyFilter]);

  // Reset current question index when filters change
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [filterType, difficultyFilter, questions]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format attempt time (assuming an ISO string) as MM:SS
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Filter change handlers
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficultyFilter(event.target.value);
  };

  // Instead of allowing option selection, this function now simply does nothing
  // to keep the page read-only.
  const handleCheckboxChange = (optionIndex, option) => {
    // Disabled - no option can be selected/unselected.
  };

  // Navigation functions based on filteredQuestions
  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const onBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReviewToggle = () => {
    setIsReviewMode((prev) => !prev);
  };

  const handleBoxClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Get the center position of a navigation button for drawing connecting lines.
  const getBoxCenter = (index) => {
    if (boxRefs.current[index] && containerRef.current) {
      const box = boxRefs.current[index].getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      return {
        x: box.left - container.left + box.width / 2,
        y: box.top - container.top + box.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  // Determine background color for the main question container.
  const mainContainerBg =
    filteredQuestions[currentQuestionIndex]?.isCorrect === false
      ? "#FFC5C6"
      : isReviewMode
      ? "yellow"
      : "white";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        width: "100%",
        padding: { xs: "0px", sm: "16px" },
      }}
    >
      {/* Header with score and attempt time */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "686px",
          width: { xs: "100%", sm: "100%" },
          backgroundColor: "white",
          zIndex: 1,
          padding: "16px",
          boxSizing: "border-box",
          gap: "16px",
          position: { xs: "fixed", sm: "initial" },
          top: { xs: "60px", sm: "initial" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
            Correct: {questions.filter((q) => q.isCorrect).length}/{questions.length}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <AccessTimeIcon />
            <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
              {attemptTime ? formatTime(attemptTime) : "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Navigation Buttons and SVG Connector */}
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "start",
            position: "relative",
            marginTop: "6px",
          }}
        >
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {filteredQuestions.slice(0, -1).map((_, index) => {
              const start = getBoxCenter(index);
              const end = getBoxCenter(index + 1);
              return (
                <line
                  key={index}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#31CEB8"
                  strokeWidth="1px"
                />
              );
            })}
          </svg>
          {filteredQuestions.map((_, index) => (
            <Button
              key={index}
              onClick={() => handleBoxClick(index)}
              ref={(el) => (boxRefs.current[index] = el)}
              sx={{
                width: "24px",
                minWidth: 0,
                height: "24px",
                boxShadow: "none",
                fontWeight: "800",
                border:
                  currentQuestionIndex === index ? "none" : "1px solid lightgrey",
                padding: "0",
                fontSize:
                  filteredQuestions[index]?.isCorrect || currentQuestionIndex === index
                    ? "17px"
                    : "15px",
                backgroundColor:
                  filteredQuestions[index]?.isCorrect === true
                    ? "#4CAF50"
                    : filteredQuestions[index]?.isCorrect === false
                    ? "#E57373"
                    : currentQuestionIndex === index
                    ? "black"
                    : "white",
                color:
                  filteredQuestions[index]?.isCorrect || currentQuestionIndex === index
                    ? "#fff"
                    : "#B5B6B8",
                "&:hover": {
                  backgroundColor:
                    filteredQuestions[index]?.isCorrect || currentQuestionIndex === index
                      ? "black"
                      : "#ccc",
                },
                transition: "background-color 0.3s",
                zIndex: 1,
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>

        {/* Filter Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "16px",
          }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ width: "145px", borderRadius: "20px", height: "35px" }}
          >
            <InputLabel sx={{ color: "#b0b0b0", fontSize: "18px", top: "-8px" }}>
              Filter Questions
            </InputLabel>
            <Select
              value={filterType}
              onChange={handleFilterChange}
              label="Filter Questions"
              displayEmpty
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#b0b0b0",
                    fontSize: "18px",
                    padding: 0,
                    height: "30px",
                  }}
                >
                  <FilterListIcon sx={{ marginRight: "5px", fontSize: "16px" }} />
                  {selected === "" ? "Correct Tag" : selected}
                </Box>
              )}
              sx={{
                color: "#b0b0b0",
                borderRadius: "20px",
                border: "1px solid #b0b0b0",
                height: "35px",
                fontSize: "18px",
                padding: "5px 4px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: { maxHeight: "200px", fontSize: "14px" },
                },
              }}
            >
              <MenuItem value="all" sx={{ fontSize: "14px" }}>
                All Questions
              </MenuItem>
              <MenuItem value="correct" sx={{ fontSize: "14px" }}>
                Correct
              </MenuItem>
              <MenuItem value="incorrect" sx={{ fontSize: "14px" }}>
                Incorrect
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            variant="outlined"
            sx={{ width: "150px", borderRadius: "20px", height: "35px" }}
          >
            <InputLabel sx={{ color: "#b0b0b0", fontSize: "18px", top: "-8px" }}>
              Difficulty
            </InputLabel>
            <Select
              value={difficultyFilter}
              onChange={handleDifficultyChange}
              label="Difficulty"
              displayEmpty
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#b0b0b0",
                    height: "30px",
                    fontSize: "18px",
                  }}
                >
                  <FilterListIcon sx={{ marginRight: "5px", fontSize: "16px" }} />
                  {selected === "" ? "Difficulty" : selected}
                </Box>
              )}
              sx={{
                color: "#b0b0b0",
                borderRadius: "20px",
                border: "1px solid #b0b0b0",
                height: "35px",
                fontSize: "18px",
                padding: "5px 4px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: { maxHeight: "200px", fontSize: "12px" },
                },
              }}
            >
              <MenuItem value="all" sx={{ fontSize: "12px" }}>
                All
              </MenuItem>
              <MenuItem value="easy" sx={{ fontSize: "12px" }}>
                Easy
              </MenuItem>
              <MenuItem value="medium" sx={{ fontSize: "12px" }}>
                Medium
              </MenuItem>
              <MenuItem value="hard" sx={{ fontSize: "12px" }}>
                Hard
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Question Display */}
      <Box
        sx={{
          borderRadius: 3,
          backgroundColor: mainContainerBg,
          gap: "32px",
          padding: "16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          width: { xs: "94%", sm: "100%" },
          maxWidth: "686px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
              Report
            </Typography>
            <TourIcon sx={{ color: "#E1004D" }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GradeSharpIcon sx={{ height: "21px", color: "yellow" }} />
            <Typography sx={{ fontWeight: "800", fontSize: "18px" }}>·</Typography>
            <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
              Review
              <Switch checked={isReviewMode} onChange={handleReviewToggle} />
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: filteredQuestions[currentQuestionIndex]?.image
              ? { xs: "column-reverse", sm: "row" }
              : "column",
            gap: "16px",
            width: "100%",
            mb: 2,
          }}
        >
          {filteredQuestions[currentQuestionIndex]?.image && (
            <Box sx={{ width: "100%", height: "100%" }}>
              <Box
                component="img"
                src={filteredQuestions[currentQuestionIndex]?.image}
                alt="Question illustration"
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "192px",
                  boxShadow: 5,
                  boxSizing: "border-box",
                  objectFit: "cover",
                  borderRadius: 3,
                  display: "block",
                  border: "1px solid lightgrey",
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Typography
              variant="body1"
              component="p"
              sx={{
                lineHeight: 1.5,
                width: "100%",
                color: "#7F8184",
                textAlign: "left",
              }}
            >
              {filteredQuestions[currentQuestionIndex]?.text}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={1}>
          {filteredQuestions[currentQuestionIndex]?.options.map((option, index) => {
            const originalIndex = filteredQuestions[currentQuestionIndex].originalIndex;
            const isSelected = checkedStates[originalIndex] === index;
            // Determine correct option for current question
            const correctOption = filteredQuestions[currentQuestionIndex]?.options.find(
              (opt) => opt.isCorrect
            );

            // Set default background and checkbox colors
            let backgroundColor = "#EAFAF8";
            let checkboxColor = "#000";

            if (isSelected) {
              backgroundColor = option.isCorrect ? "#41723A" : "#FF4447";
              checkboxColor = "#fff";
            }
            // If the answer is wrong, highlight the correct option in green
            if (!filteredQuestions[currentQuestionIndex].isCorrect && option.isCorrect) {
              backgroundColor = "#4CAF50";
            }

            return (
              <Grid item xs={12} key={index}>
                <Paper
                  sx={{
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor,
                    transition: "background-color 0.3s ease",
                    cursor: "default",
                  }}
                  // Disabled interaction by removing onClick
                >
                  <Checkbox
                    checked={isSelected}
                    disabled
                    sx={{
                      color: checkboxColor,
                      "&.Mui-checked": { color: checkboxColor },
                    }}
                  />
                  <Typography>{option.text}</Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            width: "100%",
            mt: "20px",
          }}
        >
          <SecondaryButton variant="contained" onClick={onBack}>
            Back
          </SecondaryButton>
          <PrimaryButton
            variant="contained"
            onClick={
              currentQuestionIndex === filteredQuestions.length - 1
                ? () => navigate("/courses")
                : handleNext
            }
          >
            {currentQuestionIndex === filteredQuestions.length - 1 ? "Go to Home" : "Next"}
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
}

export default QuizHeader;
