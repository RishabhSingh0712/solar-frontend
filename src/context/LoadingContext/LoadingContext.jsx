import React,{createContext,useEffect,useState,useContext} from 'react';
const LoadingContext = createContext();
export const LoadingProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
 

    return (
        <LoadingContext.Provider value={{ loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () =>{
    const context = useContext(LoadingContext);
    if (!context) {
      console.log("useLoading must be used within a LoadingProvider");
      }
      return context;
}