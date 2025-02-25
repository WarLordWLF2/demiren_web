"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter();
  return (
    <footer id ="contact" className="bg-gray-800 text-white ">
    <div className="container mx-auto">
      <div className="grid grid-cols-3 ">
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#room" className="hover:underline">Rooms</a></li>
            <li><a href="#facilities" className="hover:underline">Facilities</a></li>
            <li><a href="#gallery" className="hover:underline">Gallery</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            <li><a href="#booking" className="hover:underline">Book Now</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p>📞 +63 22 333 4444</p>
          <p>📧 demiren@gmail.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/DemirenHotelCagayanDeOro" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl hover:text-blue-500 transition duration-300" />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGoogle} className="text-white text-2xl hover:text-red-500 transition duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm">
        <p>© Copyright 2025 by Demiren Hotel and Restaurant</p>
        <p>123 Main Street, Cagayan de Oro, Philippines</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
