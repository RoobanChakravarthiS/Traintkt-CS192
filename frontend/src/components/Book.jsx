import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import data from "../assets/train-data.json";
import Navbar from "./Navbar";

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.islogged.islogged);

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  const { destination = "", source = "" } = location.state || {};

  const filteredTrains = data.filter(
    (train) =>
      train.destination?.toLowerCase().includes(destination.toLowerCase()) &&
      train.source?.toLowerCase().includes(source.toLowerCase())
  );

  const handleTicketClick = (train, classType) => {
    navigate("/checkout", { state: { train, classType } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-blue-600 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 pt-16">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Available Trains from {source} to {destination}
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-300 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  {train.train_name} ({train.train_number})
                </h3>
                <p className="text-gray-700 mt-1">Source: {train.source}</p>
                <p className="text-gray-700">Destination: {train.destination}</p>
                <p className="text-gray-700">Departure Time: {train.departure_time}</p>
                <p className="text-gray-700">Arrival Time: {train.arrival_time}</p>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-blue-600">Tickets:</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(train.ticket_price).map(
                      ([classType, price], priceIndex) => (
                        <li key={priceIndex} className="mb-2">
                          <button
                            onClick={() => handleTicketClick(train, classType)}
                            className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-semibold shadow hover:bg-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                          >
                            {classType}: ₹{price}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No trains found for the route from {source} to {destination}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;