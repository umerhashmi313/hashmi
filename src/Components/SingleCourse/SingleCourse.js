import * as React from 'react';
import { useState , useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import NotesIcon from '@mui/icons-material/Notes';
import QuizIcon from '@mui/icons-material/Quiz';
import { Collapse, List, ListItem, ListItemText, Box, Divider, ListItemIcon } from "@mui/material";
import { styled } from '@mui/material/styles';
import FolderIcon from "@mui/icons-material/Folder"; // Example icon, replace as needed
import { useNavigate } from "react-router-dom";

const BlackDivider = styled(Divider)(({ theme }) => ({
    background: 'black',
    height: '0.1px',
    margin: theme.spacing(1, 0),
    boxShadow: '0 2px 4px rgba(255, 255, 255, 0.79)',
    
}));



export default function AccordionUsage({ courseData , quizId}) {
    const [activeIndex, setActiveIndex] = useState(null); // Lifted state up
    const navigate = useNavigate();
    console.log("courseData:", courseData); // Debugging
    const handleQuizClick = () => {
        // Redirect to /dashboard and pass the quizId via state (or you can use query params)
        navigate("/dashboard", { state: { quizId } });
      };
    
  
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          borderRadius: 8,
          flexDirection: "column",
          "& .MuiAccordion-root": { margin: 0 },
        }}
      >
        <Accordion
          sx={{
            backgroundColor: "#063565",
            ":last-child": { borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" },
            ":first-child": { borderTopRightRadius: "8px", borderTopLeftRadius: "8px" },
          }}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* ✅ Fixing subjects display */}
              <Typography sx={{ color: "white" }}>
                {courseData.subjects?.[0]?.name || "No Subject"}
              </Typography>
            </Box>
          </AccordionSummary>
                    {/* {quarter.chapters.length > 0 && ( */}
                        <AccordionDetails sx={{
                            display: 'flex',
                            backgroundColor: '#EEF0F2',
                            flexDirection: 'column',
                            gap: '8px',
                            py: '16px',
                            borderLeft: '4px solid black'
                        }}>
                            {/* {quarter.chapters.map((chapter, cIndex) => ( */}
                                <Box >
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <PlayCircleFilledIcon />
                                        {courseData.direct_content.videos?.[0]?.title || "No Subject"}
                                    </Typography>
                                    <BlackDivider />
                                    <CollapsibleOutline chapter={courseData.sections?.[0]} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                                    <BlackDivider />
                                    <Box onClick={handleQuizClick} sx={{ cursor: "pointer" }}>
              <Typography sx={{ display: 'flex', gap: '8px' }}>
                <QuizIcon /> {courseData.direct_content.quizzes?.[0]?.title || "No Subject"}
              </Typography>
            </Box>
                                    <BlackDivider />
                                    <Typography sx={{ display: 'flex', gap: '8px' }}>
                                    <NotesIcon />{courseData.direct_content.readingMaterial?.[0]?.title || "No Notes"}
                                    </Typography>
                                </Box>
                        
                        </AccordionDetails>
                    
                </Accordion>
            
        </Box>
    );
}

const CollapsibleOutline = ({ chapter, activeIndex, setActiveIndex }) => {
    const [open, setOpen] = useState(false);

    return (
       <Box>
            <Typography
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}
                onClick={() => setOpen(!open)}
            >
                <ExpandMoreIcon sx={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
                {chapter?.title || "Untitled Section"} {/* Handle undefined title */}
            </Typography>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    {(chapter?.sub_sections || []).map((subsection, index) => {  // Ensure subsections is an array
                        const isActive = activeIndex === index;

                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '4px',
                                    position: 'relative',
                                    pl: '32px',
                                    cursor: 'pointer',
                                    color: isActive ? '#FFFFFF' : '#A0A0A0',
                                    backgroundColor: isActive ? '#28527A' : 'transparent',
                                    borderRadius: '6px',
                                    transition: 'all 0.2s ease-in-out',
                                    '&::before': chapter?.subsections?.length > 1 ? { // Only show when multiple subsections exist
                                        content: '""',
                                        position: 'absolute',
                                        left: '18px',
                                        top: index === 0 ? '45%' : 0,
                                        bottom: index === chapter.subsections.length - 1 ? '50%' : 0,
                                        width: '2px',
                                        backgroundColor: '#78BBFF',
                                        opacity: '40%',
                                    } : {},
                                }}
                                onClick={() => setActiveIndex(index)}
                            >
                                {/* Step Icon (Dot) */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '38%',
                                        width: isActive ? '12px' : '10px',
                                        height: isActive ? '12px' : '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#78BBFF',
                                        opacity: 1,
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                />

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ListItemIcon sx={{ minWidth: 'unset', color: isActive ? '#FFFFFF' : '#A0A0A0' }}>
                                        {subsection?.icon || <FolderIcon />} {/* Default icon */}
                                    </ListItemIcon>
                                    <ListItemText primary={subsection?.title || "Untitled Subsection"} />
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </Box>
    );
};