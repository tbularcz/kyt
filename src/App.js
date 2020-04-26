import React,{ Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Appbar from './components/Appbar.js';
import SignIn from './pages/Signin.js';






//import './App.css';


class App extends Component {

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <SignIn />
      </React.Fragment>
    );
  }
}

export default App;
