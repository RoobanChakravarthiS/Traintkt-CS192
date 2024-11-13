import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; 
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json";
import { useSelector } from "react-redux";
// import GenerateImage from "./TicketGenerator"; 

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.islogged.islogged);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loginStatus) {
        navigate("/login");
      }
    });

    return () => clearTimeout(timeoutId);
  }, [loginStatus, navigate]);

  // const { train, classType, passengerNames } = location.state || {};
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center">
      <div className="container mx-auto p-8 bg-gray-850 rounded-lg shadow-lg">
        {isConfirmed ? (
          <div className="flex flex-col items-center text-center">
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoplay={true}
              style={{ width: 150, height: 150 }}
            />
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-lg text-gray-300">Thank you for your booking!</p>
            <div className="my-10">
             
            </div>
            <Link to="/home">
              <button className="bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600 transition duration-150 ease-in-out">
                Go to Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              Booking Confirmation
            </h2>
            {/* <h3 className="text-2xl mb-2 text-gray-200">
              Train: {train.train_name} ({train.train_number})
            </h3>
            <h4 className="text-lg mb-2 text-orange-300">Class: {classType}</h4>
            <h4 className="text-lg mb-4 text-orange-300">Passengers:</h4>
            <ul className="text-gray-300 mb-4">
              {passengerNames.map((name, index) => (
                <li key={index} className="mb-1">
                  {name}
                </li>
              ))}
            </ul> */}
            <div className="text-gray-300 mb-4">
              <h4 className="text-lg font-medium text-orange-300">
                Important Information:
              </h4>
              <p>Your tickets will be sent to your registered email.</p>
              <p>
                Please arrive at the station at least 30 minutes before
                departure.
              </p>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
