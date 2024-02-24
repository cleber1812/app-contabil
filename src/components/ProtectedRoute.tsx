// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import isAuthenticated from './IsAuthenticated';

const ProtectedRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
    const isUserAuthenticated = isAuthenticated();
  
    return isUserAuthenticated ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/login" replace />
    );
  };
  
  export default ProtectedRoute;