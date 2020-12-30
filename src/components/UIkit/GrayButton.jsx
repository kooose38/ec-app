import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Component } from 'react'

const useStyles = makeStyles((theme) => ({
   button: {
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "14px",
      marginBottom: "16px",
      height: "48px",
      width: "256px"
   }
}));


const GrayButton = ({ label, onClick }) => {
   const classes = useStyles();
   return (
      <Button className={classes.button} variant="contained" onClick={onClick}>
         {label}
      </Button>
   )
}

export default GrayButton;