import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import Header from './Components/Header';
import Tv from './Routes/Tv';
import Search from './Routes/Search';

function App() {
  return (
    <BrowserRouter basename="/netflix">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
