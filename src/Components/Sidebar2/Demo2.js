// Demo.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import PagesIcon from '@mui/icons-material/Pages';
import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';

export const navigationData = {
    Navigation: {
                    'MDCAT English' : {
            Dashboard: {
                url: '',
                icon: 'Dashboard'
            },
            Page: {
                url: 'www.page',
                icon: PagesIcon
            },
            Courses: {
                url: 'www.Temporary',
                icon: SchoolIcon
            },
            Announcements: {
                url: 'www.Permanent',
                icon: AnnouncementIcon
            }
        },
        Instructor: {
            Dashboard: {
                url: '',
                icon: DashboardIcon
            },
            Page: {
                url: '',
                icon: PagesIcon
            },
            Courses: {
                url: '',
                icon: SchoolIcon
            },
            Announcements: {
                url: '',
                icon: AnnouncementIcon
            }
        }
    }
};