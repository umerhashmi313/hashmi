import React from "react";
import { Card, CardContent, Typography, Avatar, Box, CircularProgress } from "@mui/material";
import AccordionUsage from "./SingleCourse";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

const SingleCourseCard = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;

  const fetchCourseData = async () => {
    if (!courseId) {
      throw new Error("No course id provided.");
    }
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No auth token found.");
    }
    const response = await fetch(`https://backend-lms-xpp7.onrender.com/api/courses/complete-course-outline/?id=${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data[0]; // Assuming the first course is the one needed.
  };

  const { data: courseData, error, isLoading } = useQuery(['course', courseId], fetchCourseData, {
    enabled: !!courseId, // Only run if courseId exists.
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes.
  });

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error || !courseData) {
    return <Typography>Error loading course data.</Typography>;
  }

  const quizId =
    courseData.direct_content &&
    courseData.direct_content.quizzes &&
    courseData.direct_content.quizzes.length > 0
      ? courseData.direct_content.quizzes[0].id
      : null;

  return (
    <Card
      sx={{
        maxWidth: "670px",
        width: "fit-content",
        borderRadius: 2,
        boxShadow: 3,
        boxSizing: "border-box",
        padding: "16px",
      }}
    >
      {/* Course Image Placeholder */}
      <Box sx={{ height: 290, bgcolor: "#001F3F", borderRadius: 2 }} />

      {/* Course Details */}
      <CardContent sx={{ paddingX: "0" }}>
        <Typography variant="h5" fontWeight="bold">
          {courseData.course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {courseData.course.description}
        </Typography>

        {/* Instructor Info */}
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar sx={{ bgcolor: "green" }}>B</Avatar>
          <Typography variant="body1" sx={{ ml: 1 }}>
            <strong>Instructor:</strong> <span style={{ color: "black" }}>Brooklyn Simmons</span>
          </Typography>
        </Box>
      </CardContent>

      {/* Course Includes Section */}
      <Typography variant="h6" fontWeight="bold">
        The Course Includes:
      </Typography>
      <Box>
        <AccordionUsage courseData={courseData} quizId={quizId} />
      </Box>
    </Card>
  );
};

export default SingleCourseCard;
