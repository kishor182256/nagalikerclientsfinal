import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectOption = ({ label, id, value, placeholder, children }) => {
    
  return (
    <FormControl fullWidth>
      <InputLabel  id={id}>{children}</InputLabel>
      <Select
        className={className}
        label={label}
        id={id}
        value={value}
        placeholder={placeholder}
      >
        <MenuItem value={value}>{children}</MenuItem>
        <MenuItem value={value}>{children}</MenuItem>
        <MenuItem value={value}>{children}</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectOption