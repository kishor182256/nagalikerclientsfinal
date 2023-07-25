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
import Input from "./Input";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

const EditSample = ({ assign, setAssign, id }) => {
  const classes = formStyles();
  const [sampleno, setSampleno] = useState();
  const [sampleType, setSampleType] = useState();
  const [sampleStatus, setsamplestatus] = useState("");
  const [suffix, setSuffix] = useState("");

  const {phone} = useParams();
  

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const formattedTime = `${currentHour
    .toString()
    .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

  const handleClickOpen = () => {
    setAssign(true);
  };
  const handleClose = () => {
    setAssign(false);
  };

  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);

  

  const TOKEN = localStorage.getItem("logintoken");

  const assignCollector = async (event) => {
    event.preventDefault();
    const data = await axios.put(
      `${API}/edit-collection`,
      { id,sampleno,sampleType,date,time,sampleStatus,phone},
      {
        headers: { authtoken: `${TOKEN}` },
      }
    );
    if(data.data.message === "Sample collection updated");
      toast.success("Sample collection updated")
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
          Edit Sample collection
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={assignCollector}>
            <div className={classes.formMain}>
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
                <div className={classes.formLable}>Sample No</div>
                <Input
                  type="number"
                  placeholder="Enter Id"
                  className={classes.formInput}
                  name="patId"
                  value={sampleno}
                  onChange={(e) => setSampleno(e.target.value)}
                />
                <div className={classes.formLable}>Sample name</div>
                <FormControl>
                  <Select
                    className={classes.selectInput}
                    value={sampleType}
                    onChange={(e) => setSampleType(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <p>Select</p>
                    </MenuItem>
                    <MenuItem value="blood">Blood</MenuItem>
                    <MenuItem value="urine">Urine</MenuItem>
                  </Select>
                </FormControl>{" "}
                <div className={classes.formLable}>Suffix</div>
                <Input
                  type="text"
                  placeholder="Enter Suffix"
                  className={classes.formInput}
                  name="suffix"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                />
                <div className={classes.formLable}>Sample status</div>
                <FormControl>
                  <Select
                    className={classes.selectInput}
                    value={sampleStatus}
                    onChange={(e) => setsamplestatus(e.target.value)}
                  >
                    <MenuItem value="">
                      <p>Select</p>
                    </MenuItem>
                    <MenuItem value="collected">Collected</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </FormControl>{" "}
                <div className={classes.formLable}>Visit Schedule Date</div>
                <Input
                  type="date"
                  placeholder={formattedDate}
                  className={classes.formInput}
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={formattedDate}
                />
                <div className={classes.formLable}>Visit Time</div>
                <Input
                  type="time"
                  placeholder={formattedTime}
                  className={classes.formInput}
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <div className={classes.formDiv4}>
                  <Buttons
                    className={classes.cancelButton}
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Buttons>
                  <Buttons className={classes.submitButton} type="submit">
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

export default EditSample;
