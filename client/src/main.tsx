import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Rout/Rout.tsx'
import { Provider } from 'react-redux'
import store from './Redux/Store.ts'
import BgHandle from './ContextHandler/BgHandler/BgHandle.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BgHandle>
      <RouterProvider router={router} />
      </BgHandle>
    </Provider>
  </React.StrictMode>,
)
