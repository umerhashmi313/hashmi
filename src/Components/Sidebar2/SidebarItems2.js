import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import QuizIcon from "@mui/icons-material/Quiz";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Styled divider similar to your singlecourse component
const BlackDivider = styled(Divider)(({ theme }) => ({
  background: "black",
  height: "0.1px",
  margin: theme.spacing(1, 0),
  boxShadow: "0 2px 4px rgba(255, 255, 255, 0.79)",
}));
// Styled divider similar to your singlecourse component
const GreenDivider = styled(Divider)(({ theme }) => ({
  background: 'linear-gradient(to right, transparent,#239283, transparent)',
  height: '1px',
  margin: theme.spacing(1, 2),
}));

/**
 * Recursively renders a chapter (section or final content).
 *
 * For final content items (video, quiz, etc.), if the optional index and arrLength
 * props are provided, the component renders the vertical connector line and dot.
 */
const CollapsibleOutline = ({
  chapter,
  handleVideoClick,
  handleQuizClick,
  index,
  arrLength,
}) => {
  const [open, setOpen] = useState(false);
  // Local state to track if the item has been activated (clicked)
  const [active, setActive] = useState(false);
  const children = chapter?.ordered_content || [];
  const hasChildren = children.length > 0;
  const isSection = chapter.type === "section";

  // For final content items (video, quiz, etc.)
  if (!isSection) {
    // Determine if the item is first or last among its siblings.
    const isFirst = typeof index === "number" && index === 0;
    const isLast =
      typeof index === "number" &&
      typeof arrLength === "number" &&
      index === arrLength - 1;

    return (
      <ListItem
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "4px",
          pl: "32px",
          cursor: "pointer",
        }}
        onClick={() => {
          // Mark the item as active when clicked.
          setActive(true);
          if (chapter.type === "video") {
            handleVideoClick?.(chapter);
          } else if (chapter.type === "quiz") {
            handleQuizClick?.(chapter);
          }
        }}
      >
        {/* Connector Line remains unchanged */}
        <Box
          sx={{
            position: "absolute",
            left: "18px",
            top: isFirst ? "calc(38% + 5px)" : 0,
            bottom: isLast ? "calc(100% - (38% + 5px))" : 0,
            width: "2px",
            backgroundColor: "#78BBFF",
            zIndex: 0,
          }}
        />
        {/* Dot: color changes based on active state */}
        <Box
          sx={{
            position: "absolute",
            left: "14px",
            top: "38%",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: active ? "#31CEB8" : "#15574D",
            zIndex: 1,
          }}
        />
        <ListItemIcon sx={{ minWidth: "unset", mr: 1, color: "white" }}>
          {chapter.type === "video" ? (
            <PlayCircleFilledIcon />
          ) : chapter.type === "quiz" ? (
            <QuizIcon />
          ) : (
            <FolderIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={chapter.name || "Untitled"} />
      </ListItem>
    );
  }

  // Render section/chapter titles for nested sections.
  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: hasChildren ? "pointer" : "default",
          gap: "8px",
        }}
        onClick={() => {
          if (hasChildren) setOpen(!open);
        }}
      >
        {hasChildren && (
          <ExpandMoreIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        )}
        {chapter?.name || "Untitled Section"}
      </Typography>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <GreenDivider />
          <List disablePadding>
            {children.map((child, idx, arr) => (
              <React.Fragment key={child.id}>
                <CollapsibleOutline
                  chapter={child}
                  handleVideoClick={handleVideoClick}
                  handleQuizClick={handleQuizClick}
                  index={idx}
                  arrLength={arr.length}
                />
                {/* Divider between items */}
                {/* <GreenDivider /> */}
              </React.Fragment>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};



const AccordionNavigation = ({ selectedCourseId }) => {
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
        const response = await fetch(
          `https://backend-lms-xpp7.onrender.com/api/courses/complete-course-outline/?id=${selectedCourseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCourseData(data[0]);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [selectedCourseId]);

  if (loading) return <CircularProgress />;
  if (!courseData)
    return <Typography>Error loading course data.</Typography>;

  // Adjust this to match your actual data structure.
  const topLevelContent = courseData.sections?.[0]?.ordered_content || [];

  const handleVideoClick = (video) => {
    navigate("/videopage", { state: { video } });
  };

  const handleQuizClick = (quiz) => {
    navigate("/dashboard", { state: { quizId: quiz.id } });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p:'8px',
        // gap:'12px',
      }}
    >
      {topLevelContent.map((quarter) => (
        <Accordion
          key={quarter.id}
          sx={{
            backgroundColor: "transparent",
            // When expanded, change the background color
            "&.Mui-expanded": {
              backgroundColor: "#239283",
            },
            // (Optional) Smooth transition
            transition: "background-color 0.3s",
            color: "white",
            width:'230px',
            height:'45px',
            border:'3px solid #239283',  
            boxShadow: "0 0 7px 0 #239283",
            margin: "8px 0",
            borderRadius: "8px", // Set your desired radius here
            // overflow: "hidden",  // Ensures inner content respects the border radius
            "&:first-of-type": {
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            },
            // Last child: add bottom corners radius
            "&:last-of-type": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
  
          }}
          disableGutters
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography sx={{
              fontSize:'18px',
              fontWeight:'500',
              lineHeight:'140%'
            }}>{quarter.name}</Typography>
          </AccordionSummary>
          <AccordionDetails
  sx={{
    position: "relative", // necessary for pseudo-elements to position relative to this container
    display: "flex",
    flexDirection: "column",
    color: "white",
    backgroundColor: "transparent",
    borderBottom: "3px solid #239283", // keep bottom border as is
    // Remove default left/right borders and add gradient via pseudo-elements
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: "2px",
      background: "linear-gradient(to top, #239283, transparent)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: "3px",
      background: "linear-gradient(to top, #239283, transparent)",
    },
  }}
>
            {quarter.ordered_content?.map((child, idx, arr) => (
              <React.Fragment key={child.id}>
                <CollapsibleOutline
                  chapter={child}
                  handleVideoClick={handleVideoClick}
                  handleQuizClick={handleQuizClick}
                  index={idx}
                  arrLength={arr.length}
                />
                <GreenDivider />
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AccordionNavigation;
