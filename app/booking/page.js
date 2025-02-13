"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";


export default function BookingPage() {
  
    return (
    
      <div className="min-h-screen flex flex-col">            <Header/>
    
        
         
     
        {/* Booking Form Section */}
        <section className="bg-white p-6 shadow-lg rounded-lg mt-[100px]">
          <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
          {/* Form content goes here */}
        </section>
  
        {/* Booking Summary Section */}
        <section className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold
          ">Booking Summary</h2>
          {/* Summary content goes here */}
        </section>
        <section className="bg-gray-800 text-white p-4 mt-8">
<Footer />
    </section>
  
      </div>

      
      
  
    );
  }
  