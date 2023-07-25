import React, { useEffect, useState } from "react";
import {
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@material-ui/core";

const PopoverMenu = ({
  data,
  handleEdit,
  handleDelete,
  handleAssign,
  handleView,
  handlePreview,
  handleVerify,
  handleEntry,
  viewReport,visit
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [path, setPath] = useState("");
  const [dynamic,setDynamic] = useState("")


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const urlValue = () => {
    const path = window.location.pathname;
    if (path.startsWith("/patient-report/")) {
      const phone = path.split("/")[2];
      setPath(path);
      setDynamic(path)
    } else {
      const extractedValue = path.split("/").pop();
      setPath(extractedValue);
    }
  };

  useEffect(() => {
    urlValue();
  }, [path]);

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
        <MenuItem onClick={() => handleEdit(data)}>
          <ListItemIcon>{/* <Edit /> */}</ListItemIcon>
          {!visit && <ListItemText primary="Edit" />}
        </MenuItem>
        {path !== dynamic &&<MenuItem
          onClick={() => {
            handleDelete(data);
            handleClose();
          }}
        >
          <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>}

        {path === "list-patience" && (
          <>
            <MenuItem
              onClick={() => {
                handleView(data);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="View" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleAssign(data._id);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Assign" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                viewReport(data._id);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Report" />
            </MenuItem>
          </>
        )}

        {path === dynamic && (
          <>
            <MenuItem
              onClick={() => {
                handleEntry(data);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Entry" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleVerify(data._id);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Verify" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                handlePreview(data._id);
                handleClose();
              }}
            >
              <ListItemIcon>{/* <Delete /> */}</ListItemIcon>
              <ListItemText primary="Preview" />
            </MenuItem>
          </>
        )}
      </Popover>
    </div>
  );
};

export default PopoverMenu;
