import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (

    <button className="btn btn-outline-danger" onClick={() => logout({ returnTo: window.location.origin })}>
      Desconectarse
    </button>

  );
};


export default LogoutButton;