import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Redirect, Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Home from "../pages/Home";
import Grid from "../pages/Grid";
import SignIn from "../pages/Signin";
import Signout from "../pages/Signout";
import PrivateRoute from "../pages/Signin";
import {Auth} from '../pages/Signin.js'

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick }) => (
    <Fragment>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
    <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                  paper: classes.drawerPaper
                }}
    >
      <div
        className={clsx({
          [classes.toolbarMargin]: variant === 'persistent'
        })}
      />
      <List>
        <ListItem button component={Link} to="/" onClick={onItemClick('Home')}>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/Grid" onClick={onItemClick('Page 2')}>
          <ListItemText>Admin</ListItemText>
        </ListItem>
      <ListItem button component={Link} to="/Signout" onClick={onItemClick('Logout')}>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </Drawer>


    <main className={classes.content}>
        <Route exact path="/" component={Home} />
        <Route path="/grid" component={Grid} />
        <Route path="/signout" component={Signout} />
    </main>
    </Router>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('Home');

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };


  return (
    Auth.isAuthenticated ?(
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />

    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
      }}/>
  )
  );
}

export default withStyles(styles)(AppBarInteraction);
