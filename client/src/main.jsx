import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Rout/Rout.jsx'
import Authonicate from './ContextHandler/Authonicate/Authonicate.jsx'
import BgHandle from './ContextHandler/BgHandle/BgHandle.jsx'
import RegisterSteps from './ContextHandler/RegisterSteps/RegisterSteps.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authonicate>
      <RegisterSteps>
        <BgHandle>
          <RouterProvider router={router} />
        </BgHandle>
      </RegisterSteps>
    </Authonicate>
  </React.StrictMode>,
)
