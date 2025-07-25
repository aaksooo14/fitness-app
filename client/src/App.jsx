import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import AdminDashboard from './component/admin/AdminDashboard';
import MemberDashboard from './component/member/MemberDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
