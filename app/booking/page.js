"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor, PopoverTitle } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { motion } from "framer-motion";



export default function BookingPage() {
    const router = useRouter();
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [childrenAges, setChildrenAges] = useState([]);
    
  
    return (
    
      <div className="min-h-screen flex flex-col">           
       <Header/>
        {/* Booking Form Section */}
        <section id="booking" className="px-10 py-8 flex flex-col items-center gap-4 mt-[200px] mb-[380px]">
        <div className="p-8 flex flex-col items-center gap-10">
        <motion.h1
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-6xl font-bold text-white"
>
  BOOK
</motion.h1>
        <div className="flex flex-wrap gap-4 items-end">
  {/* Check-in Date */}
  <div className="flex-1 min-w-[200px] text-white">
    <label className="text-sm font-medium mb-1 block">Check-in Date</label>
    <Popover>
      <PopoverTrigger asChild> 
        <Button variant="outline" className="w-full text-left">
          {checkInDate ? format(checkInDate, "PPP") : "Select Check-in Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={checkInDate}
          onSelect={setCheckInDate}
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  </div>

  {/* Check-out Date */}
  <div className="flex-1 min-w-[200px] text-white">
    <label className="text-sm font-medium mb-1 block ">Check-out Date</label>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full text-left">
          {checkOutDate ? format(checkOutDate, "PPP") : "Select Check-out Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={checkOutDate}
          onSelect={setCheckOutDate}
          disabled={(date) => !checkInDate || date <= checkInDate}
        />
      </PopoverContent>
    </Popover>
  </div>

  {/* Room Selection */}
  <div className="flex-1 min-w-[200px]">
      <label className="text-sm font-medium mb-1 block text-white">Room</label>

      {/* Popover Trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left">
            {adults} adults · {children} children · {rooms} room
          </Button>
        </PopoverTrigger>

        {/* Popover Content */}
        <PopoverContent align="start" className="w-64 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col gap-3 text-black">
            {/* Adults */}
            <div className="flex justify-between items-center">
              <span>Adults</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                <span>{adults}</span>
                <Button variant="outline" size="icon" onClick={() => setAdults(adults + 1)}>+</Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Children</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleChildrenChange(Math.max(0, children - 1))}>-</Button>
                  <span>{children}</span>
                  <Button variant="outline" size="icon" onClick={() => handleChildrenChange(children + 1)}>+</Button>
                </div>
              </div>

              {/* Age Dropdowns for Each Child */}
              {childrenAges.map((age, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>Child {index + 1} Age</span>
                  <select
                    className="border rounded p-1"
                    value={age}
                    onChange={(e) => handleAgeChange(index, parseInt(e.target.value))}
                  >
                    {[...Array(18).keys()].map((num) => (
                      <option key={num} value={num}>{num} years</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Rooms */}
            <div className="flex justify-between items-center">
              <span>Rooms</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</Button>
                <span>{rooms}</span>
                <Button variant="outline" size="icon" onClick={() => setRooms(rooms + 1)}>+</Button>
              </div>
            </div>

            {/* Done Button */}
            <Button className="w-full bg-[#213555] text-white mt-2 hover:bg-blue-600">Done</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>

  {/* Search Button (Now Positioned Lower) */}
  <div className="flex-1 min-w-[200px] flex self-end">
    <Button className=" bg-[#213555] text-white px-4 py-2 rounded-lg hover:bg-[#324A65]">
      Search
    </Button>
  </div>
</div>
</div>
        </section>
  
        {/* Booking Summary Section */}
        <section className=" p-6 shadow-lg rounded-lg">
       
          <h2 className="text-2xl font-bold">
            {/* diri makita ang mga card */}
          </h2>
          {/* Summary content goes here */}
        </section>
        <section className="bg-gray-800 text-white p-4 mt-8">
<Footer />
    </section>
  
      </div>

      
      
  
    );
  }
  