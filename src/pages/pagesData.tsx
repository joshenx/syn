import { routerType } from "../types/router.types";
import About from "./About";
import Gallery from "./Gallery";
import PageNotFound from "./PageNotFound";

const pagesData: routerType[] = [
  {
    path: "",
    element: <Gallery />,
    title: "Gallery"
  },
  {
    path: "about",
    element: <About />,
    title: "About Me"
  },
  {
    path: "*",
    element: <PageNotFound />,
    title: "error404"
  }
];

export default pagesData;
