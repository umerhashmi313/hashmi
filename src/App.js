import React, { useState, useCallback, Suspense } from 'react';
import { Box } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import Sidebar2 from './Components/Sidebar2/Sidebar2';
import Nav from './Components/MobileNav/Nav';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import QuizHeader from './Components/Quiz/QuizHeaderSolved';

// Lazy load route components for improved initial load time.
const ScholarshipCard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const CourseList = React.lazy(() => import('./Components/CoursesMain/CourseDashboard'));
const TopQuestions = React.lazy(() => import('./Components/Quiz/Quiz'));
const Courses = React.lazy(() => import('./Components/Courses/Courses'));
const Videopage = React.lazy(() => import('./Components/Videopage/Videopage'));
const Notespage = React.lazy(() => import('./Components/Notes/Notes'));
const SingleCourseCard = React.lazy(() => import('./Components/SingleCourse/SingleCourseDesk'));

export default function App({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerHeight = 64;
  
  const [courseData, setCourseData] = useState(null);

  // Memoize the toggle function to avoid unnecessary re-renders.
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const location = useLocation();
  const showSidebar2 = ['/questions', '/quiz' , '/videopage'].includes(location.pathname.toLowerCase());

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1200,
          display: { xs: 'none', sm: 'flex' },
          flexShrink: 0,
          transition: 'width 0.3s ease',
        
          // minWidth: 'fit-content'
        }}
      >
        {showSidebar2 ? (
          <Sidebar2 onLogout={onLogout} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} 
          courseData={courseData}   // Passing the course ID
          />
        ) : (
          <Sidebar onLogout={onLogout} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh',
          overflow: 'auto',
          marginLeft: { xs: 0, sm: sidebarOpen ? '235px' : '60px' },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: headerHeight,
            display: { xs: 'none', sm: 'flex' },
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'background.paper',
            width: '100%',
          }}
        >
          <Header onLogout={onLogout} />
        </Box>

        {/* Mobile Header Sections */}
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            height: '248px',
            width: '100%',
            flexShrink: 0,
            backgroundColor: '#03162A',
            position: 'fixed',
            zIndex: 0,
          }}
        ></Box>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            height: '60px',
            width: '100%',
            flexShrink: 0,
            backgroundColor: '#03162A',
            position: 'fixed',
            zIndex: 2,
          }}
        >
          <Nav onLogout={onLogout} />
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f5f6fa',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Suspense fallback={<div>Loading...</div>}>
              {/* Left Card (66%) */}
              <Box
                sx={{
                  minWidth: 0,
                  display: { xs: 'none', sm: 'flex' },
                  gap: '8px',
                  padding: '16px',
                 ml:'40px',
                  mt:'-120px'
                }}
              >
                   <Routes>
                   <Route path="/quiz" element={<ProtectedRoute element={<ScholarshipCard  />} />} />
                  </Routes>
                 </Box>
              <Box
                sx={{
                  minWidth: 0,
                  display: { xs: 'none', sm: 'flex' },
                  gap: '8px',
                  padding: '16px',
             
                }}
              >
                <Routes>
          
                  <Route path="/dashboard"  element={<ProtectedRoute element={<CourseList  />} />} />
                  <Route path="/questions" element={<ProtectedRoute element={<TopQuestions />} />} />
                  <Route path="/questionssolved" element={<ProtectedRoute element={<QuizHeader/>} />} />
                  <Route path="/coursesDetail" element={<ProtectedRoute element={<Courses />} />} />
                  <Route path="/videopage" element={<ProtectedRoute element={<Videopage />} />} />
                  <Route path="/notes" element={<ProtectedRoute element={<Notespage />} />} />
                  <Route path="/SingleCourse" element={<ProtectedRoute element={<SingleCourseCard setCourseData={setCourseData} />} />} />
                </Routes>
              </Box>

              {/* Mobile View Routes */}
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  width: '100%',
                  position: 'absolute',
                  overflowX: 'hidden',
                  top: '220px',
                }}
              >
                <Routes>
                  <Route path="/questions" element={<ProtectedRoute element={<TopQuestions />} />} />
                  <Route path="/questionssolved" element={<ProtectedRoute element={<QuizHeader/>} />} />
                </Routes>
              </Box>
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  width: '95%',
                  position: 'absolute',
                  overflowX: 'hidden',
                  top: '65px',
                }}
              >
                <Routes>
                  <Route path="/quiz" element={<ProtectedRoute element={<ScholarshipCard />} />} />
                  <Route path="/dashboard" element={<ProtectedRoute element={<CourseList  />} />} />
                  <Route path="/videopage" element={<ProtectedRoute element={<Videopage />} />} />
                  <Route path="/notes" element={<ProtectedRoute element={<Notespage />} />} />
                  <Route path="/SingleCourse" element={<ProtectedRoute element={<SingleCourseCard setCourseData={setCourseData} />} />} />
                </Routes>
              </Box>
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
