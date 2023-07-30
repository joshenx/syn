import { routerType } from '../types/router.types';
import About from './About';
import Just from './Just';
import Feedback from './Feedback';
import Gallery from './Gallery';
import PageNotFound from './PageNotFound';

const pagesData: routerType[] = [
  {
    path: '',
    element: <Gallery />,
    title: 'Gallery',
  },
  {
    path: 'feedback',
    element: <Feedback />,
    title: 'Feedback',
  },
  {
    path: 'about',
    element: <About />,
    title: 'About Me',
  },
  {
    path: 'just',
    element: <Just />,
    title: 'Train',
  },
  {
    path: '*',
    element: <PageNotFound />,
    title: 'error404',
  },
];

export default pagesData;
