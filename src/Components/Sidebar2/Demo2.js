import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export const navigationData = {
    Navigation: {
      'Chapter 1': {
        topics: {
          'Topic 1': {
            items: {
              'Topic 1 Video': {
                url: '',
                icon: PlayCircleIcon,
              },
              'Topic 1 Quiz': {
                url: 'www.page',
                icon: QuizIcon,
              },
              'Topic 1 Notes': {
                url: 'www.Temporary',
                icon: BookmarksIcon,
              },
            },
          },
          'Topic 2': {
            items: {
              'Topic 2 Video': {
                url: '',
                icon: PlayCircleIcon,
              },
              'Topic 2 Quiz': {
                url: 'www.page',
                icon: QuizIcon,
              },
              'Topic 2 Notes': {
                url: 'www.Temporary',
                icon: BookmarksIcon,
              },
            },
          },
        },
      },
    },
    AdditionalSections: {
      'Chapter1 Quiz': {
        icon: QuizIcon,
      },
      'Chapter1 Notes': {
        icon: BookmarksIcon,
      },
    },
  };