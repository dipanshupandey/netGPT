import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,routerProvider} from 'react-router'
import Login from './components/Login';
import { lazy,Suspense } from 'react';
const Browse=lazy(()=>import('./components/Browse'));
const GPT=lazy(()=>import('./components/GPT'));


const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"/browse",
        element:
        (
        <Suspense fallback={<div>Loading...</div>}>
        <Browse/>
        </Suspense>
        )
      },
      {
        path:"/gpt",
        element:
        (
          <Suspense fallback={<div>Loading...</div>}>
          <GPT/>
          </Suspense>
        )
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
