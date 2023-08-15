import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import Store from './store.js';

import { Provider } from 'react-redux';

import './index.css'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import UploadHouse from './components/uploadhouse.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element = {<App/>}>
   <Route index = {true} path='/'  element={<HomeScreen />} />
   <Route path='/login'  element={<LoginScreen />} />
   <Route path='/upload'  element={<UploadHouse/>} />

   <Route path='/register'  element={<RegisterScreen />} />
    <Route path=''  element={<PrivateRoute />}>
    <Route path='/profile'  element={<ProfileScreen />} />
   </Route>
  </Route>

))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {Store}>

  <React.StrictMode>

   <RouterProvider router = {router } /> 
  </React.StrictMode>
  
  </Provider>

)
