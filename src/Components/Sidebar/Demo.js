// Demo.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import PagesIcon from '@mui/icons-material/Pages';
import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';

export const navigationData = {
    Navigation: {
        Students: {
            Dashboard: {
                url: '/courses',
                icon: DashboardIcon
            },
            // Page: {
            //     url: 'www.page',
            //     icon: PagesIcon
            // },
            // Courses: {
            //     url: '/courses',
            //     icon: SchoolIcon
            // },
            Announcements: {
                url: 'www.Permanent',
                icon: AnnouncementIcon
            }
        },
        // Instructor: {
        //     Dashboard: {
        //         url: '',
        //         icon: DashboardIcon
        //     },
        //     Page: {
        //         url: '',
        //         icon: PagesIcon
        //     },
        //     Courses: {
        //         url: '',
        //         icon: SchoolIcon
        //     },
        //     Announcements: {
        //         url: '',
        //         icon: AnnouncementIcon
        //     }
        // }
    }
};