import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { serAuthorizationToken } from "../../api/api";

export default function ProtectedRout({ children }) {
  const tokenRedux = useSelector((state) => state?.token); 
  console.log(tokenRedux)
  const token=localStorage.getItem("token")
    if(token){
      serAuthorizationToken(tokenRedux)
      return <>{children}</>;
    }else{
      return <Navigate to={"/login"} />;
    }
}

