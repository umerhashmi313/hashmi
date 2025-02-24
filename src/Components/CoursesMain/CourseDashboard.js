import React from "react";
import CourseCard from "./CourseCard"; // Importing the CourseCard component
import { Box, Typography , Chip } from "@mui/material";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseList() {

  const Navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      console.log("No token found, aborting fetch.");
      setLoading(false);
      return;
    }

    fetch("https://backend-lms-xpp7.onrender.com/api/courses/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading courses...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        backgroundColor: "white", // Light background for the parent container
        borderRadius: 3,
        boxShadow: 3,
        width:'100%'
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
                    width:'100px'
                  }}
                />

      <Typography variant="h5" sx={{ fontWeight: "bold", my:'4px' }}>
        Batch:
      </Typography>

      {/* Grid for Course Cards */}
      <Box
        sx={{
          display: "grid",
         gridTemplateColumns: {
            xs: "1fr", // Single column layout for screens below 580px
            sm: "repeat(2, 1fr)", // Two columns for screens above 580px
          },
          
          gap: "16px",
        }}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Box>
    </Box>
  );
}
