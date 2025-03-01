import React, { useState } from "react";
import { Box, Typography, Stack, styled, Skeleton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../Buttons/Buttons";
import { dashboardData } from "./DemoMain"; // For icons and static text
import "./Main.css";
import { useQuery } from "react-query";
import QuizAttempts from '../Quiz/QuizHeaderSolved'

const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#EAFAF8",
  borderRadius: "8px",
  padding: "8px",
  height: "40px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  border: "1px solid #E9E9E9",
  gap: "8px",
  boxSizing: "border-box",
}));

// Skeleton placeholder that mimics the final ScholarshipCard layout.
const ScholarshipCardSkeleton = () => {
  return (
    <Box
      sx={{
        maxWidth: { sm: "686px", xs: "100%" },
        width: "100%",
        minWidth:'300px',
        mx: "auto",
        p: "16px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
        height: { xs: "90vh", sm: "auto" },
      }}
    >
      {/* Content Section Skeleton */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "48px", sm: "16px" },
          flex: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Header skeletons */}
          <Box sx={{ gap: "8px" }}>
            <Skeleton variant="text" width="30%" height={20} />
            <Skeleton variant="text" width="80%" height={40} />
          </Box>
          {/* Description skeleton */}
          <Skeleton variant="rectangular" width="100%" height={72} />
        </Box>

        {/* Dynamic Stats Section Skeleton */}
        <Box sx={{ height: "184px", gap: "8px", flex: 1, mt: { xs: "50px", sm: "0px" } }}>
          <Stack spacing={1}>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={40} />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Action Buttons Skeleton */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "16px",
          justifyContent: "center",
          mt: "32px",
        }}
      >
        <Skeleton variant="rectangular" width="95%" height={40} />
        <Skeleton variant="rectangular" width="95%" height={40} />
      </Box>
    </Box>
  );
};

export default function ScholarshipCard() {
  const { Dashboard } = dashboardData;
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId } = location.state || {};
  const [showPreviousResult, setShowPreviousResult] = useState(false)

  // Define the query function for fetching quiz data.
  const fetchQuizData = async () => {
    if (!quizId) {
      throw new Error("No quizId provided.");
    }
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No auth token found.");
    }
    const response = await fetch(`https://backend-lms-xpp7.onrender.com/api/quizzes/?id=${quizId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  };

  // Use React Query's useQuery hook to fetch quiz data.
  const { data: quizData, isLoading, error } = useQuery(["quizData", quizId], fetchQuizData);

  // Build the stats array with dynamic and static values.
  const stats = [
    {
      icon: Dashboard.Questions.icon,
      label: "Total Questions",
      value: quizData ? quizData.questions_ids.length : 0,
    },
    {
      icon: Dashboard.PassRate.icon,
      label: "Pass Rate",
      value: Dashboard.PassRate.Text,
    },
    {
      icon: Dashboard.Duration.icon,
      label: "Time Duration (mins)",
      value: quizData ? quizData.time_duration : 0,
    },
    {
      icon: Dashboard.Score.icon,
      label: "Score",
      value: Dashboard.Score.Text,
    },
  ];

  // Handler for "View Previous Result"
  const handleViewPreviousResult = () => {
    setShowPreviousResult(true);
  };

  // If showPreviousResult is true, render the QuizAttempts (QuizHeaderSolved) component.
  if (showPreviousResult) {
    return <QuizAttempts />;
  }

 
  // Show the skeleton while loading.
  if (isLoading) {
    return <ScholarshipCardSkeleton />;
  }

  if (error || !quizData) {
    return (
      <Box
        sx={{
          maxWidth: { sm: "686px", xs: "100%" },
          width: "100%",
          mx: "auto",
          p: "16px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "90vh", sm: "auto" },
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Error loading quiz data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: { sm: "686px", xs: "100%" },
        width: "100%",
        mx: "auto",
        p: "16px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
        height: { xs: "90vh", sm: "auto" },
      }}
    >
      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "48px", sm: "16px" },
          flex: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Header */}
          <Box sx={{ gap: "8px" }}>
            <Typography sx={{ fontWeight: 900, color: "black", fontSize: "12px" }}>
              MODULE 1 &gt; CHAPTER
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontWeight: 700, color: "#03162A", fontSize: "32px", lineHeight: "120%" }}
            >
              {quizData.title}
            </Typography>
          </Box>

          {/* Description */}
          {quizData ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ height: "72px", gap: "8px", width: "fit-content" }}
              paragraph
            >
              {quizData.description}
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Loading description...
            </Typography>
          )}
        </Box>

        {/* Dynamic Stats Section */}
        <Box sx={{ height: "184px", gap: "8px", flex: 1, mt: { xs: "50px", sm: "0px" } }}>
          <Stack spacing={1}>
            {stats.map(({ icon: Icon, label, value }, index) => (
              <StatCard key={index}>
                <Icon sx={{ color: "#000000", height: "20px", width: "20px" }} />
                <Typography variant="body1" sx={{ fontSize: "16px", lineHeight: "150%" }} color="#212B36" fontWeight={400}>
                  {value}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "16px", ml: "auto", color: "#7F8184", fontWeight: 400, lineHeight: "150%" }}>
                  {label}
                </Typography>
              </StatCard>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "16px",
          justifyContent: "center",
          mt: "32px",
        }}
      >
        <PrimaryButton
          sx={{ width: "95%" }}
          variant="contained"
          onClick={() => {
            localStorage.removeItem("latestQuizAttempt");
            navigate("/Questions", { state: { quizId } });
          }}
        >
          Start Quiz
        </PrimaryButton>

        <SecondaryButton
          sx={{ width: "95%" }}
          variant="contained"
          onClick={handleViewPreviousResult}
        >
          View Previous Result
        </SecondaryButton>
      </Box>
    </Box>
  );
}
