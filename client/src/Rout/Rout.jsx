import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Pages/Root/Root"
import StudyView from "../Pages/StudyView/StudyView";
import Register from "../Pages/Registar/Registar";
import CreatAccount from "../Pages/Registar/CreatAccount/CreatAccount";
import Education from "../Pages/Registar/Education/Education";
import StudyTime from "../Pages/Registar/StudyTime/StudyTime";
import Welcome from "../Pages/Registar/Welcome/Welcome";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Private from "../Components/Shared/Private/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/study-room",
        element: <Private> <StudyView /> </Private>,
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
    children: [
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
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;