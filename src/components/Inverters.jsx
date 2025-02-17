import React, { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavBar";
import { invertersDataContext } from "../context/InvertersDataContext/InvertersDataContext";


const InvertersData = () => {
  const { inverterDetail, inverterData } = invertersDataContext();
  const [selectedInverterId, setSelectedInverterId] = useState(() => {
    const savedInverterId = sessionStorage.getItem("selectedInverterId");
    return savedInverterId ? savedInverterId : "Select"; 
  }); 
  // Set default selected inverter ID based on the first element of inverterDetail
  useEffect(() => {
    if (selectedInverterId === "" && inverterDetail && inverterDetail.length > 0) {
      const defaultInverter = inverterDetail[0].inverter_id;
      setSelectedInverterId(defaultInverter); // Set inverter_id from the first inverter if no saved value
      console.log('Default Inverter ID:', defaultInverter); // Log the default inverter ID
    }
  }, [inverterDetail]);

  // Handle dropdown change and log the selected inverter ID
  const handleInverterChange = (e) => {
    const selectedId = e.target.value;
    setSelectedInverterId(selectedId); // Update selected inverter_id
    sessionStorage.setItem("selectedInverterId", selectedId);
    console.log('Selected Inverter ID:', selectedId); // Log the selected inverter ID
  };

  return (
    <div className="min-w-full bg-white h-screen flex flex-col">
      <MobileNavbar />
      <div className="px-4 flex justify-between items-center mt-10">
      <h2 className="text-xl font-bold  px-4">Inverters</h2>
      <select
          value={selectedInverterId} 
          onChange={handleInverterChange} // Handle the selection change
          className="mt-2 px-4 py-2 text-gray-500 font-semibold rounded bg-gray-300 text-sm"
        >
          {inverterDetail.map((inverter) => (
            <option key={inverter.inverter_id} value={inverter.inverter_id}>
              {inverter.inverter_name}
            </option>
          ))}
        </select>
      </div> 
      <div className="px-4 w-full min-w-full">
        {selectedInverterId===inverterData.inverter_id && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Power Output Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-blue-100">
              <h2 className="font-bold text-lg">Power Output</h2>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Power Output: {inverterData.power_output} kW</p>
              <p className="text-sm text-gray-500 font-semibold">Total Energy Generated: {inverterData.total_energy_generated} kWh</p>
            </div>

            {/* Voltage Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-green-100">
              <h2 className="font-bold text-lg">Voltage</h2>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Input Voltage: {inverterData.input_voltage} V</p>
              <p className="text-sm text-gray-500  font-semibold">Output Voltage: {inverterData.output_voltage} V</p>
            </div>

            {/* Current Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-yellow-100">
              <h2 className="font-bold text-lg">Current</h2>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Output Current: {inverterData.output_current} A</p>
              <p className="text-sm text-gray-500  font-semibold">Frequency: {inverterData.frequency} Hz</p>
            </div>

            {/* Efficiency Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-orange-100">
              <h2 className="font-bold text-lg">Efficiency</h2>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Efficiency: {inverterData.efficiency} %</p>
            </div>

            {/* Temperature Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-red-100">
              <h2 className="font-bold text-lg">Temperature</h2>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Inverter Temperature: {inverterData.temperature} °C</p>
            </div>

            {/* Battery Status Card */}
            <div className="card p-4 border rounded-lg shadow-lg bg-purple-100">
              <h2 className="font-bold text-lg">Battery Status</h2>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Battery Voltage: {inverterData.battery_voltage} V</p>
              <p className="text-sm text-gray-500  font-semibold">Battery Current: {inverterData.battery_current} A</p>
              <p className="text-sm text-gray-500  font-semibold">Battery Capacity: {inverterData.battery_capacity} Ah</p>
              <p className="text-sm text-gray-500  font-semibold">State of Charge: {inverterData.battery_state_of_charge} %</p>
              <p className="text-sm text-gray-500  font-semibold">Battery Health: {inverterData.battery_health} %</p>
              <p className="text-sm text-gray-500  font-semibold">Battery Temperature: {inverterData.battery_temperature} °C</p>
              <p className="text-sm text-gray-500  font-semibold">Battery Status: {inverterData.battery_status}</p>
              <p className="text-sm text-gray-500  font-semibold">Battery Cycles: {inverterData.battery_cycles}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvertersData;
