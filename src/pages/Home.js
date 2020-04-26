import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import {Auth} from '../pages/Signin.js'
import { Redirect } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

const FlatButtons = props => {
  const { classes } = props;
  return (
    Auth.isAuthenticated ? (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          aria-label="add"
          className={classes.button}
        >
          <AddIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          aria-label="edit"
          className={classes.button}
        >
          <Icon>edit_icon</Icon>
        </Button>
        <Button
          variant="contained"
          disabled
          aria-label="delete"
          className={classes.button}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/",
      }}
    />)
  );
};

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FlatButtons);
