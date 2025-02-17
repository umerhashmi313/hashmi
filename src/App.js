import React, { useState } from 'react';
import { Box } from '@mui/material';
import {  Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import Sidebar2 from './Components/Sidebar2/Sidebar2';
import ScholarShipCard from './Components/Dashboard/Dashboard';
import TopQuestions from './Components/Quiz/Quiz';
import Nav from './Components/MobileNav/Nav';
import Videopage from './Components/Videopage/Videopage';
import Notespage from './Components/Notes/Notes'
import Courses from './Components/Courses/Courses';
import zIndex from '@mui/material/styles/zIndex';
import Login from './Components/Login/Login';
import ScholarshipCard from './Components/Dashboard/Dashboard';
import CoursesMain from './Components/CoursesMain/CourseCard';
import CourseList from './Components/CoursesMain/CourseDashboard';
import SingleCourse from './Components/SingleCourse/SingleCourse';
import CourseCard from './Components/CoursesMain/CourseCard';
import SingleCourseCard from './Components/SingleCourse/SingleCourseDesk';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes';


export default function App({onLogout}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = sidebarOpen ? 240 : 72;
  const headerHeight = 64;



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    
      <Box sx={{ display: 'flex' }}>

        {/* Sidebar */}
        <Box sx={{
          position: 'fixed', // Changed from relative
          top: 0,
          left: 0,
          zIndex: 1200, // Ensure sidebar stays above other content
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          transition: 'width 0.3s ease',
        }}>
          <Sidebar2 onLogout={onLogout} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </Box>

        {/* Main Content Area */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh',
          overflow: 'auto',
          marginLeft: { xs: 0, sm: sidebarOpen ? '235px' : '60px' }, // Match the sidebar width
        }}>
          {/* Header */}
          <Box sx={{
            height: headerHeight,
            display: { xs: 'none', sm: 'flex' },
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'background.paper',
            width: '100%'
          }}>
            <Header />
          </Box>

          <Box sx={{
            display: { xs: 'flex', sm: 'none' },
            height: '248px',
            width: '100%',
            flexShrink: 0,
            backgroundColor: '#03162A',
            position: 'fixed',
            zIndex: 0,
          }}>
          </Box>

          <Box sx={{
            display: { xs: 'flex', sm: 'none' },
            height: '60px',
            width: '100%',
            flexShrink: 0,
            backgroundColor: '#03162A',
            position: 'fixed',
            zIndex: 2,
          }}>
            <Nav/>
          </Box>

          

          {/* Scrollable Content */}
          <Box sx={{
            flex: 1,
            backgroundColor: '#f5f6fa',
            overflowY: 'auto',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}>
            {/* Content Container with Margin Top */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>

              {/* Left Card (66%) */}
              <Box sx={{
                // flex: '0 0 66%',
                // maxWidth: '66%',
                // This will be activated when i have more than two components in a page then this will get 66% and remaining will get 34%

                minWidth: 0,
                display: { xs: 'none', sm: 'flex' },
                gap: '8px',
                padding: '16px'
              }}>
                
                  
                <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/Dashboard" element={<ProtectedRoute element={<ScholarshipCard/>} />} />
        <Route path="/courses" element={<ProtectedRoute element={<CourseList />} />} />
        <Route path="/questions" element={<ProtectedRoute element={<TopQuestions />} />} />
        <Route path="/coursesDetail" element={<ProtectedRoute element={<Courses />} />} />
        <Route path="/videopage" element={<ProtectedRoute element={<Videopage />} />} />
        <Route path="/notes" element={<ProtectedRoute element={<Notespage />} />} />
        <Route path="/SingleCourse" element={<ProtectedRoute element={<SingleCourseCard />} />} />
      </Routes>
              </Box>

              {/* Mobile View */}
              <Box sx={{
                display: { xs: 'flex', sm: 'none' },
                width: '100%',
                position: 'absolute',
                overflowX: 'hidden',
                top: '220px'
              }}>
               <Routes>
               <Route path="/Dashboard" element={<ProtectedRoute element={<ScholarShipCard />} />} />
               <Route path="/questions" element={<ProtectedRoute element={<TopQuestions />} />} />
                  
                </Routes>
              </Box>
              <Box sx={{
                display: { xs: 'flex', sm: 'none' },
                width: '95%',
                position: 'absolute',
                overflowX: 'hidden',
                top: '65px'
              }}>
               <Routes>
               <Route path="/courses" element={<ProtectedRoute element={<CourseList />} />} />
               <Route path="/videopage" element={<ProtectedRoute element={<Videopage />} />} />
        <Route path="/notes" element={<ProtectedRoute element={<Notespage />} />} />
        <Route path="/SingleCourse" element={<ProtectedRoute element={<SingleCourseCard />} />} />
                </Routes>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
 
  );
}
