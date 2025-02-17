import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from "@mui/material";

export default function CourseCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
    console.log("Token in CourseCard:", storedToken);
  
    if (!storedToken) {
      console.log("No token found, aborting fetch.");
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
        console.log("Fetched Courses:", data);
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]); // ✅ Now updates when token changes
  
  
  
  return (
    <>
      {courses.map((course) => (
        <Card
          key={course.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
            borderRadius: 3,
            boxShadow: 6,
            height: "fit-content",
            width: "auto",
            marginBottom: "16px",
          }}
        >
          {/* Course Image */}
          <CardMedia
            // component="img"
            // image={course.imageUrl || "https://via.placeholder.com/300"}
            // alt={course.name}
            sx={{
              height: "186px",
              width: "100%",
              backgroundColor: "#001F3F",
              borderRadius: "8px",
            }}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: "35px",
              padding: 0,
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* Course Category */}
              <Chip
                label={course.category || "Unknown"}
                sx={{
                  backgroundColor: "#E7F7FF",
                  color: "#0EAAFF",
                  height: "20px",
                }}
              />

              {/* Course Name */}
              <Typography sx={{ fontSize: "16px", fontWeight: "900" }}>
                {course.name}
              </Typography>

              {/* Creator */}
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                Created by <strong>{course.created_by || "Unknown"}</strong>
              </Typography>

              {/* Price */}
              <Typography variant="h6">Rs. {course.price || "N/A"}</Typography>
            </Box>

            {/* Course Stats */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Button variant="outlined" sx={{ height: "22px", fontSize: "8px", borderRadius: "16px", color: "black" }}>
                Total Videos: {course.totalVideos || "0"}
              </Button>
              <Button variant="outlined" sx={{ height: "22px", fontSize: "8px", borderRadius: "16px", color: "black" }}>
                Total Notes: {course.totalNotes || "0"}
              </Button>
              <Button variant="outlined" sx={{ height: "22px", fontSize: "8px", borderRadius: "16px", color: "black" }}>
                Total Quizzes: {course.totalQuizzes || "0"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
