import React, { useState } from "react";
import {
  Box,
  Typography,
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
import { useQuery } from "react-query";

// Styled dividers similar to previous versions.
const BlackDivider = styled(Divider)(({ theme }) => ({
  background: "black",
  height: "0.1px",
  margin: theme.spacing(1, 0),
  boxShadow: "0 2px 4px rgba(255, 255, 255, 0.79)",
}));

const GreenDivider = styled(Divider)(({ theme }) => ({
  background: "linear-gradient(to right, transparent,#239283, transparent)",
  height: "1px",
  margin: theme.spacing(1, 2),
}));

/**
 * Recursively renders a chapter (section or final content).
 * For sections, clicking the header toggles the collapse of its nested content.
 */
const CollapsibleOutline = ({
  chapter,
  handleVideoClick,
  handleQuizClick,
  index,
  arrLength,
  selectedItemId,
  setSelectedItemId,
}) => {
  // For sections, use an open state to toggle nested content.
  const [open, setOpen] = useState(false);
  const children = chapter?.ordered_content || [];
  const hasChildren = children.length > 0;
  const isSection = chapter.type === "section";

  if (!isSection) {
    // Final content (video, quiz, etc.)
    const isFirst = typeof index === "number" && index === 0;
    const isLast =
      typeof index === "number" &&
      typeof arrLength === "number" &&
      index === arrLength - 1;

    // Determine if this item is the active (selected) one.
    const isActive = chapter.id === selectedItemId;

    return (
      <ListItem
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          pl: "32px",
          cursor: "pointer",
        }}
        onClick={() => {
          // Set this item as active.
          setSelectedItemId(chapter.id);
          if (chapter.type === "video") {
            handleVideoClick?.(chapter);
          } else if (chapter.type === "quiz") {
            handleQuizClick?.(chapter);
          }
        }}
      >
        {/* Connector line */}
        <Box
          sx={{
            position: "absolute",
            left: "20px",
            top: isFirst ? "calc(38% + 5px)" : 0,
            bottom: isLast ? "calc(100% - (38% + 5px))" : 0,
            width: "1px",
            backgroundColor: "#78BBFF",
            zIndex: 0,
          }}
        />
        {/* Dot */}
        <Box
          sx={{
            position: "absolute",
            left: "14px",
            top: "33%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: isActive ? "#31CEB8" : "#15574D",
            zIndex: 1,
          }}
        />
        <ListItemIcon
          sx={{
            minWidth: "unset",
            mr: 1,
            ml: 1,
            color: isActive ? "white" : "#8F9091",
            fontSize: "16px",
          }}
        >
          {chapter.type === "video" ? (
            <PlayCircleFilledIcon sx={{ fontSize: "16px" }} />
          ) : chapter.type === "quiz" ? (
            <QuizIcon sx={{ fontSize: "16px" }} />
          ) : (
            <FolderIcon sx={{ fontSize: "16px" }} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={chapter.name || "Untitled"}
          primaryTypographyProps={{
            sx: { fontSize: "12px", color: isActive ? "white" : "#8F9091" },
          }}
        />
      </ListItem>
    );
  }

  // For sections: clicking the header toggles the collapse of its children.
  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        onClick={() => hasChildren && setOpen((prev) => !prev)}
        sx={{
          display: "flex",
          fontSize: "16px",
          lineHeight: "140%",
          fontWeight: "500",
          alignItems: "center",
          cursor: hasChildren ? "pointer" : "default",
          gap: "8px",
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
          <Box>
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
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                  />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

/**
 * Renders the header for a quarter.
 */
const QuarterHeaderBox = ({ quarter, isSelected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: isSelected ? "#239283" : "transparent",
        color: "white",
        width: "80%",
        minHeight: "32px",
        border: "3px solid #239283",
        boxShadow: "0 0 7px 0 #239283",
        margin: "8px 0",
        borderRadius: "8px",
        cursor: "pointer",
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{ fontSize: "18px", fontWeight: "500", lineHeight: "140%" }}
      >
        {quarter.name}
      </Typography>
      <ExpandMoreIcon
        sx={{
          color: "white",
          transform: isSelected ? "rotate(180deg)" : "rotate(0deg)",
          transition: "0.3s",
        }}
      />
    </Box>
  );
};

/**
 * Renders the chapter content for a quarter inside its own box.
 * The nested chapters inside this box are collapsible.
 */
const ChapterBox = ({
  quarter,
  handleVideoClick,
  handleQuizClick,
  selectedItemId,
  setSelectedItemId,
}) => {
  return (
    <Box
      sx={{
        width: "87%",
        backgroundColor: "#03162A",
        color: "white",
        borderTop: "none",
        borderBottom: "3px solid #239283",
        borderRadius: "12px",
        px: 1,
        py: 1,
        mt: "-2",
        position: "relative",
        transition: "all 0.5s ease",
        overflow: "hidden", // ensures the gradient doesn't spill outside the box

        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          background: "linear-gradient(to top, #239283, transparent)",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          background: "linear-gradient(to top, #239283, transparent)",
          zIndex: 1,
        },
      }}
    >
      <List disablePadding>
        {quarter.ordered_content?.map((child, idx, arr) => (
          <React.Fragment key={child.id}>
            <CollapsibleOutline
              chapter={child}
              handleVideoClick={handleVideoClick}
              handleQuizClick={handleQuizClick}
              index={idx}
              arrLength={arr.length}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
            />
            <GreenDivider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

/**
 * Combines the quarter header and its chapter content.
 * When the header is clicked, the chapter content appears directly below that header.
 */
const QuarterAccordion = ({
  quarter,
  handleVideoClick,
  handleQuizClick,
  selectedItemId,
  setSelectedItemId,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <QuarterHeaderBox
        quarter={quarter}
        isSelected={open}
        onClick={() => setOpen((prev) => !prev)}
      />
      <Collapse in={open} timeout={600}>
        <ChapterBox
          quarter={quarter}
          handleVideoClick={handleVideoClick}
          handleQuizClick={handleQuizClick}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
      </Collapse>
    </Box>
  );
};

const AccordionNavigation = ({ selectedCourseId }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  // React Query: Fetch course data
  const fetchCourseData = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No auth token found.");
    }
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
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data[0];
  };

  const { data: courseData, isLoading, error } = useQuery(
    ["courseData", selectedCourseId],
    fetchCourseData
  );

  if (isLoading) return <CircularProgress />;
  if (error || !courseData)
    return <Typography>Error loading course data.</Typography>;

  // Adjust based on your data structure.
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
        overflowX: "hidden",
        overflowY: "scroll",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        px: "8px",
        "&::-webkit-scrollbar": {
          width: "12px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "red",
          borderRadius: "6px",
        },
      }}
    >
      {topLevelContent.map((quarter) => (
        <QuarterAccordion
          key={quarter.id}
          quarter={quarter}
          handleVideoClick={handleVideoClick}
          handleQuizClick={handleQuizClick}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
      ))}
    </Box>
  );
};

export default AccordionNavigation;
