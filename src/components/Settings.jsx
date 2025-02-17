import React,{useState} from "react";
import MobNavBar from "./MobileNavBar";
const Settings =()=>{
    
    return(
        <div className="max-w-full bg-gray-100">
               {/* Use MobileNavbar component */}
      <MobNavBar/>
<div className="flex  items-center justify-center">
<h1 className=" text-3xl font-bold ">Settings</h1>
</div>
     
        </div>
    );
}
export default Settings;