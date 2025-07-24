// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from './IsAuthenticated';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isUserAuthenticated = isAuthenticated();
  
    return isUserAuthenticated ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" replace />
    );
  };
  
  export default ProtectedRoute;