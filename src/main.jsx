import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from "./routes";
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
