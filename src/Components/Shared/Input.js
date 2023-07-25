import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ label, value, onChange, className, placeholder,type,name,disabled,maxLength }) => {
  return (
    <TextField
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      variant="outlined"
      margin="normal"
      type={type}
      name={name}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
}
export default Input;