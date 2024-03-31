import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Pages/Root/Root"
import Home from "../Pages/Home/Home";
import Register from "../Pages/Registar/Registar";
import CreatAccount from "../Pages/Registar/CreatAccount/CreatAccount";
import Education from "../Pages/Registar/Education/Education";
import StudyTime from "../Pages/Registar/StudyTime/StudyTime";
import Welcome from "../Pages/Registar/Welcome/Welcome";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
    children : [
      {
        path: "/register",
        element: <CreatAccount />,
      },
      {
        path: "/register/education",
        element: <Education />,
      },
      {
        path: "/register/studyTime",
        element: <StudyTime />,
      },
      {
        path: "/register/welcome",
        element: <Welcome />,
      }
    ]
  }
]);

export default router;