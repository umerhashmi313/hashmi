// SingleCourseDesk.js
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { CircularProgress, Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import AccordionUsage from "./SingleCourse";
import { useLocation } from "react-router-dom";

const SingleCourseCard = ({ setCourseData }) => {
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
    return data[0];
  };

  const { data: courseData, error, isLoading } = useQuery(['course', courseId], fetchCourseData, {
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000,
  });

  // When data is fetched, save it to local storage and update parent's state.
  useEffect(() => {
    if (courseData) {
      console.log("Fetched courseData:", courseData);
      localStorage.setItem("courseData", JSON.stringify(courseData));
      setCourseData(courseData);
    }
  }, [courseData, setCourseData]);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error || !courseData) {
    return <Typography>Error loading course data.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: "670px", borderRadius: 2, boxShadow: 3, padding: "16px" }}>
      <Box sx={{ height: 290, bgcolor: "#001F3F", borderRadius: 2 }} />
      <CardContent sx={{ paddingX: "0" }}>
        <Typography variant="h5" fontWeight="bold">
          {courseData.course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {courseData.course.description}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar sx={{ bgcolor: "green" }}>B</Avatar>
          <Typography variant="body1" sx={{ ml: 1 }}>
            <strong>Instructor:</strong> <span style={{ color: "black" }}>Brooklyn Simmons</span>
          </Typography>
        </Box>
      </CardContent>
      <Typography variant="h6" fontWeight="bold">
        The Course Includes:
      </Typography>
      <Box>
        <AccordionUsage courseData={courseData} />
      </Box>
    </Card>
  );
};

export default SingleCourseCard;
