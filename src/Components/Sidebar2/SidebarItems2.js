import React, { useState, useEffect } from "react";
import { Box, Typography, Stepper, Step, StepLabel, CircularProgress } from "@mui/material";
import { ExpandLess, ExpandMore, PlayCircle, QuizOutlined, NotesOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const VerticalConnector = () => <div style={{ borderLeft: "2px solid #ccc", height: "22px", marginLeft: "20px",my:'-10px', opacity: "40%" }} />;
const StepIconContainer = ({ children }) => <div style={{ display: "flex", alignItems: "center" }}>{children}</div>;
const StepIcon = ({ active }) => <div style={{   width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#78BBFF", opacity: active ? 1 : 0.4 }} />;
const FadedDivider = () => <div style={{ borderBottom: "1px solid #ccc", margin: "10px 10px" }} />;

const NavigationComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("https://backend-lms-xpp7.onrender.com/api/courses/complete-course-outline/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log(data)
        setCourseData(data[0]);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  if (loading) return <CircularProgress />;
  if (!courseData) return <Typography>Error loading course data.</Typography>;

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{
      maxHeight: "calc(100vh - 100px)",
      overflowY: "auto",
      pr: 2,
      display: "flex",
      flexDirection: "column",
      '&::-webkit-scrollbar': { width: '8px' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '4px' },
      '&::-webkit-scrollbar-track': { backgroundColor: '#03162A' },
      paddingBottom: "100px",
    }}>
      {/* Course Name Clickable */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, cursor: "pointer", px: "12px", gap: "12px" }} onClick={() => setExpanded(!expanded)}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "18px", cursor: "pointer" }}>
          {courseData.course?.name || "No Course Name"}
        </Typography>
      </Box>
      <FadedDivider />

      {expanded && (
        <Stepper  orientation="vertical"  connector={<VerticalConnector />}>
          {/* Subjects */}
          {courseData.subjects?.map((subject, index) => (
            <Step  sx={{
              mb:'-10px'
            }} key={index} onClick={() => handleStepClick(subject.name)}>
              <StepLabel
                StepIconComponent={({ active }) => (
                  <StepIconContainer>
                    <StepIcon active={activeStep === subject.name} />
                  </StepIconContainer>
                )}
                sx={{
                  cursor: "pointer",
                  paddingLeft: "16px",
                  '& .MuiStepLabel-label': {
                    fontWeight: activeStep === subject.name ? "600" : "400",
                    fontSize: "15px",
                    color: activeStep === subject.name ? "white" : "#ccc",
                  },
                }}
              >
                {subject.name}
              </StepLabel>
            </Step>
          ))}

          {/* Direct Content */}
          {["videos", "quizzes", "reading_materials"].map((contentType, index) => (
  courseData.direct_content?.[contentType]?.length > 0 && (
    <Step
      sx={{
        my: '-10px',
        cursor: "pointer",
      }}
      key={index}
      onClick={() => {
        if (contentType === "quizzes") {
          setActiveStep("quizzes"); // Ensure "quizzes" is marked as active
          navigate("/dashboard");
        } else {
          handleStepClick(contentType);
        }
      }}
    >
      <StepLabel
        StepIconComponent={({ active }) => (
          <StepIconContainer>
            <StepIcon active={activeStep === contentType} />
          </StepIconContainer>
        )}
        sx={{
          cursor: "pointer",
          paddingLeft: "16px",

          '& .MuiStepLabel-label': {
            fontWeight: activeStep === contentType ? "600" : "400",
            fontSize: "15px",
            color: activeStep === contentType ? "white" : "black", // Fix color condition
          },
        }}
      >
        {courseData.direct_content[contentType][0]?.title || "No Data"}
      </StepLabel>
    </Step>
  )
))}


          {/* Sections */}
          {courseData.sections?.map((section, index) => (
            <Step sx={{
               my:'-10px'
            }} key={index} onClick={() => handleStepClick(section.title)}>
              <StepLabel
                StepIconComponent={({ active }) => (
                  <StepIconContainer>
                    <StepIcon active={activeStep === section.title} />
                  </StepIconContainer>
                )}
                sx={{
                 
                  paddingLeft: "16px",
                  '& .MuiStepLabel-label': {
                    fontWeight: activeStep === section.title ? "600" : "400",
                    fontSize: "15px",
                    color: activeStep === section.title ? "white" : "black",
                  },
                }}
              >
                {section.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </Box>
  );
};

export default NavigationComponent;
