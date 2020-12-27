import React from 'react'
import { TextField } from '@material-ui/core';

interface TextinputProps {
   fullWidth: boolean,
   label: string,
   multiline: boolean,
   required: boolean,
   rows: number,
   value: string,
   type: string,
   onChange?: any,
};

const Textinput = ({ fullWidth, label, multiline, required, rows, value, type, onChange }: TextinputProps) => {
   return (
      <TextField
         fullWidth={fullWidth} label={label} margin="dense" multiline={multiline}
         required={required} rows={rows} value={value} type={type} onChange={(e) => onChange(e)}
      />
   )
};

export default Textinput;