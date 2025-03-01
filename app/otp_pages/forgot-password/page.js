"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const ForgotPass = () => {
    const [mainURL, setMainURL] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

   const handleResetRequest = async (e) => {
    e.prevenDefault();
    const resetForm = new FormData();
    resetForm.append("method", "emailOTP");    
    resetForm.append("json", JSON.stringify(email));

    try {} catch (err) {
        
    }
   }

    useEffect(() => {
        const api = sessionStorage.getItem("webAPI");
        if (api) {
            console.log("Found the existing API: ", api);
            setMainURL(api);
        }
    }, [])
    return (
        <div className="flex min-h-screen bg-[#6482AD] justify-center items-center">
            <div className="w-full max-w-md p-6 bg-[#E2DAD6] rounded-md shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Enter your email address and we’ll send you a link to reset your password.
                </p>
                <form onSubmit={handleResetRequest}>
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m@example.com"
                            required
                            className="mt-1 p-2 w-full border border-black rounded text-black placeholder-gray-500"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#213555] text-white">
                        Send Reset Link
                    </Button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
                <div className="text-center text-sm mt-4">
                    Remember your password? <a href="/signin" className="underline">Login</a>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass
