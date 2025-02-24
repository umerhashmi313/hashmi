import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, CircularProgress } from "@mui/material";
import AccordionUsage from "./SingleCourse";
import { useLocation } from "react-router-dom";

const SingleCourseCard = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const courseId = location.state?.courseId; 
  

  useEffect(() => {
    if (!courseId) {
      console.error("No course id provided.");
      setLoading(false);
      return;
    }
    const fetchCourseData = async () => {
      const authToken = localStorage.getItem("authToken"); // Get token from local storage

      if (!authToken) {
        console.error("No auth token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://backend-lms-xpp7.onrender.com/api/courses/complete-course-outline/?id=${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourseData(data[0]); // Assuming first course in the list
        console.log(data)
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!courseData) {
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
      {/* Course Image Placeholder with Background Color */}
      <Box sx={{ height: 290, bgcolor: "#001F3F", borderRadius: 2 }} />

      {/* Course Details */}
      <CardContent sx={{ paddingX: "0" }}>
        <Typography variant="h5" fontWeight="bold">
          {courseData.course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {courseData.course.description}
        </Typography>

        {/* Instructor Info (Static for now, since API doesn't provide it) */}
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
