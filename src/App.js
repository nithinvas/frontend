// App.js

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Forms from './components/Forms';
import BatchList from './components/batchid';
import Enrolled from './components/Enrolled';
import Notenrolled from './components/Notenrolled';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route
          path="/enrolled"
          element={
            <Enrolled/>
          }
        />
        <Route
          path="/notenrolled"
          element={
            <Notenrolled/>
          }
        />
        <Route
          path="/batch_id"
          element={
            <BatchList/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
