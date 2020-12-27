import React, { Component } from 'react';
import {
   InputLabel, MenuItem, FormControl, Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"

export interface categoriesProps {
   id: string,
   name: string
};


interface SelectboxProps {
   label: string,
   required: boolean,
   value: string,
   options: categoriesProps[],
   onChange: any
};

const useStyles = makeStyles({
   formControl: {
      marginBottom: 16,
      minWidth: 128,
      width: "100%"
   }
})

const SelectBox = ({ label, required, value, onChange, options }: SelectboxProps) => {
   const classes = useStyles()
   return (
      <FormControl className={classes.formControl}>
         <InputLabel>{label}</InputLabel>
         <Select
            required={required} value={value} onChange={(e) => onChange(e)}
         >
            {options.map(option =>
               <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
            )}
         </Select>
      </FormControl>
   );
}

export default SelectBox;