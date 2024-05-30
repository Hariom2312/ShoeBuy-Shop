import React from "react";
import SocialMedia from "./SocialMedia";

const setYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="container mx-auto">
        <p className="text-white text-center">
          Copyright &copy; shoeBuy Shop {setYear}. All rights reserved
        </p>
      </div>
      <div className="mb-6">
        <SocialMedia />
      </div>
    </footer>
  );
};

export default Footer;