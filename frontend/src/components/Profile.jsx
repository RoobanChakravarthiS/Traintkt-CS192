import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [tickets, setTickets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isCanceling, setIsCanceling] = useState(false); // Track canceling state

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:3001/tickets", {
          params: { username: user.username },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, [user.username]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tickets.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tickets.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCancel = async (ticketNumber) => {
    setIsCanceling(true); // Start canceling
    try {
      await axios.delete(`http://localhost:3001/ticket/delete`, {
        data: { username: user.username, ticketNumber, email: user.email },
      });
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.ticketNumber !== ticketNumber)
      );
      setIsDialogOpen(false);
      setConfirmationMessage("Cancellation confirmed.");
      setTimeout(() => {
        setConfirmationMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error canceling ticket:", err);
      setIsDialogOpen(false);
    } finally {
      setIsCanceling(false); // Reset canceling state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-blue-600 flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6 mt-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-lg text-gray-700">
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="text-lg text-gray-700">
            <p>
              <strong>Total Tickets:</strong> {tickets.length}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Your Tickets
        </h2>
        {tickets.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden relative h-64">
              {tickets.map((ticket, index) => (
                <div
                  key={ticket.ticketNumber}
                  className={`transition-transform transform ${
                    index === currentIndex
                      ? "translate-x-0"
                      : index < currentIndex
                      ? "-translate-x-full"
                      : "translate-x-full"
                  } absolute w-full bg-gradient-to-r from-green-400 to-blue-500 p-6 mb-3 rounded-xl shadow-xl border border-dashed border-gray-600 text-gray-100`}
                  style={{ transition: "transform 0.5s ease-in-out" }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Train Ticket</h3>
                    <p className="text-sm text-gray-200">PNR: {ticket.ticketNumber}</p>
                  </div>
                  <hr className="border-t border-dotted border-gray-200 my-4" />
                  <div className="flex justify-between">
                    <div>
                      <p className="text-lg text-gray-200">
                        <strong>Train:</strong> {ticket.train}
                      </p>
                      <p className="text-lg text-gray-200">
                        <strong>Class:</strong> {ticket.classType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-200">
                        Issued to:{" "}
                        <span className="text-white">{user.name}</span>
                      </p>
                      <button
                        onClick={() => {
                          setTicketToCancel(ticket.ticketNumber);
                          setIsDialogOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm mt-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 p-2 rounded-full focus:outline-none"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 p-2 rounded-full focus:outline-none"
            >
              ❯
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No tickets found.</p>
        )}
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this ticket?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-400 text-white rounded px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCancel(ticketToCancel)}
                className={`bg-red-500 text-white rounded px-4 py-2 ${
                  isCanceling ? "opacity-50 cursor-not-allowed" : ""
                }`} // Disable button if canceling
                disabled={isCanceling} // Disable the button while canceling
              >
                {isCanceling ? "Cancelling..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="fixed bottom-[10%] left-[50%] transform -translate-x-[50%] bg-green-500 text-white p-4 rounded-lg shadow-lg z-[100] transition-opacity duration-[300ms] ease-in-out opacity-[0.9]">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default Profile;
 