"use client";
import { useRouter, useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  faWifi,
  faSnowflake,
  faLock,
  faMugHot,
  faShower,
  faBed,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Room details with multiple images
const roomDetails = {
  "standard-twin-room": {
    name: "Standard Twin Room",
    images: [
      "/assets/standard/standard.jpg",
      "/assets/standard/stand2.jpg",
      "/assets/standard/stand3.jpg",
      "/assets/standard/stand4.jpg",
      "/assets/standard/stand5.jpg",
    ],
    description: "Featuring free toiletries, this twin room includes a private bathroom with a shower, a bidet and a hairdryer. The air-conditioned twin room features a flat-screen TV, a safe deposit box, an electric kettle, a tiled floor as well as a quiet street view. The unit has 2 beds.",
    size: "21 m²",
    amenities: [
      { icon: faBed, text: "2 Single Beds" },
      { icon: faShower, text: "Private Bathroom" },
      { icon: faWifi, text: "Free WiFi" },
      { icon: faTv, text: "Flat-screen TV" },
      { icon: faSnowflake, text: "Air Conditioning" },
      { icon: faLock, text: "Safety Deposit Box" },
      { icon: faMugHot, text: "Electric Kettle" },
    ],
  },
  "double-room": {
    name: "Double Room",
    images: [
      "/assets/double/dob.jpg",
      "/assets/double/dob2.jpg",
      "/assets/double/dob3.jpg",
      "/assets/double/gall2.jpg",
      "/assets/double/dob5.jpg",
    ],
    description: "Providing free toiletries, this double room includes a private bathroom with a shower, a bidet and a hairdryer. The air-conditioned double room provides a flat-screen TV, a safe deposit box, an electric kettle, a tiled floor as well as a quiet street view. The unit offers 1 bed.",
    price: "$90 per night",
    size: "21 m²",
    amenities: [
      { icon: faBed, text: "1 Large Double Bed" },
      { icon: faShower, text: "Private Bathroom" },
      { icon: faWifi, text: "Free WiFi" },
      { icon: faTv, text: "Flat-screen TV" },
      { icon: faSnowflake, text: "Air Conditioning" },
      { icon: faLock, text: "Safety Deposit Box" },
      { icon: faMugHot, text: "Electric Kettle" },
    ],
  },
  "triple-room": {
    name: "Triple Room",
    images: [
      "/assets/triple/triple.jpg",
      "/assets/triple/triple.jpg",
      "/assets/triple/triple.jpg",
      "/assets/triple/triple.jpg",
      "/assets/triple/triple.jpg",
    ],
    description: "Featuring free toiletries, this triple room includes a private bathroom with a shower, a bidet and a hairdryer. The air-conditioned triple room features a flat-screen TV, a safe deposit box, an electric kettle, a tiled floor as well as a quiet street view. The unit has 3 beds.",
    price: "$110 per night",
    size: "28 m²",
    amenities: [
      { icon: faBed, text: "3 Single Beds" },
      { icon: faShower, text: "Private Bathroom" },
      { icon: faWifi, text: "Free WiFi" },
      { icon: faTv, text: "Flat-screen TV" },
      { icon: faSnowflake, text: "Air Conditioning" },
      { icon: faLock, text: "Safety Deposit Box" },
      { icon: faMugHot, text: "Electric Kettle" },
    ],
  },
  "family-room": {
    name: "Family Room",
    images: [
      "/assets/legitFamily/legit5.jpg",
      "/assets/legitFamily/legit51.jpg",
      "/assets/legitFamily/legit5.jpg",
      "/assets/legitFamily/legit51.jpg",
      "/assets/legitFamily/legit5.jpg",
    ],
    description: "Featuring free toiletries, this family room includes a private bathroom with a shower, a bidet and a hairdryer. The air-conditioned family room features a flat-screen TV, a safe deposit box, an electric kettle and a tiled floor. The unit has 5 beds.",
    price: "$140 per night",
    size: "30 m²",
    amenities: [
      { icon: faBed, text: "5 Single Beds" },
      { icon: faShower, text: "Private Bathroom" },
      { icon: faWifi, text: "Free WiFi" },
      { icon: faTv, text: "Flat-screen TV" },
      { icon: faSnowflake, text: "Air Conditioning" },
      { icon: faLock, text: "Safety Deposit Box" },
      { icon: faMugHot, text: "Electric Kettle" },
    ],
  },
  "single-room": {
    name: "Single Room",
    images: [
      "/assets/single/single4.jpg",
      "/assets/single/single3.jpg",
      "/assets/single/single2.jpg",
      "/assets/single/single.jpg",
      "/assets/single/single4.jpg",
    ],
    description: "Providing free toiletries, this single room includes a private bathroom with a shower, a bidet and a hairdryer. The air-conditioned single room provides a flat-screen TV, a safe deposit box, an electric kettle, a tiled floor as well as a quiet street view. The unit offers 1 bed.",
    price: "$70 per night",
    size: "17 m²",
    amenities: [
      { icon: faBed, text: "1 Single Bed" },
      { icon: faShower, text: "Private Bathroom" },
      { icon: faWifi, text: "Free WiFi" },
      { icon: faTv, text: "Flat-screen TV" },
      { icon: faSnowflake, text: "Air Conditioning" },
      { icon: faLock, text: "Safety Deposit Box" },
      { icon: faMugHot, text: "Electric Kettle" },
    ],
  },
  "quadruple-room": {
    name: "Quadruple Room",
    images: [
      "/assets/family/fam.jpg",
      "/assets/family/fam2.jpg",
      "/assets/family/fam3.jpg",
      "/assets/family/fam4.jpg",
      "/assets/family/fam5.jpg",
    ],
    description: "Providing free toiletries, this quadruple room includes a private bathroom with a shower, a bidet and a hairdryer. This quadruple room is air-conditioned and features a flat-screen TV, a safe deposit box, an electric kettle and a tiled floor. The unit offers 4 beds.",
    price: "$130 per night",
    size: "30 m²",
    amenities: [
      { icon: faBed, text: "4 Single Beds" },
      { icon: faShower, text: "Private Bathroom" },
      { icon: faWifi, text: "Free WiFi" },
      { icon: faTv, text: "Flat-screen TV" },
      { icon: faSnowflake, text: "Air Conditioning" },
      { icon: faLock, text: "Safety Deposit Box" },
      { icon: faMugHot, text: "Electric Kettle" },
    ],
  },
};

const RoomPage = () => {
  const router = useRouter();
  const params = useParams();
  const roomKey = params.room;
  const room = roomDetails[roomKey] || {
    name: "Room Not Found",
    images: ["/images/default-room.jpg"],
    description: "No details available for this room.",
    price: "-",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6482AD]">
    <div className="w-full max-w-6xl flex flex-row items-start text-white gap-6">
      {/* Section 1 - Image Carousel */}
      <div className="w-1/2 min-h-[350px] md:h-[90vh] h-auto flex items-center justify-center bg-[#6482AD] relative p-4 rounded-lg shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="w-full h-full"
        >
          {room.images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <img
                src={image}
                alt={`${room.name} image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  
      {/* Section 2 - Room Details */}
      <div className="w-1/2 bg-[#E2DAD6] p-6 rounded-lg shadow-lg text-black">
        {/* Room Details */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#444]">{room.name}</h2>
          <p className="text-md text-gray-700">{room.description}</p>
          <div className="flex justify-center space-x-6 mt-2">
            <span className="text-lg font-semibold text-[#6482AD]">{room.price}</span>
            <span className="text-lg font-semibold text-[#6482AD]">{room.size}</span>
          </div>
        </div>
  
        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {room.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 text-md font-medium">
              <FontAwesomeIcon icon={amenity.icon} className="text-lg text-blue-300" />
              <span>{amenity.text}</span>
            </div>
          ))}
        </div>
  
        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-[#6482AD] hover:bg-[#7FA1C3] rounded-md text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default RoomPage;