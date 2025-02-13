"use client";
import { useRouter, useParams } from "next/navigation";


const RoomPage = () => {
  const router = useRouter();
  const params = useParams();
  const room = params.room; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold">{room.replace(/-/g, " ")}</h1>
        <p className="mt-4 text-lg">Welcome to the {room.replace(/-/g, " ")} page!</p>

        <div className="mt-6">
          <p className="text-lg">Book a room now:</p>
          <button
            onClick={() => router.push("/booking")}           
            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Book Now

          </button>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
