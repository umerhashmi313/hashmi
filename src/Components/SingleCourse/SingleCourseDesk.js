import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import AccordionUsage from "./SingleCourse";

const SingleCourseCard = () => {
  return (
    <Card sx={{ maxWidth:'670px',width:'fit-content' , borderRadius: 2, boxShadow: 3 , boxSizing:'border-box',
        padding:'16px'
    }}>
      {/* Course Image Placeholder with Background Color */}
      <Box sx={{ height: 290, bgcolor: "#001F3F", borderRadius: 2,  }} />

      {/* Course Details */}
      <CardContent sx={{paddingX:'0'}}>
        <Typography variant="h5" fontWeight="bold">
          Course Name
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data.
        </Typography>

        {/* Instructor Info */}
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar sx={{ bgcolor: "green" }}>B</Avatar>
          <Typography variant="body1" sx={{ ml: 1 }}>
            <strong>Instructor:</strong> <span style={{ color: "black"  }}>Brooklyn Simmons</span>
          </Typography>
        </Box>

        {/* Course Includes Section */}
       
     
      </CardContent>
      <Typography variant="h6" fontWeight="bold" >
          The Course Includes:
        </Typography>
      <Box >
      <AccordionUsage/>
      </Box>

    </Card>
         

  );
};

export default SingleCourseCard;
