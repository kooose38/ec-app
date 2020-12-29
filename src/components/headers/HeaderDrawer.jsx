import React, { useState, useCallback } from 'react';
import PersonIcon from "@material-ui/icons/Person"
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Textinput } from '../UIkit';
import { ExitToApp } from '@material-ui/icons';
import { push } from 'connected-react-router';
import { signout } from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
   drawer: {
      [theme.breakpoints.up("sm")]: {
         flexShrink: 0,
         width: 256
      },
   },
   toolbar: theme.mixins.toolbar,
   drawerPaper: {
      width: 256
   },
   searchField: {
      alignItems: "center",
      displa: "flex",
      marginLeft: 32,
   }
}));

const HeaderDrawer = (props) => {
   const dispatch = useDispatch();

   const classes = useStyles("");
   const [key, setKey] = useState()
   const inputKey = useCallback((e) => {
      setKey(e.target.value)
   }, []);

   const selectMenu = (e, path) => {
      dispatch(push(path))
      props.onClose(e)
   };

   const menus = [
      { fn: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "registar", value: "/edit" },
      { fn: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/history" },
      { fn: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/mypage" },
   ];

   return (
      <nav className={classes.drawer}>
         <Drawer
            {...props}
            variant="temporary"
            anchor="right"
            className={classes.drawerPaper}
            ModalProps={{ keepMounted: true }}
         >
            <div className={classes.searchField}>
               <Textinput
                  fullWidth={false} label={"検索"} multiline={false} required={false}
                  rows={1} value={key} type={"text"} onChange={inputKey}
               />
               <IconButton>
                  <SearchIcon />
               </IconButton>
            </div>
            <Divider />
            <List>
               {
                  menus.map(menu =>
                     <ListItem key={menu.id} button onClick={(e) => menu.fn(e, menu.value)}>
                        <ListItemIcon>
                           {menu.icon}
                        </ListItemIcon>
                        <ListItemText primary={menu.label} />
                     </ListItem>
                  )
               }
               <ListItem button key="logout" onClick={() => dispatch(signout())}>
                  <ListItemIcon>
                     <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"}></ListItemText>
               </ListItem>
            </List>
         </Drawer>
      </nav>
   )
};

export default HeaderDrawer;