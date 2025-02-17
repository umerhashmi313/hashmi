import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, Button, Grid, Checkbox } from "@mui/material";
import neuronImage from '../../Assets/neuron.jpg';
import { PrimaryButton, SecondaryButton } from '../Buttons/Buttons'
import TourIcon from '@mui/icons-material/Tour';
import GradeSharpIcon from '@mui/icons-material/GradeSharp';
import Switch from '@mui/material/Switch';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function QuizHeader({ questions, currentQuestionIndex, onNext, onBack, onQuestionClick, onOptionSelect }) {
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  const [timeLeft, setTimeLeft] = useState(900);
  const boxRefs = useRef([]);
  const containerRef = useRef();
  const [checkedStates, setCheckedStates] = useState({});
  const [isReviewMode, setIsReviewMode] = useState(false);
  

  //   console.log("Current Question:", questions[currentQuestionIndex]);
  // console.log("Options:", questions[currentQuestionIndex]?.options);


  const handleCheckboxChange = (optionIndex, optionValue ) => {
    const updatedCheckedStates = {};
  
    // Mark only the selected option as checked
    updatedCheckedStates[`${currentQuestionIndex}-${optionIndex}`] = true;
  
    setCheckedStates(updatedCheckedStates);
    console.log(optionValue);
    onOptionSelect(optionValue);
  };
  
  const handleNext = () => {
    // Check if the current question has an answer
    const isAnswered = Object.keys(checkedStates).some(key => 
      key.startsWith(`${currentQuestionIndex}-`)
    );
  
    if (isAnswered && !solvedQuestions.includes(currentQuestionIndex)) {
      setSolvedQuestions([...solvedQuestions, currentQuestionIndex]);
    }
  
    onNext(); // Move to the next question
  };
  


  const handleReviewToggle = () => {
    setIsReviewMode((prev) => !prev);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleBoxClick = (index) => {
    onQuestionClick(index);
  };

  const markAsSolved = () => {
    if (!solvedQuestions.includes(currentQuestionIndex)) {
      setSolvedQuestions([...solvedQuestions, currentQuestionIndex]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getBoxCenter = (index) => {
    if (boxRefs.current[index] && containerRef.current) {
      const box = boxRefs.current[index].getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      return {
        x: box.left - container.left + box.width / 2,
        y: box.top - container.top + box.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  const hasImageOptions = Array.isArray(questions[currentQuestionIndex]?.options) &&
    questions[currentQuestionIndex]?.options.some(
      option => typeof option === 'string' && option.match(/\.jpg|\.png|\.jpeg/)
    );


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
      width: '100%',
      padding: { xs: '0px', sm: '16px' }
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "686px", // Sets the maximum width of the box
        width: { xs: "100%", sm: "calc(100%)" }, // Adjust width for smaller screens
        backgroundColor: "white",
        zIndex: 1,
        padding: '16px',
        boxSizing: 'border-box',
        gap: '16px',
        position: { xs: 'fixed', sm: 'initial' },
        top: { xs: '60px', sm: 'initial' }
      }}>
        <Box sx={{ display: "flex", mt: '5px' }}>
          <Typography sx={{ fontSize: '12px', color: 'black', fontWeight: '900', lineHeight: '12px' }}>MODULE 1 > CHAPTER > QUIZ</Typography>
        </Box>

        <Box ref={containerRef} sx={{ display: "flex", gap: '8px', flexWrap: "wrap", justifyContent: "start", position: "relative", marginTop: '6px' }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {questions.slice(0, -1).map((_, index) => {
              const start = getBoxCenter(index);
              const end = getBoxCenter(index + 1);
              return (
                <line key={index} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#31CEB8" strokeWidth="1px" />
              );
            })}
          </svg>

          {questions.map((_, index) => {
  
  return (
    <Button 
      key={index} 
      onClick={() => handleBoxClick(index)} 
      ref={(el) => (boxRefs.current[index] = el)}
      sx={{
        width: '24px', minWidth: 0, height: '24px', boxShadow: 'none', fontWeight: '800',
        border: currentQuestionIndex === index ? 'none' : '1px solid lightgrey', padding: '0',
        fontSize: solvedQuestions.includes(index) ? "15px" : currentQuestionIndex === index ? "17px" : "17px",
        backgroundColor: solvedQuestions.includes(index) ? "#4CAF50" : 
                        currentQuestionIndex === index ? "black" : 'white',
                    
        color: solvedQuestions.includes(index) || currentQuestionIndex === index ? "#fff" : "#B5B6B8",
        "&:hover": { backgroundColor: solvedQuestions.includes(index) ? "#45a049" : currentQuestionIndex === index ? "#black" : "#ccc" },
        transition: "background-color 0.3s", zIndex: 1,
      }}>
      {index + 1}
    </Button>
  );
})}

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ flex: 1, fontSize: '16px', fontWeight: '500' }}>Solved: {solvedQuestions.length}/{questions.length}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <AccessTimeIcon sx={{ height: '24px' }} />
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>{formatTime(timeLeft)}</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: 3,
          backgroundColor: isReviewMode ? 'yellow' : 'white',
          gap: '32px',
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '94%', sm: '100%' }, // Use 100% width to fill the parent container
          maxWidth: '686px', // Set a maximum width for larger screens
          margin: '0 auto', // Center the box horizontally
        }}
      >
        <Box sx={{ gap: '16px' }}>
          <Box
            sx={{
              display: 'flex',
              marginBottom: '15px',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontWeight: '600', fontSize: '14px' }}>Report</Typography>
              <TourIcon sx={{ color: '#E1004D' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GradeSharpIcon sx={{ height: '21px', color: 'yellow' }} />
              <Typography sx={{ fontWeight: '800', fontSize: '18px' }}>·</Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '14px' }}>Review<Switch checked={isReviewMode} onChange={handleReviewToggle} sx={{

              }} /></Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: questions[currentQuestionIndex]?.image ? { xs: 'column-reverse', sm: 'row' } : 'column',
              gap: '16px',
              width: '100%',
              mb: 2,
            }}
          >
            {questions[currentQuestionIndex]?.image && (
              <Box sx={{ width: '100%', height: '100%' }}>
                <Box
                  component="img"
                  src={questions[currentQuestionIndex]?.image}
                  alt="Question illustration"
                  sx={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '192px',
                    boxShadow: 5,
                    boxSizing: 'border-box',
                    objectFit: 'cover',
                    borderRadius: 3,
                    display: 'block',
                    border: '1px solid lightgrey',
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{
                  lineHeight: 1.5,
                  width: '100%',
                  color: '#7F8184',
                  textAlign: 'left',
                }}
              >
                {questions[currentQuestionIndex]?.text}
              </Typography>
            </Box>
          </Box>


          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={1}
            >
              {questions[currentQuestionIndex]?.options.map((option, index) => {
                const optionText = option.text || option; // Extract `text` if `option` is an object

                //  console.log(optionText)



                const isImageOption = typeof option === 'string' && option.match(/\.jpg|\.png|\.jpeg/);
                return (
                  <Grid item xs={isImageOption ? 6 : 12} key={index} >



                    <Paper
                      sx={{
                        width: isImageOption ? '300px' : '100%',
                        height: isImageOption ? '225px' : '44px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: isImageOption ? 'column' : 'row',
                        borderRadius: '10px',
                        boxShadow: 'none',
                        alignItems: 'center',
                        bgcolor: checkedStates[`${currentQuestionIndex}-${index}`] ? '#31CEB8' : '#EAFAF8',
                        border: '.5px solid #E6EBF0',
                        color: checkedStates[`${currentQuestionIndex}-${index}`] ? '#021C33' : '#56585C',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onClick={(e) => {
                        if (e.target.type !== 'checkbox') {
                          handleCheckboxChange(index, option );
                        }
                      }}

                    >
                      <Checkbox
                        checked={!!checkedStates[`${currentQuestionIndex}-${index}`]}
                        onChange={() => handleCheckboxChange(index, option)}
                        sx={{
                          '&.Mui-checked': { color: '#15574D' },
                        }}
                      />
                      {isImageOption ? (
                        <Box
                          component="img"
                          src={option}
                          alt="Option image"
                          sx={{
                            width: '270px',
                            height: '173px',
                            borderRadius: 2,
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Typography
                          sx={{
                            color: checkedStates[`${currentQuestionIndex}-${index}`] ? 'black' : '#56585C',
                            fontSize: '16px',
                            fontWeight: '400',
                          }}
                        >
                          {optionText}
                        </Typography>
                      )}
                    </Paper>



                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', mt: { sm: 0, xs: '20%' } }}>
          <SecondaryButton variant="contained" onClick={onBack}>Back</SecondaryButton>
          <PrimaryButton variant="contained" onClick={handleNext}>Next</PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
}

export default QuizHeader;