import React, { Component } from 'react';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
   row: {
      display: "flex",
      flexFlow: "row wrap",
      marginBottom: 16
   },
   lable: {
      marginLeft: 0,
      marginRight: "auto"
   },
   value: {
      fontWeight: 600,
      marginLeft: "auto",
      marginRight: 0,
   }
})

const TextDetail = ({ lable, value }) => {
   const classes = useStyles();
   return (
      <div className={classes.row}>
         <div className={classes.lable}>
            {lable}
         </div>
         <div className={classes.value}>
            {value}
         </div>
      </div>
   );
}

export default TextDetail;