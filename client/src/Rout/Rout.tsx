import { createBrowserRouter } from "react-router-dom";
import Root from '../Pages/Root/Root'
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import CreatAccount from "../Pages/Register/CreatAccount/CreatAccount";
import Education from "../Pages/Register/Education/Education";
import StudyTime from "../Pages/Register/StudyTime/StudyTime";
import Welcome from "../Pages/Register/Welcome/Welcome";
import Login from "../Pages/Login/Login";
import StudyView from "../Pages/StudyView/StudyView";
import Private from "../Components/Shared/Private/Private";
import Error from "../Pages/Error/Error";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement : <Error/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/study-room",
          element: <Private><StudyView /></Private>
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