import React from "react";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faCalendarAlt,faClock, faCloud, faGauge, faMapMarkerAlt, faSolarPanel, faSun, faThermometerFull, faThunderstorm, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from "../asset/images/solar-panel-dashboard.jpg";
import { faWater } from "@fortawesome/free-solid-svg-icons/faWater";
import MobileNavbar from "./MobileNavBar";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import DashboardGraphs from "./UserDashboardGraph";
import {initializeSocket, getSocket } from '../socket';
import { useState,useEffect } from "react";
import {motion} from 'framer-motion';
import {useActiveTab} from '../context/ActiveTab/ActiveTab'
import { useAuth } from "../context/AuthContext/AuthContext";
import { useUserPlant } from "../context/UserPlantContext/UserPlantContext";
import Loader from "./Loader";
import InvertersData  from "./Inverters";
import axios from "axios";
import Lottie from 'react-lottie';
import SolarGif from '../asset/round_solar.json'
const UserDashBoard = () => {
const userId =  sessionStorage.getItem('userId');
  const navigate = useNavigate();
  const { activeTab, setActiveTab } =useActiveTab();
  const {token,user,loading}=useAuth();
  // const {selectedData} = useUserPlant();
  // console.log('selectedData',selectedData);
  console.log('on UserDashBoard user',user?._id);
  console.log('user role :',user.role);
    const [inverterData, setInverterData] = useState({});
    const [sensorsData, setSensorsData] = useState({ humidity: "NA", temperature: "NA" });
    const [userPlantDetail,setUserPlantDetail]= useState({})
    const [invertersLength,setInvertersLength] = useState(0);

    const handleNavigation=()=>{
      
      if(invertersLength > 0 && userId===null){
        setActiveTab('inverters');
        navigate('/inverters',-1);
      }else if(invertersLength > 0 && userId!==null){
        navigate('/inverters',-1);
        
      }else{
        console.log('No inverters there');
      }
      
    }
    const fetchPlants =async()=>{
      console.log('userId',userId);
      const requestBody= {

        customer_id:userId===null?user?._id:userId
      }
      console.log('request body userdashboard',requestBody)
      try {
    const response= await axios.post('https://solar-monitoring-api.onrender.com/api/plants/get-plant',requestBody);
    if(response.status===200){
      console.log('response is ',response.data.data[0])
      if (response.data.data  && response.data.data.length > 0) {
        fetchPlantsInverter(response.data.data[0]['plant_id']);
        setUserPlantDetail(response.data.data[0]); // Set the first plant data into the state
        console.log(userPlantDetail)
      } else {
        console.log('No plants found for the customer');
      }
      
    }else{
      console.log('response',response);
    }
      } catch (error) {
        console.log(error.message);
      }
    }

    const fetchPlantsInverter =async(plantId)=>{
      const requestBody= {
        plant_id:plantId
      }
      console.log('request body userdashboard for inverters of plants',requestBody)
      try {
    const response= await axios.post('https://solar-monitoring-api.onrender.com/api/inverters/get-all-inverter',requestBody);
    if(response.status===200){
      console.log('response of inverters length for plants',response.data.data.length)
     
       setInvertersLength(response.data.data.length)
       console.log(response.data.data[0]['inverter_id'])
      
      
    }else{
      console.log('response status',response.status);
    }
      } catch (error) {
        console.log(error.message);
      }
    }
   
console.log('on UserDashBoard token',token);
   
    useEffect(() => {
      fetchPlants();
      // Initialize socket only if it hasn't been initialized yet
      if (!getSocket()) {
        initializeSocket();
      }
    
      const socket = getSocket();
    
      // Ensure socket is defined before setting up listeners
      if (socket) {
        // Listen for real-time data from server
        // socket.on("sendInvertersData", (data) => {
        //   console.log("Received inverter data:", data);
        //   if (user?._id === data.customer_id) {
        //     console.log("Data matches customer:", data);
        //     setInverterData(data);
        //   }
        // });
    
        socket.on("sendSensorData", (data) => {
          console.log("Received sensors data:", data);
          if (user?._id === data.customer_id) {
            console.log("Data matches customer:", data);
            setSensorsData(data);
          }
        });
      }
    
      // Cleanup the socket listeners when the component unmounts
      return () => {
        if (socket) {
          socket.off("sendInvertersData");
          socket.off("sendSensorData");
        }
      };
    }, [user]);
    
    useEffect(() => {
      
      console.log('Updated userPlantDetail:', userPlantDetail.plant_name); // Log state after it updates
      console.log('inverters length',invertersLength)
    }, [userPlantDetail,invertersLength]); // 
  

    const animation = {
        hidden: { opacity: 0, y: 100 }, // Start off-screen to the left
        visible: { opacity: 1, y: 0 }, // Final state
      };
    
      const data = [
        { icon: faSun, value: "378.79Wh/m2", label: "Light intensity", duration: 3.2 },
        { icon: faThermometerFull, value: "21.88°C", label: "Panel Temperature", duration: 3.4 },
        { icon: faSun, value: "378.79Wh/m2", label: "Light intensity", duration: 3.6 },
        { icon: faThermometerFull, value: "21.88°C", label: "Temperature", duration: 3.8 },
        { icon: faCloud, value: "71.00%rh", label: "Humidity", duration: 4 },
        { icon: faWater, value: "2.6 m/s", label: "Wind", duration: 4.3 },
        { icon: faThunderstorm, value: "1013.25mb", label: "Current", duration: 4.6 },
        { icon: faPowerOff, value: "2.6 m/s", label: "Voltage", duration: 4.9 },
    ];

  if(loading){ 
    return (
    <Loader/>
    );
  }
    return (
        <div className="min-w-full bg-white h-screen flex flex-col">
            <MobileNavbar/>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-4 p-4">
  {/* First Grid Item */}
  <div className="flex flex-1 flex-col gap-2 h-full min-h-full">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="h-full object-cover rounded-lg p-2 bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-row gap-2 justify-center">
        <span>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg text-white" />
        </span>
        <span className="text-xs font-semibold overflow-auto max-w-full text-white">
          Bijnore Road, Royal City, Lucknow, Uttar Pradesh 226022
        </span>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-row justify-center items-center gap-2 min-w-64"
    >
      <div className="flex flex-col rounded-lg justify-center items-center py-2 w-1/2 border border-gray-200 bg-white">
        <span className="text-xs font-semibold">Total Panels</span>
        <span className="text-xs font-semibold">2</span>
      </div>
      <div className="flex flex-col rounded-lg justify-center items-center py-2 w-1/2 border border-gray-200 bg-white" onClick={handleNavigation}>
        <span className="text-xs font-semibold">Total Inverters</span>
        <span className="text-xs font-semibold">{invertersLength}</span>
      </div>
    </motion.div>
  </div>

  {/* Second Grid Item with Lottie animation */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2.5 }}
    className="flex flex-col gap-2 border border-gray-200 rounded-lg h-full min-h-full"
  >
    <div className="flex flex-row justify-between  p-4">
  <span className="text-sm font-semibold">
    Plant Details
    <FontAwesomeIcon icon={faChevronDown} className="text-[8px] ml-1 mb-[1.6px]" />
  </span>
  
  <div className="flex flex-col gap-1 items-end">
    {/* Date with Calendar Icon */}
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faCalendarAlt} className="text-sm text-gray-500" />
      <span className="text-sm text-center font-semibold text-gray-400">
        {new Date().toLocaleDateString()}
      </span>
    </div>

    {/* Time with Clock Icon */}
    {/* <div className="flex items-center gap-1">
      <FontAwesomeIcon icon={faClock} className="text-[12px] text-gray-500" />
      <span className="text-xs font-semibold text-gray-400">
        {new Date().toLocaleTimeString()}
      </span>
    </div> */}
  </div>
