import React, { useEffect } from "react";
import { toPng } from "html-to-image";
import axios from "axios";
import { useSelector } from "react-redux";

const GenerateImage = ({ train, classType, passengerNames, pnr }) => {
  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    const addTicket = async () => {
      try {
        const response = await axios.put("http://localhost:3001/addticket", {
          train,
          classType,
          passengerNames,
          username,
          email,
          pnr,
        });
        console.log("Successful put:", response.data);
      } catch (err) {
        console.error("Error adding ticket:", err);
      }
    };

    addTicket(); 
  }, [train, classType, passengerNames, username, email, pnr]); 

  const captureTicket = () => {
    const ticketDetails = document.getElementById("ticketDetails");
    toPng(ticketDetails)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "ticket.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  return (
    <div>
      <div
        id="ticketDetails"
        className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border-2 border-gray-300"
        style={{ width: "400px", height: "250px" }} 
      >
        <h2 className="text-center text-2xl font-bold mb-2">Train Ticket</h2>
        <p className="text-lg mb-1">
          <strong>Train:</strong> {train}
        </p>
        <p className="text-lg mb-1">
          <strong>Class:</strong> {classType}
        </p>
        <p className="text-lg mb-1">
          <strong>Ticket No:</strong> {pnr}
        </p>
        <p className="text-lg mb-1">
          <strong>Passengers:</strong>
        </p>
        <ul className="list-inside mb-4">
          {passengerNames.map((name, index) => (
            <li key={index} className="text-lg">
              {name}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={captureTicket}
        className="mt-10 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        Download Ticket
      </button>
    </div>
  );
};

export default GenerateImage;
