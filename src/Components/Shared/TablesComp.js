 import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Avatar, Button } from '@material-ui/core';
 
 const TablesComp = ({className, children}) => {
   return (
    <Table className={className}>
    <TableHead className={className}>
      <TableRow >
        <TableCell className={className}> {children} </TableCell>
        <TableCell className={className}> {children} </TableCell>
        <TableCell className={className}> {children} </TableCell>
        <TableCell className={className}> {children} </TableCell>
        <TableCell className={className}> {children} </TableCell>
        <TableCell className={className}> {children} </TableCell>
        <TableCell className={className}> {children} </TableCell>
      </TableRow>
    </TableHead>

    
    <TableBody>
        <TableRow>
          <TableCell component="th" scope="row" className={className}>
          </TableCell>
          <TableCell className={className}>
          </TableCell>
          <TableCell className={className}>
          </TableCell>
          <TableCell className={className}>
          </TableCell>
          <TableCell className={className}>
          </TableCell>
          <TableCell className={className}>
          </TableCell>
          <TableCell className={className}>
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
   )
 }
 
 export default TablesComp;
