import {
   Table, TableContainer, TableBody, TableCell, TableRow, IconButton
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import React, { useState, useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";
import { Textinput } from '../UIkit';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
   iconCell: {
      height: 48,
      width: 48,
      padding: 0,
   }
})

const SizeTable = ({ sizes, addProduct }) => {
   const classes = useStyles()
   return (
      <TableContainer>
         <Table>
            <TableBody>
               {sizes.length > 0 &&
                  sizes.map(size =>
                     <TableRow key={size.size}>
                        <TableCell component="th" scope="row">
                           {size.size}
                        </TableCell>
                        <TableCell>
                           残り{size.quantity}点
                           </TableCell>
                        <TableCell className={classes.iconCell}>
                           {size.quantity > 0 ? (
                              <IconButton onClick={() => addProduct(size.size)}>
                                 <ShoppingCartIcon />
                              </IconButton>
                           ) : (
                                 <div>売り切れ</div>
                              )}
                        </TableCell>
                        <TableCell className={classes.iconCell}></TableCell>
                     </TableRow>
                  )
               }
            </TableBody>
         </Table>
      </TableContainer>


   )
};

export default SizeTable;