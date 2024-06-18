import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Display from './components/Display';
import Search from './components/Search';
import DisplayMusic from './components/DisplayMusic';
import DisplayAll from './components/DisplayAll';
import DisplayData from './assets/DisplayData';

const displayData = DisplayData.data;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Display />} >
            <Route path='/' index element={<DisplayAll displayData={displayData} />} />
            <Route path='music' element={<DisplayMusic />} />
          </Route>
          <Route path='search' element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
