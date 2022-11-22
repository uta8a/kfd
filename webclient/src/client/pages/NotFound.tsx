import React from "react";
import { Footer } from "../components/Footer";

const NotFound = () => {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <div className="flex items-center flex-col pt-10">
        <h1 className="font-bold text-gray-900 text-5xl lg:text-7xl text-center ">404</h1>
        <p className="mt-5">
          <a href="/">Link to Home</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
