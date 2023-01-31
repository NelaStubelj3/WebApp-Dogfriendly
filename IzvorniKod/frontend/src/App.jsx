import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./screens/HomePage";
import ProfileInfo from "./screens/ProfileInfo";
import Register from "./screens/Register";
import Login from "./screens/Login";
import RegisterUser from "./screens/RegisterUser";
import RegisterBusiness from "./screens/RegisterBusiness";
import ConfirmAccount from "./screens/ConfirmAccount";

export const api_url = "http://dog-friendly.me/api/";
//export const api_url = "http://localhost:5000/api/";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/business" element={<RegisterBusiness />} />
          <Route path="/confirm" element={<ConfirmAccount />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
