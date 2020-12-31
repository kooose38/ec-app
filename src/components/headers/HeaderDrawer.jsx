import React, { useEffect, useState, useCallback } from 'react';
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
import { db } from '../../firebase';

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
   const classes = useStyles();
   const dispatch = useDispatch();

   const
      [key, setKey] = useState(),
      [filters, setFilters] = useState([
         { fn: selectMenu, label: "すべて", id: "all", value: "/" },
      ]);

   //サイドバーの表示値を取得
   useEffect(() => {
      (async () => {
         const prev = [];
         await db.collection("categories").orderBy("order", "asc").get().then(snapshots => {
            snapshots.forEach(doc => {
               const data = doc.data();
               prev.push({
                  fn: selectMenu,
                  label: data.name,  //id,nameは同じ引数値
                  id: data.id,
                  value: `/?category=${data.id}`,
               })
            })
         })
         await db.collection("genders").orderBy("order", "asc").get().then(snapshots => {
            snapshots.forEach(doc => {
               const data = doc.data();
               prev.push({
                  fn: selectMenu,
                  label: data.name,
                  id: data.id,
                  value: `/?gender=${data.id}`,
               })
            })
         })
         setFilters(prevState => [...prevState, ...prev]);
      })()
   }, []);

   const inputKey = useCallback((e) => {
      setKey(e.target.value)
   }, [setKey]);

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
            <div onClose={(e) => props.onClose(e)} onKeyDown={(e) => props.onClose(e)}>
               <div className={classes.searchField} >
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
               <Divider />
               <List>
                  {
                     filters > 1 && (
                        filters.map(filter =>
                           <ListItem key={filter.id} button onClick={() => filter.fn(e, filter.path)}>
                              <ListItemText primary={filter.label} />
                           </ListItem>
                        ))
                  }
               </List>
            </div>
         </Drawer>
      </nav>
   )
};

export default HeaderDrawer;