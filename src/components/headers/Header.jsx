import React, { useState, useCallback } from 'react';
import { HeaderMenus } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { getIsSignIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import HeaderDrawer from './HeaderDrawer';

const useStyles = makeStyles({
   root: {
      flexGrow: 1,
   },
   menuBar: {
      backgroundColor: "#333",
      color: "#fff"
   },
   toolBar: {
      margin: 0,
      maxWidth: 1024,
      width: "100%"
   },
   iconButton: {
      margin: "0 0 0 auto"
   }
});

const Header = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const isSignIn = getIsSignIn(state);

   const [open, setOpen] = useState(false);

   const handleToggle = useCallback((e) => {
      if (e.type === "keydown" && (e.key === "Tab" || e.key === "shift")) {
         return;
      }
      if (!open) {
         setOpen(true);
      } else {
         setOpen(false);
      }

   });


   return (
      <div className={classes.root}>
         <AppBar position="fixed" className={classes.menuBar}>
            <Toolbar className={classes.toolBar} >
               {/* <img alt="logo images" style={{ width: 128 }} /> */}
               <h3 style={{ fontWeight: "bold" }} onClick={() => dispatch(push("/"))}>EC APP</h3>
               {isSignIn && (
                  <div className={classes.iconButton}>
                     <HeaderMenus onClick={handleToggle} />
                  </div>
               )}
            </Toolbar>
         </AppBar>
         <HeaderDrawer open={open} onClose={handleToggle} />
      </div>
   )
};

export default Header;