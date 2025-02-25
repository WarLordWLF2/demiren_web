"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState([]);
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [mainURL, setMainURL] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    userMail: "",
    userPass: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const logForm = new FormData();
    logForm.append("method", "submit-login");
    logForm.append("json", JSON.stringify(loginDetails));

    try {
      const conn = await axios.post(mainURL, logForm);
      if (conn.data.response) {
        alert("Welcome User");
      } else {
        if (conn.data.blocked) {
          alert("Account Locked, Try Again Later");
        } else {
          alert("Wrong Credentials");
        }
      }
    } catch (err) {
      console.log("Something went Wrong", err);
    }
  }

  const generateMathCaptcha = () => {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * 90) + 10;

    setCaptchaQuestion(`${num1} + ${num2} = ?`);
    setCaptchaAnswer(num1 + num2);
    setUserInput("");
    setIsCaptchaValid(false);
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (parseInt(e.target.value) === captchaAnswer) {
      setIsCaptchaValid(true);
    }
  };

  useEffect(() => {
    generateMathCaptcha();
  }, []);

  useEffect(() => {
    const api = sessionStorage.getItem("webAPI");
    if (api) {
      setMainURL(api);
      console.log("Successfully Got API");
    } else {
      console.log("API is not set");
    }
  }, [])

  return (<div className="flex min-h-screen bg-[#6482AD]">
    {/* Left side form */}
    <div className="w-1/2 flex justify-center items-center p-6">
      <div className="w-full max-w-md p-6 bg-[#E2DAD6] rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login to your account</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginDetails.userMail}
                onChange={(e) => setLoginDetails({ ...loginDetails, userMail: e.target.value })}
                placeholder="m@example.com"
                required
                className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginDetails.userPass}
                onChange={(e) => setLoginDetails({ ...loginDetails, userPass: e.target.value })}
                placeholder="Enter Password"
                required
                className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="/forgot-password" className="text-blue-500 text-sm underline">
                Forgot Password?
              </a>
            </div>

            {/* CAPTCHA */}
            <div className="text-center">
              <h2 className="text-lg font-bold">{captchaQuestion}</h2>
            </div>

            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter your answer"
              className="border p-2 w-full rounded text-black mt-3 text-center"
            />

            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={generateMathCaptcha}
                className="text-blue-500 text-sm underline"
              >
                Refresh CAPTCHA
              </button>
            </div>

            {!isCaptchaValid && userInput.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Incorrect answer, try again.</p>
            )}
          </div>

          {/* Show login button only if CAPTCHA is solved */}
          {isCaptchaValid && (
            <Button type="submit" className="w-full mt-4 bg-[#213555] text-white px-4 py-2 rounded-lg hover:bg-[#324A65]">
              Login
            </Button>
          )}

          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>

    {/* Right side image */}
    <div className="w-1/2 relative hidden md:block">
      <img
        src="/assets/dems.jpg"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
  );
}
