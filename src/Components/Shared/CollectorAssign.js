import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { InputLabel, List, ListItemText } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { formStyles } from "../../Styles/Formstyle";
import Buttons from "./Buttons";
import axios from "axios";
import { API } from "../../config";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const AssignCollector = ({ assign, setAssign, patienceId }) => {
  const classes = formStyles();
  const [rows, setRows] = useState();
  const [collectorId, setCollector] = useState();


  const handleClickOpen = () => {
    setAssign(true);
  };
  const handleClose = () => {
    setAssign(false);
  };

  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/getcollectorlist`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data.data.collector);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const assignCollector = async (event) => {
    event.preventDefault();
    const data = await axios.post(
      `${API}/assigncollection`,
      { patienceId, collectorId },
      {
        headers: { authtoken: `${TOKEN}` },
      }
    );
    console.log(data);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: "20%",
      },
    },
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title2"
        open={assign}
        maxWidth="400px" 
        maxHeight="300px"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title2"
          onClose={handleClose}
        >
          Assign Sample collection
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={assignCollector}>
            <div className={classes.formMain}>
              <div>Test information </div>
              <FormControl
                style={{
                  margingLeft: "8px",
                  "&.MuiInputLabel-shrink": {
                    transform: "translate(0, 1.5px) scale(0)",
                  },
                  "&.MuiFormLabel-root": {
                    padingRight: "8px",
                  },
                }}
              >
                <InputLabel
                  id="demo-multiple-checkbox-label2"
                  style={{
                    width: "40%",
                    "&.MuiInputLabel-shrink": {
                      transform: "translate(0, 1.5px) scale(0)",
                    },
                    "&.MuiInputLabel": {
                      transition: "none",
                      padingRight: "8px",
                    },
                    "&.PrivateNotchedOutline-legendLabelled-39 > span": {
                      display: "none",
                    },
                  }}
                >
                  Select
                </InputLabel>
                <Select
                  className={classes.selectInput}
                  placeholder="Select"
                  label="Select"
                  value={collectorId}
                  onChange={(e) => setCollector(e.target.value)}
                >
                  {rows?.map((row, i) => {
                    return (
                      <MenuItem
                        key={row._id}
                        value={row._id}
                        style={{ backgroundColor: "transparent",
                        display:'flex',
                        justifyContent: 'space-between'
                        ,width:'100%'}}
                      >
                        {row.name}
                        &nbsp;&nbsp;&nbsp;
                        {row.location}
                      </MenuItem>
                    );
                  })}
                </Select>
                <div className={classes.formDiv4}>
                  <Buttons
                    className={classes.cancelButton}
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Buttons>
                  <Buttons
                    className={classes.submitButton}
                    type="submit"
                  >
                    Submit
                  </Buttons>
                </div>
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default AssignCollector;
