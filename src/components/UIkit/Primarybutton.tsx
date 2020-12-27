import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { Component } from 'react'

const useStyles = makeStyles({
   button: {
      backgroundColor: "#333",
      color: "#fff",
      fontSize: "14px",
      marginBottom: "16px",
      height: "48px",
      width: "256px"
   }
});

interface PrimarybuttonProps {
   label: string,
   onClick?: any
};

const Primarybutton = ({ label, onClick }: PrimarybuttonProps) => {
   const classes = useStyles();
   return (
      <Button className={classes.button} variant="contained" onClick={onClick}>
         {label}
      </Button>
   )
}

export default Primarybutton;