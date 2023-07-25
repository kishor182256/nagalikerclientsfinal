import React, { useEffect, useState } from "react";
import {
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@material-ui/core";

const AppointmentPop = ({
  data,handlePrint,
  handleEdit,
  handleDelete,
  handleAssign,
  handleView,
  handleBarcode,
  handleVerify,sample,
  handleEntry,payment,
  viewReport,investigate
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [path, setPath] = useState("");
  const [dynamic,setDynamic] = useState("")


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>{/* <MoreVertIcon /> */}</IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {investigate &&<MenuItem
          onClick={() => {
            handleDelete(data);
            handleClose();
          }}
        >
          <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>}

        {sample && (
          <>
            <MenuItem
              onClick={() => {
                handleEdit(data);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleAssign(data._id);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Update" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleBarcode();
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="PrintBarcode" />
            </MenuItem>
          </>
        )}

        {payment && (
          <>
            <MenuItem
              onClick={() => {
                handleEdit(data);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handlePrint(data._id);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Print" />
            </MenuItem>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AppointmentPop;
