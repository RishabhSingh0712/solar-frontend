import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import { initializeSocket, getSocket } from "../../socket";

const InvertersDataContext = createContext();

export const InvertersDataProvider = ({ children }) => {
  const userId =  sessionStorage.getItem('userId');
const plantId = sessionStorage.getItem('plantId');
  const { user } = useAuth();
  const [inverterDetail, setInverterDetail] = useState([]);
  const [inverterData, setInverterData] = useState(() => {
    const savedInverterData = sessionStorage.getItem('inverterData');
    return savedInverterData ? JSON.parse(savedInverterData) : {};
  });

  // Fetch plants
  const fetchPlants = async () => {
    const requestBody = {
      customer_id:userId===null? user?._id:userId,
    };
    try {
      const response = await axios.post("https://solar-monitoring-api.onrender.com/api/user/get-plant", requestBody);
      if (response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          fetchPlantsInverter(plantId===null?response.data.data[0]["plant_id"]:plantId);
        } else {
          console.log("No plants found for the customer");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch inverters based on plant id
  const fetchPlantsInverter = async (plant_id) => {
    const requestBody = {
      plant_id: plant_id,
    };
    try {
      const response = await axios.post("https://solar-monitoring-api.onrender.com/api/inverters/get-all-inverter", requestBody);
      if (response.status === 200) {
        setInverterDetail(response.data.data || []);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // Setup real-time socket data for inverters
  useEffect(() => {
    if (!getSocket()) {
      initializeSocket();
    }

    const socket = getSocket();
    if (socket) {
      const userId =  sessionStorage.getItem('userId');
      socket.on("sendInvertersData", (data) => {
        if (userId===null?user?._id:userId === data.customer_id) {
          setInverterData(data);
            // Store the updated inverterData in sessionStorage
            sessionStorage.setItem('inverterData', JSON.stringify(data));
        }
      });
    }

    // Cleanup socket listeners
    return () => {
      if (socket) {
        socket.off("sendInvertersData");
      }
    };
  }, [user]);

  return (
    <InvertersDataContext.Provider value={{ inverterDetail, inverterData }}>
      {children}
    </InvertersDataContext.Provider>
  );
};

export const invertersDataContext = () => {
  const context = useContext(InvertersDataContext);
  if (!context) {
    throw new Error("invertersDataContext must be used within an InvertersDataProvider");
  }
  return context;
};
