import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Desk from './Components/Authorization/Desk';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <Desk />
    </QueryClientProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

