import * as React from 'react';
import { useState } from "react";
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

const BlackDivider = styled(Divider)(({ theme }) => ({
    background: 'black',
    height: '0.1px',
    margin: theme.spacing(1, 0),
    boxShadow: '0 2px 4px rgba(255, 255, 255, 0.79)',
}));

const courseContent = [
    {
        title: "Quarter 1 Outline",
        chapters: [
            {
                title: "Chapter 1",
                introVideo: "Chapter 1 Intro Video",
                materials: [
                    { icon: <PlayCircleFilledIcon />, title: "Topic 1 Video", duration: "20 Minutes" },
                    { icon: <NotesIcon />, title: "Topic 1 Notes", duration: "15 Minutes" },
                    { icon: <QuizIcon />, title: "Topic 1 Quiz", duration: "10 Minutes" },
                ]
            }
        ]
    },
    { title: "Quarter 2 Outline", chapters: [] },
    { title: "First Half Book Quiz", chapters: [], icon: <QuizIcon /> },
    { title: "Quarter 3 Outline", chapters: [] },
    { title: "Quarter 4 Outline", chapters: [] },
    { title: "Second Half Book Quiz", chapters: [], icon: <QuizIcon /> }
];

export default function AccordionUsage() {
    const [activeIndex, setActiveIndex] = useState(null); // Lifted state up

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            borderRadius: 8,
            flexDirection: 'column',
            '& .MuiAccordion-root': { margin: 0 },
        }}>
            {courseContent.map((quarter, qIndex) => (
                <Accordion key={qIndex} sx={{
                    backgroundColor: '#063565',
                    ":last-child": { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' },
                    ":first-child": { borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }
                }} disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {quarter.icon && <Box sx={{ color: 'white' }}>{quarter.icon}</Box>}
                            <Typography sx={{ color: 'white' }}>{quarter.title}</Typography>
                        </Box>
                    </AccordionSummary>
                    {quarter.chapters.length > 0 && (
                        <AccordionDetails sx={{
                            display: 'flex',
                            backgroundColor: '#EEF0F2',
                            flexDirection: 'column',
                            gap: '8px',
                            py: '16px',
                            borderLeft: '4px solid black'
                        }}>
                            {quarter.chapters.map((chapter, cIndex) => (
                                <Box key={cIndex}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <PlayCircleFilledIcon />
                                        {chapter.introVideo}
                                    </Typography>
                                    <BlackDivider />
                                    <CollapsibleOutline chapter={chapter} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                                    <BlackDivider />
                                    <Typography sx={{ display: 'flex', gap: '8px' }}>
                                        <NotesIcon /> Chapter 1 Notes
                                    </Typography>
                                    <BlackDivider />
                                    <Typography sx={{ display: 'flex', gap: '8px' }}>
                                        <QuizIcon /> Chapter 1 Quiz
                                    </Typography>
                                </Box>
                            ))}
                        </AccordionDetails>
                    )}
                </Accordion>
            ))}
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
                Chapter 1 Outline
            </Typography>
    
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    {chapter.materials.map((topic, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '4px',
                                    position: 'relative',
                                    pl: '32px',
                                    cursor: 'pointer',
                                    color: isActive ? '#FFFFFF' : '#A0A0A0',
                                    backgroundColor: isActive ? '#28527A' : 'transparent',
                                    borderRadius: '6px',
                                    transition: 'all 0.2s ease-in-out',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        left: '18px',
                                        top: index === 0 ? '45%' : 0,
                                        bottom: index === chapter.materials.length - 1 ? '50%' : 0,
                                        width: '2px',
                                        backgroundColor: '#78BBFF',
                                        opacity: '40%',
                                    }
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
                                        {topic.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={topic.title} />
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <ListItemText primary={topic.duration} />
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </Box>
    );
};
