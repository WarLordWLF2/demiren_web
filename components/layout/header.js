
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBooking = () => {
    router.push("/booking");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleSelect = (roomName) => {
    const formattedRoom = roomName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/roomtype/${formattedRoom}`);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-400 ${
        isScrolled ? "bg-[#213555]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded-full"
            onClick={() =>
              document.getElementById("home").scrollIntoView({ behavior: "smooth" })
            }
          />
          <h1 className="text-xl font-bold text-white">DEMIREN HOTEL AND RESTAURANT</h1>
        </div>

        {/* Right Side: Navigation and Auth Buttons */}
        <div className="flex space-x-4">
        <Button
  variant="link"
  style={{ color: "white" }}
  onClick={() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#about"); 
    }
  }}
>
  About
</Button>
<Button
  variant="link"
  style={{ color: "white" }}
  onClick={() => {
    const facilitiesSection = document.getElementById("facilities");
    if (facilitiesSection) {
      facilitiesSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#facilities");
    }
  }}
>
  Facilities
</Button>
<Button
  variant="link"
  style={{ color: "white" }}
  onClick={() => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#gallery");
    }
  }}
>
  Gallery
</Button>

          {/* Dropdown Menu for Rooms */}
          <DropdownMenu align="end">
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="text-white">
                Rooms
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white">
              {[
                "Standard Twin Room",
                "Double Room",
                "Triple Room",
                "Quadruple Room",
                "Family Room",
                "Single Room",
              ].map((room) => (
                <DropdownMenuItem key={room} onClick={() => handleSelect(room)}>
                  {room}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
  variant="link"
  style={{ color: "white" }}
  onClick={() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#contact");
    }
  }}
>
  Contact Us
</Button>

          <Button variant="link" style={{ color: "white" }} onClick={handleRegister}>
            Register
          </Button>
          <Button variant="link" style={{ color: "white" }} onClick={handleSignIn}>
            Login
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600" style={{ color: "white" }} onClick={handleBooking}>
          BOOK NOW
        </Button>
        </div>
      </div>
    </header>
  );
}
