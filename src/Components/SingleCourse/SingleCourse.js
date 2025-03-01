import * as React from 'react';
import { useState } from "react";
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
  ListItemIcon
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import QuizIcon from '@mui/icons-material/Quiz';
import NotesIcon from '@mui/icons-material/Notes';
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const BlackDivider = styled(Divider)(({ theme }) => ({
  background: 'black',
  height: '0.1px',
  margin: theme.spacing(1, 0),
  boxShadow: '0 2px 4px rgba(255, 255, 255, 0.79)',
}));

/**
 * This component recursively renders nested sections (chapters, etc.) and final content (video, quiz).
 * For final content list items, the vertical connector line is modified so that it starts at the dot
 * on the first item and ends at the dot on the last item.
 */
const CollapsibleOutline = ({
  chapter,        // A single node from ordered_content (could be a section or final content)
  activeIndex,
  setActiveIndex,
  handleVideoClick,
  handleQuizClick
}) => {
  const [open, setOpen] = useState(false);
  const children = chapter?.ordered_content || [];
  const hasChildren = children.length > 0;
  const isSection = chapter.type === "section";

  return (
    <Box sx={{ ml: isSection ? 2 : 0, mt: 1 }}>
      {/* Render section/chapter names */}
      {isSection && (
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: hasChildren ? 'pointer' : 'default',
            gap: '8px',
          }}
          onClick={() => {
            if (hasChildren) {
              setOpen(!open);
            }
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
      )}

      {/* If there are children, collapse them */}
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {children.map((child, index, arr) => {
              // For nested sections, recurse
              if (child.type === "section") {
                return (
                  <CollapsibleOutline
                    key={child.id}
                    chapter={child}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    handleVideoClick={handleVideoClick}
                    handleQuizClick={handleQuizClick}
                  />
                );
              } else {
                // Final content items (video/quiz/reading, etc.)
                const isActive = activeIndex === index;
                const isFirst = index === 0;
                const isLast = index === arr.length - 1;
                return (
                  <ListItem
                    key={child.id}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px',
                      pl: '32px',
                      cursor: 'pointer',
                      color: isActive ? '#FFFFFF' : '#A0A0A0',
                      backgroundColor: isActive ? '#28527A' : 'transparent',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => {
                      setActiveIndex(index);
                      if (child.type === "video") {
                        handleVideoClick?.(child);
                      } else if (child.type === "quiz") {
                        handleQuizClick?.(child);
                      }
                    }}
                  >
                    {/* Connector Line: adjust top and bottom so it does not extend beyond the dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '18px',
                        // For the first item, start at the dot’s center.
                        // For the last, end at the dot’s center.
                        top: isFirst ? 'calc(38% + 5px)' : 0,
                        bottom: isLast ? 'calc(100% - (38% + 5px))' : 0,
                        width: '2px',
                        backgroundColor: '#78BBFF',
                        zIndex: 0,
                      }}
                    />
                    
                    {/* Dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '14px',
                        top: '38%',
                        width: isActive ? '12px' : '10px',
                        height: isActive ? '12px' : '10px',
                        borderRadius: '50%',
                        backgroundColor: '#78BBFF',
                        zIndex: 1,
                        transition: 'all 0.2s ease-in-out',
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ListItemIcon
                        sx={{ minWidth: 'unset', color: isActive ? '#FFFFFF' : '#A0A0A0' }}
                      >
                        {child.type === 'video' ? (
                          <PlayCircleFilledIcon />
                        ) : child.type === 'quiz' ? (
                          <QuizIcon />
                        ) : (
                          <FolderIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={child.name || "Untitled"} />
                    </Box>
                  </ListItem>
                );
              }
            })}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

export default function AccordionUsage({ courseData }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleQuizClick = (quiz) => {
    navigate("/dashboard", { state: { quizId: quiz.id } });
  };

  const handleVideoClick = (video) => {
    navigate("/videopage", { state: { video } });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
      }}
    >
      {/* Create a separate accordion for each top-level quarter */}
      {courseData.sections?.[0]?.ordered_content?.map((quarter) => (
        <Accordion
          key={quarter.id}
          sx={{
            backgroundColor: "#063565",
            color: "white",
            ":last-child": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
            ":first-child": {
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
            },
          }}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
            <Typography>{quarter.name}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              color: "black",
              backgroundColor: "#EEF0F2",
              flexDirection: "column",
              borderLeft: "4px solid black",
            }}
          >
            {quarter.ordered_content?.map((child) => (
              <React.Fragment key={child.id}>
                <CollapsibleOutline
                  chapter={child}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  handleVideoClick={handleVideoClick}
                  handleQuizClick={handleQuizClick}
                />
                <BlackDivider />
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
