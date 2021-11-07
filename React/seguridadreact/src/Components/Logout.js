import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (

    <button className="btn btn-outline-danger" onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </button>

    // <div>
    //   <GoogleLogout 
    //     clientId={clientId}
    //     buttonText="Cerrar Sesion"
    //     onLogoutSuccess={onSuccess}
    //   ></GoogleLogout>
    // </div>

  );
};


// import { GoogleLogout } from 'react-google-login';

// const clientId =
//   '121128626643-l5809pj151tkvtg67i4fg6ga82rsu3ji.apps.googleusercontent.com';

// function Logout() {
//   const onSuccess = () => {
//     console.log('Logout made successfully');
//     alert('Logout made successfully ✌');
//   };

//   return (
//     <div>
//       <GoogleLogout 
//         clientId={clientId}
//         buttonText="Logout"
//         onLogoutSuccess={onSuccess}
//       ></GoogleLogout>
//     </div>
//   );
// }

export default LogoutButton;