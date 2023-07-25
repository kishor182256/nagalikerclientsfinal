import React from 'react'
import { Button } from '@material-ui/core'; 

const Buttons = ({className, type, value, children,onClick,disabled}) => {
  return (
    <Button 
    disabled={disabled}
    onClick={onClick}
    className={className} 
    type={type} 
    value={value}
    variant="contained"
    > {children} </Button>
  )
}

export default Buttons