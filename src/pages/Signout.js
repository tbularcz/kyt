import React from 'react';
import {Auth} from './Signin.js'


import {
  useHistory,
  Redirect
} from "react-router-dom";

export default function AuthButton() {
  let history = useHistory();
  console.log(Auth.isAuthenticated)
  return Auth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          Auth.signout();
          history.push('/')
          return(<p>You are logged in </p>)
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are logged in </p>
  );
}
