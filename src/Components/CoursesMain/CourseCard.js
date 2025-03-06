import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  Box,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibrary";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/Quiz";

/*
  If you have a real image to display (the banner with two women, for instance),
  import it or use a URL, e.g.:
  import bannerImage from "../assets/ehshaBanner.png";
*/
function truncateCourseName(name = "", maxWords = 2) {
  const words = name.split(" ");
  if (words.length <= maxWords) return name;
  return words.slice(0, maxWords).join(" ") + "...";
}

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/singlecourse`, { state: { courseId: course.id } });
  }, [navigate, course.id]);

  return (
    <Card
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: {sm:'row', xs:'column'},
        borderRadius: 3,
        boxShadow: 6,
       
        height:{sm:'202px',xs:'fit-content'},
        justifyContent:'center',
        alignItems:'center',
        width:{xs:'100%' , sm:'590px'},
        // width:'fit-content',
        cursor: "pointer",
        marginBottom: "16px",
        overflow: "hidden",
    
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 8,
        },
      }}
    >
      {/* Left "banner" area */}
      <Box sx={{
      width: {sm:'330px', xs:'100%'} ,
      height:'fit-content',
       p:{sm:'8px'},
       pl:{xs:'16px'},
       pt:{xs:'8px'},
       alignItems:'center',
       justifyContent:'center',
      }}>
      <Box
        sx={{
          position: "relative",
        width:{sm:'310px' , xs:'95%'},
          height: "180px",
          background: "linear-gradient(180deg, #0FAFAD 0%, #0B7978 100%)",
          borderRadius:3
          // If you have an actual banner image, you can do:
          // backgroundImage: `url(${bannerImage})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >
      </Box>
      </Box>

      {/* Right content area */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          // gap:'8px',
          padding: "16px",
          width: "100%",
          alignItems:'center',
          justifyContent:{sm:'space-between', xs: 'center'},
          gap:'32px',
          px:'16px'
        }}
      >
        {/* Top info: Category chip, course name, created by, price */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Chip
            label={course.category || "NMDCAT"}
            sx={{
              backgroundColor: "#31CEB8",
              color: "#FFF",
              height: "20px",
              width: "fit-content",
              fontSize: "0.75rem",
            
            }}
          />

          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
          {truncateCourseName(course.name) || "Course Name"}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "12px" }}>
            Created by <strong>{course.created_by || "Unknown"}</strong>
          </Typography>

          <Typography variant="h6" sx={{ fontSize: "16px" , fontWeight: "500" }}>
            Rs. {course.price || "3000"}
          </Typography>
        </Box>

        {/* Bottom row: stats (quiz, videos, notes) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent:'center',
            gap:'8px'
          }}
        >
          {/* Quiz */}
          <Box sx={{ display: "flex",  alignItems: "center", gap: "4px" }}>
            <QuizOutlinedIcon fontSize="small" sx={{color:"#31CEB8"}} />
            <Typography variant="body2" sx={{ fontSize: "8px",fontWeight:'400' ,lineHeight:'auto' ,color:"#31CEB8" }}>
              {course.totalQuiz || 0}/19 Quiz
            </Typography>
          </Box>

          {/* Videos */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <VideoLibraryOutlinedIcon fontSize="small" sx={{color:"#31CEB8"}} />
            <Typography variant="body2" sx={{ fontSize: "8px" , fontWeight:'400' ,lineHeight:'auto' ,color:"#31CEB8"}}>
              {course.totalVideos || 0}/19 videos
            </Typography>
          </Box>

          {/* Notes */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ImportContactsOutlinedIcon fontSize="small" sx={{color:"#31CEB8"}}/>
            <Typography variant="body2" sx={{ fontSize: "8px",fontWeight:'400' ,lineHeight:'auto', color:"#31CEB8" }}>
              {course.totalNotes || 0}/19 Notes
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default React.memo(CourseCard);
