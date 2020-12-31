import {
   Table, TableContainer, Paper, TableBody, TableCell, TableHead, TableRow, IconButton
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState, useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";
import { Textinput } from '../UIkit';

const useStyles = makeStyles({
   iconCell: {
      height: 42,
      width: 42,
   },
   check: {
      float: "right",
   }
})

const SetSizeArea = ({ sizes, setSizes }) => {
   const classes = useStyles();

   const
      [index, setIndex] = useState(0),
      [size, setSize] = useState(""),
      [quantity, setQuantity] = useState(0);


   const inputSize = useCallback((e) => {
      setSize(e.target.value);
   }, [setSize]);
   const inputQuantity = useCallback((e) => {
      setQuantity(e.target.value);
   }, [setQuantity]);

   const addSizes = (size, quantity, index) => {
      if (size === "" || quantity === "") {
         alert("未入力です。")
         return;
      }
      if (quantity < 0) {
         alert("不正な値です。")
         return;
      }
      if (index === sizes.length) {
         const newSizes = {
            size: size,
            quantity: parseInt(quantity, 10),
         }
         setSizes(prevState => [...prevState, newSizes])
         setIndex(index + 1)
         setSize("")
         setQuantity(0)

      } else {
         const initialSize = sizes;

         initialSize[index].size = size
         initialSize[index].quantity = quantity
         sizes[index] = initialSize[index]

         setSizes(sizes)
         setIndex(sizes.length)
         setSize("")
         setQuantity(0)
      }
   };

   const deleteSize = (i) => {
      // const newSizes = sizes.filter((size, index) => index !== i);
      const index = sizes.findIndex((size, index) => index === i);
      sizes.splice(index, 1);

      setSizes([...sizes]);
      setIndex(sizes.length - 1);
   };

   const editSize = (size, quantity, index) => {
      setSize(size);
      setQuantity(quantity);
      setIndex(index);
   };


   return (
      <div>
         {/* <pre>{JSON.stringify({ size, quantity, index }, null, 4)}</pre> */}
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>サイズ</TableCell>
                     <TableCell>数量</TableCell>
                     <TableCell className={classes.iconCell}></TableCell>
                     <TableCell className={classes.iconCell}></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {sizes.length !== 0 && (
                     sizes.map((size, index) =>
                        <TableRow key={index.toString()}>
                           <TableCell>{size.size}</TableCell>
                           <TableCell>{size.quantity}</TableCell>
                           <TableCell>
                              <IconButton className={classes.iconCell}>
                                 <Edit onClick={() => editSize(size.size, size.quantity, index)} />
                              </IconButton>
                           </TableCell>
                           <TableCell>
                              <IconButton className={classes.iconCell}>
                                 <Delete onClick={() => deleteSize(index)} />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     )
                  )}
               </TableBody>
            </Table>
            <div>
               <Textinput
                  fullWidth={false} label={"サイズ"} rows={1} required={true}
                  type={"text"} value={size} onChange={inputSize}
               />
               <Textinput
                  fullWidth={false} label={"サイズ"} rows={1} required={true}
                  type={"number"} value={quantity} onChange={inputQuantity}
               />
            </div>
            <IconButton className={classes.check}>
               <CheckIcon onClick={() => addSizes(size, quantity, index)} />
            </IconButton>
         </TableContainer>
      </div>
   );
}

export default SetSizeArea;