import React ,{createContext,useContext,useState} from 'react';

//Create context
const DropdownContext = createContext();

//Provider Component

export const DropdownProvider = ({children}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);


    const toggleDropdown =()=>{
      
        setDropdownOpen((prev)=>!prev);
      
    };


    const closeDropdown=()=>setDropdownOpen(false);
    

    console.log("DropdownProvider Initialized", { isDropdownOpen, toggleDropdown });

    return (
        <DropdownContext.Provider value={{isDropdownOpen,toggleDropdown,closeDropdown}}>
            {children}
        </DropdownContext.Provider>
    );
};

//Custom Hook for easier access

export const useDropdown = ()=>{
    const context = useContext(DropdownContext);
    return context;
};