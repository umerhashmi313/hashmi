import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CourseCard({course}) {

  const navigate = useNavigate();

  
  const handleClick = () => {
    // Navigate to /singlecourse/<course.id> and pass the course id in location state
    navigate(`/singlecourse`, { state: { courseId: course.id } });
  };
  
  
  return (
        <Card
        onClick={handleClick}
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
    
    
  );
}
