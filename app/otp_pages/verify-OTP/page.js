"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const VerifyOTP = () => {
  const router = useRouter();
  const [webAPI, setWebAPI] = useState("");
  const [inpOTP, setInpOTP] = useState("");
  const [cfrmNewPass, setCfrmNewPass] = useState("");
  const [resetDetails, setResetDetails] = useState({
    verifyOTP: "",
    verifyEmail: "",
    newPass: "",
  });

  // State for visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const getNewPass = async (e) => {
    e.preventDefault();
    console.log(resetDetails, inpOTP, cfrmNewPass);
    const resetPassForm = new FormData();
    resetPassForm.append("method", "forgotPass");
    resetPassForm.append("json", JSON.stringify(resetDetails));

    if (resetDetails.newPass !== cfrmNewPass) {
      alert("Passwords do not match");
      return;
    }

    if (inpOTP !== resetDetails.verifyOTP) {
      alert("This is not the OTP");
      return;
    }

    try {
      const conn = await axios.post(webAPI, resetPassForm);
      if (conn.data.response) {
        sessionStorage.removeItem("email_OTP");
        sessionStorage.removeItem("OTP");
        alert(conn.data.message);
        router.push('/signin'); 
      } else {
        alert("Cannot Update Password");
      }
    } catch (err) {
      console.log("Could not connect to API", err);
    }
  };

  useEffect(() => {
    const api = sessionStorage.getItem("webAPI");

    if (api) {
      setWebAPI(api);
      setResetDetails((curr) => ({
        ...curr,
        verifyEmail: sessionStorage.getItem("email_OTP"),
        verifyOTP: sessionStorage.getItem("OTP"),
      }));
    } else {
      console.log("API does not exist");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="space-y-4 p-6 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={getNewPass} className="space-y-4">
          {/* New Password Input */}
          <div className="relative">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              id="new-password"
              value={resetDetails.newPass}
              onChange={(e) => setResetDetails((prev) => ({ ...prev, newPass: e.target.value }))}
              className="mt-1 w-full pr-10"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-8 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={cfrmNewPass}
              onChange={(e) => setCfrmNewPass(e.target.value)}
              className="mt-1 w-full pr-10"
              placeholder="Re-enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 top-8 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* OTP Input */}
          <div className="relative">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <Input
              type={showOTP ? "text" : "password"}
              id="otp"
              value={inpOTP}
              onChange={(e) => setInpOTP(e.target.value)}
              className="mt-1 w-full pr-10"
              placeholder="Enter OTP"
              required
            />
            <button
              type="button"
              onClick={() => setShowOTP(!showOTP)}
              className="absolute inset-y-0 right-3 top-8 text-gray-500"
            >
              {showOTP ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
