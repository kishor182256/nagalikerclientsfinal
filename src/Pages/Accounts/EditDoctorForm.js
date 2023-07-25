import React, { useEffect, useState } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { formStyles } from "../../Styles/Formstyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import Input from "../../Components/Shared/Input";
import { toast } from "react-toastify";

const EditDoctorForm = () => {
  const classes = formStyles();
  const [rows, setRows] = useState();
  const params = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const TOKEN = localStorage.getItem("logintoken");

  const fetchDoctor = async(e)=> {
    try {
      const data = await axios.get(`${API}/getdoctor/${params.id}`, {
        headers: { authtoken: `${TOKEN}` },
      });


      const { name, id, phone, email, status, location } = data.data.doctors
      ;
      setName(name);
      setId(id);
      setPhone(phone);
      setEmail(email);
      setStatus(status);
      setLocation(location);
     
    } catch (e) {
      console.error(e);
    }
  }


  useEffect(()=>{
    fetchDoctor()
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${API}/edit-doctor/${params.id}`,{id,phone,email,location,name,status}, {
        headers: { authtoken: `${TOKEN}` },
      });

      if(data.data){
        toast.success("Doctor Updated SuccessFully")
      }

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.collectorForm}>
          <div className={classes.formheader}>
            <div className={classes.formname}>
              <div className={classes.formh2}>Edit Doctor</div>
              <div className={classes.formspecification}>
                {rows?.length} You Edit doctor into list
              </div>
            </div>
            <div>
              <Buttons className={classes.formButton} onClick={()=>navigate('/register-doctor')}>
                &nbsp; Back to test table
              </Buttons>
            </div>
          </div>

          <div>
            <div className={classes.formMain}>
              <FormControl>
                <div className={classes.formDiv1}>
                  <div className={classes.formDiv2}>
                    <div className={classes.formHeading}>Edit Doctor</div>
                    <div className={classes.formLable}>Name</div>
                    <Input
                      type="text"
                      placeholder="Enter name"
                      className={classes.formInput}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Phone number</div>
                    <Input
                      type="number"
                      placeholder="Enter Phone number"
                      className={classes.formInput}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Location</div>
                    <Input
                      type="text"
                      placeholder="Enter Location"
                      className={classes.formInput}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />{" "}
                    <br />
                  </div>
                  <div className={classes.formDiv3}>
                    <div className={classes.formLable}>ID</div>
                    <Input
                      type="text"
                      placeholder="Enter ID"
                      className={classes.formInput}
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Email Id</div>
                    <Input
                      type="email"
                      placeholder="Enter Email Id"
                      className={classes.formInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Status</div>
                    <Select
                      className={classes.selectInput}
                      placeholder="Select"
                      label="Select"
                      value={status}
                      onChange={handleChange}
                    >Inactive
                      <MenuItem
                        value="Active"
                        style={{ backgroundColor: "transparent" }}
                      >
                        Active
                      </MenuItem>
                      <MenuItem value="Inactive" className={classes.menuInput}>
                        Inactive
                      </MenuItem>
                    </Select>{" "}
                    <br />
                  </div>
                </div>
                <div className={classes.formDiv4}>
                  <Buttons className={classes.cancelButton}>Cancel</Buttons>

                  <Buttons
                    className={classes.submitButton}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Buttons>
                </div>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDoctorForm;
