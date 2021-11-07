import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';


export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn btn-outline-danger" onClick={() => loginWithRedirect()}> Login </button>
}
// import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

// const clientId =
//   '121128626643-l5809pj151tkvtg67i4fg6ga82rsu3ji.apps.googleusercontent.com';

// function Login() {
//   const onSuccess = (res) => {
//     console.log('Login Success: currentUser:', res.profileObj);
//     alert(
//       `Logged in successfully welcome ${res.profileObj.name}  \n See console for full profile object.`
//     );
//     // refreshTokenSetup(res);
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res:', res);
//     alert(
//       `Failed to login.`
//     );
//   };

//   return (
//     <div>
//       <GoogleLogin className="btn btn-outline-danger"
//         clientId={clientId}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//         style={{ marginTop: '100px' }}
//         isSignedIn={true}
//       />
//     </div>
//   );
// 
// import { GoogleLogin } from 'react-google-login';
// // refresh token
// // import { refreshTokenSetup } from '../utils/refreshToken';

// const clientId =
//   '121128626643-l5809pj151tkvtg67i4fg6ga82rsu3ji.apps.googleusercontent.com';

// function Login() {
//   const onSuccess = (res) => {
//     console.log('Login Success: currentUser:', res.profileObj);
//     alert(
//       `Logged in successfully welcome ${res.profileObj.name}  \n See console for full profile object.`
//     );
//     // refreshTokenSetup(res);
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res:', res);
//     alert(
//       `Failed to login.`
//     );
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Conectarse"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//         style={{ marginTop: '100px' }}
//         isSignedIn={true}
//       />
//     </div>
//   );
// }


export default LoginButton;