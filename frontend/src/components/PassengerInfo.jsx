import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar"; 

const PassengerInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.islogged.islogged);

  const generateTicketNumber = () => {
    const prefix = "TKT";
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}-${timestamp}-${randomNum}`;
  };

  const pnr = generateTicketNumber();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  const { train, classType } = location.state || {};
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengerNames, setPassengerNames] = useState(
    Array(numPassengers).fill("")
  );

  const handleNameChange = (index, value) => {
    const names = [...passengerNames];
    names[index] = value;
    setPassengerNames(names);
  };

  const handleSubmit = () => {
    navigate("/checkout", { state: { pnr, train, classType, passengerNames } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center">
      <Navbar />
      <div className="container p-8 bg-gray-800 rounded-lg shadow-lg m  mx-96">
        <h2 className="text-3xl font-bold text-blue-400 mb-4 text-center">
          Enter Passenger Information
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-gray-300">
            Number of Passengers:
          </label>
          <input
            type="number"
            value={numPassengers}
            onChange={(e) => {
              const value = Math.max(1, e.target.value);
              setNumPassengers(value);
              setPassengerNames(Array(value).fill(""));
            }}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>

        {Array.from({ length: numPassengers }).map((_, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1 text-gray-300">
              Passenger {index + 1} Name:
            </label>
            <input
              type="text"
              value={passengerNames[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter name for Passenger ${index + 1}`}
              required
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600 transition duration-150 ease-in-out mb-4 w-full"
        >
          Proceed to Checkout
        </button>

        <div className="text-gray-300 mt-6 text-center">
          <p>Please review the information before proceeding.</p>
          <p>If you need to change the number of passengers, please go back.</p>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
