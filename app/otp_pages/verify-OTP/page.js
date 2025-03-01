"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mainURL, setMainURL] = useState(""); // Fetch from sessionStorage
  const router = useRouter();

  // Load API URL from session storage
  useState(() => {
    setMainURL(sessionStorage.getItem("webAPI") || "");
  }, []);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const otpData = new FormData();
    otpData.append("method", "sendOTP");
    otpData.append("json", JSON.stringify(otp));

    if (!mainURL) {
      setError("API URL is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(mainURL, otpData);

      if (response.data.success) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => router.push("/"), 2000); // Redirect after success
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error("OTP Verification Error:", err);
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(mainURL, {
        method: "resend-otp",
      });

      if (response.data.success) {
        setSuccess("OTP has been resent successfully!");
      } else {
        setError("Failed to resend OTP. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error("Resend OTP Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#6482AD]">
      <div className="w-full max-w-md p-6 bg-[#E2DAD6] rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && <p className="text-green-500 text-center mb-3">{success}</p>}

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            maxLength={6}
            className="p-2 w-full border border-black rounded text-black text-center"
          />

          <Button
            type="submit"
            className="w-full bg-[#213555] text-white px-4 py-2 rounded-lg hover:bg-[#324A65]"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center text-sm mt-4">
            Didn&apos;t receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-blue-500 underline underline-offset-4"
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
