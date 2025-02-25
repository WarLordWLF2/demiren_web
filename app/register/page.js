"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; // Icons for toggle


export default function Register() {
  const router = useRouter();
  const [mainURL, setMainURL] = useState("");
  const [rePass, setRePass] = useState('');
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    password: "",
    country: "",
    email: "",
    phone: "",
    age: 0
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleRePass = () => setShowRePass(!showRePass);

  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone) => /^[0-9]{11}$/.test(phone);
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };


  const handleRegistration = async () => {
    if (!validateEmail(userDetails.email)) {
      alert("Email must contain '_', '@' and '-' ");
      return;
    }

    if (!validatePhone(userDetails.phone)) {
      alert("Invalid Phone Number");
      return;
    }

    if (!validatePassword(userDetails.password)) {
      alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    if (userDetails.password !== rePass) {
      alert("Passwords do not match");
      return;
    }

    if (userDetails.age <= 17) {
      alert("Age must be at or above 18");
      return;
    }

    const userInfo = new FormData();
    userInfo.append("method", "addUser");
    userInfo.append("json", JSON.stringify(userDetails));

    try {
      const conn = await axios.post(mainURL, userInfo);
      if (conn) {
        alert('Successfully Added New User!');
        router.push(`./signin`);
      } else {
        alert('Failed to add new User');
      }
    } catch (err) {
      console.log('Something Went Wrong', err);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMainURL(sessionStorage.webAPI || ""); // Ensure safe access
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="/assets/dems.jpg"
          alt="Register"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex justify-center items-center p-4 bg-[#213555]">
        <div className="w-full max-w-sm p-4 bg-[#D8C4B6] rounded-md shadow-lg">
          <h2 className="text-center text-lg font-semibold mb-3 text-[#213555]">Create an Account</h2>

          {/* Name Fields */}
          <div className="mb-3 flex gap-2">
            <div className="w-1/2">
              <label className="block text-xs font-medium text-[#213555]">First Name</label>
              <Input
                type="text"
                placeholder="First"
                value={userDetails.fname}
                onChange={(e) => setUserDetails({ ...userDetails, fname: e.target.value })}
                className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-xs font-medium text-[#213555]">Last Name</label>
              <Input
                type="text"
                placeholder="Last"
                value={userDetails.lname}
                onChange={(e) => setUserDetails({ ...userDetails, lname: e.target.value })}
                className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-[#213555]">Email</label>
            <Input
              type="email"
              placeholder="m@example.com"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="mb-3 relative">
            <label className="block text-xs font-medium text-[#213555]">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-6 right-2 text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Re-type Password Field with Toggle */}
          <div className="mb-3 relative">
            <label className="block text-xs font-medium text-[#213555]">Re-type Password</label>
            <Input
              type={showRePass ? "text" : "password"}
              placeholder="••••••••"
              value={rePass}
              onChange={(e) => setRePass(e.target.value)}
              className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={toggleRePass}
              className="absolute top-6 right-2 text-gray-600"
            >
              {showRePass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Country & Phone */}
          <div className="mb-3 flex gap-2">
            <div className="w-1/2">
              <label className="block text-xs font-medium text-[#213555]">Country</label>
              <Input
                type="text"
                placeholder="Country"
                value={userDetails.country}
                onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })}
                className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-xs font-medium text-[#213555]">Phone</label>
              <Input
                type="tel"
                placeholder="Phone No."
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500"
              />
            </div>
          </div>

          {/* Age */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-[#213555]">Age</label>
            <Input
              type="number"
              placeholder="Your Age"
              value={userDetails.age}
              onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
              className="mt-1 p-1 w-full border border-black rounded text-xs text-black placeholder-gray-500"
            />
          </div>

          {/* Register Button */}
          <Button type="submit" className="w-full mt-3 bg-[#213555] text-white text-sm p-2" onClick={handleRegistration}>
            Register
          </Button>

          <div className="text-center mt-3">
            <p className="text-[#213555] text-sm">
              Have an Account Already?{""}
              <a href="/signin" className="text-blue-600 underline">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
