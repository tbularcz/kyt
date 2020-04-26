import React,{ useState, Component } from 'react';



export default function SetAuth() {
  const [User, SetUser] = useState(false)
  const handleLogin = e => {
    e.preventDefault();
    SetUser(true);
  }
}