</div>


    <div className="flex flex-row items-center gap-8 justify-between p-4">
      {/* Plant Details on the left side */}
      <div className="flex flex-col gap-2 w-2/3">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-500">Plant Name</span>
          <span className="text-sm font-medium text-gray-400">{userPlantDetail.plant_name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-500">Plant Capacity</span>
          <span className="text-sm font-medium text-gray-400">{userPlantDetail.capacity_kw}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-500">Installed date</span>
          <span className="text-sm font-medium text-gray-400">
            {new Date(userPlantDetail.installation_date).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Lottie Animation on the right side */}
      <div className="flex  justify-center items-center">
        <Lottie options={{
          loop: true,
          autoplay: true,
          animationData: SolarGif,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }} height={150} width={150} />
      </div>
    </div>
  </motion.div>

  {/* Third Grid Item */}
  <div className="flex flex-1 flex-col gap-[14px] md:col-span-2 xl:col-span-1 h-full min-h-full">
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex border justify-center border-gray-200 rounded-lg py-2"
    >
      <span className="text-sm font-semibold">Current weather</span>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-2 mt-1">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="flex flex-row gap-4 items-center justify-center border border-gray-200 rounded-lg py-2 px-4"
        >
          <FontAwesomeIcon icon={item.icon} className="text-[20px]" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {item.label === "Humidity"
                ? sensorsData.humidity + "%"
                : item.label === "Temperature"
                ? sensorsData.temperature + "°C"
                : item.value}
            </span>
            <span className="text-xs font-semibold text-gray-200">{item.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>


            {/* Efficiency and yield section */}
            <div className="border border-gray-200 rounded-lg mx-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
                {[
                    { icon: faGauge, title: "Performance ratio", value: "69.1326%", bgColor: "bg-yellow-100" },
                    { icon: faSun, title: "CUF", value: "69.1326%", bgColor: "bg-purple-100" },
                    { icon: faTriangleExclamation, title: "Specific yield", value: "69.1326%", bgColor: "bg-blue-100" },
                    { icon: faSolarPanel, title: "Insolation today", value: "69.1326%", bgColor: "bg-green-100" },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col justify-center items-center gap-2 ${item.bgColor} rounded-lg py-2 min-w-[100px]`}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-[25px]" />
                        <span className="text-[14px] font-semibold text-gray-500">{item.title}</span>
                        <span className="text-[14px] font-semibold">{item.value}</span>
                    </motion.div>
                ))}
            </div>
        </div>
<div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center  rounded-lg mx-4 mt-4 ">
  <div className="w-full md:w-1/2 border border-gray-200 rounded-lg py-2 px-2 ">
    <div className=" w-full "> {/* Set height here */}
      <DashboardGraphs />
    </div>
  </div>
  <div className="w-full md:w-1/2 border border-gray-200 rounded-lg py-2 px-2">
    <div className=" w-full "> {/* Set height here */}
      <DashboardGraphs />
    </div>
  </div>
</div>
  



        </div>
    );
};

export default UserDashBoard;
