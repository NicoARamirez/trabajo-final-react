import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "@/components/context/AuthContext";

export function AdminRoute ({ children })  {
    const { user } = useAuth();
    
    const currentLocation = useLocation();
   
    const isAdmin = user?.role === 'admin';
    

    return isAdmin ? (
        children
    ) : (
        <Navigate to="/" state={{ from: currentLocation }} replace />
    );
}