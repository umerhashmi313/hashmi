import React from "react";
import CourseCard from "./CourseCard";
import { Box, Typography, Chip } from "@mui/material";
import { useQuery } from "react-query";

export default function CourseList({}) {
  const fetchCourses = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      throw new Error("No token found");
    }
    const response = await fetch("https://backend-lms-xpp7.onrender.com/api/courses/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    return response.json();
  };

  const { data: courses, error, isLoading } = useQuery("courses", fetchCourses, {
    staleTime: 5 * 60 * 1000, // cache courses for 5 minutes
  });

  if (isLoading) return <Typography>Loading courses...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: 3,
        width: {sm:"fit-content" , xs:'100%'},
      }}
    >
      {/* Header Section */}
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        THE MDCAT WORLD
      </Typography>
      <Typography variant="body1" sx={{ color: "gray" }}>
        When you land on a sample
      </Typography>

      <Chip
        label="Course Title"
        sx={{
          backgroundColor: "#E7F7FF",
          color: "#0EAAFF",
          height: "25px",
          width: "100px",
        }}
      />

      <Typography variant="h5" sx={{ fontWeight: "bold", my: "4px" }}>
        Batch:
      </Typography>

      {/* Grid for Course Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // Single column on small screens
            sm:  '1fr',
          },
          gap: "16px",
        }}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course}/>
        ))}
      </Box>
    </Box>
  );
}
