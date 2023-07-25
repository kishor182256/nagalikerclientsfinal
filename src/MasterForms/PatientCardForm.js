import React, { useEffect, useState } from "react";
import Input from "../Components/Shared/Input";
import { formStyles } from "../Styles/Formstyle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Buttons from "../Components/Shared/Buttons";
import axios from "axios";
import { API } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TOKEN = localStorage.getItem("logintoken");

const PatientCardForm = () => {
  const classes = formStyles();
  const [rows, setRows] = useState();
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [referredBy, setDoctorVal] = useState();
  const [doctor, setDoctor] = useState();
  const [suffix, setSuffix] = useState("");
  const [prefix, setPrefix] = useState("");
  const [test,setTest] = useState();

  const navigate = useNavigate();


  const [patients, setPatience] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    age: "",
    patientId: "",
    city: "",
    labNumber: "",
  });

  const handleSubmit = async () => {
    const data = await axios.post(
      `${API}/register-patience-card`,
      { patients, gender, status, referredBy,suffix,prefix },
      {
        headers: { authtoken: `${TOKEN}` },
      }
    );
    if(data.data){
      toast.success("Patience card Saved")
    }
    setRows(data?.data?.patients);
  };

  const fetchDoctor = async () => {
    const data = await axios.get(`${API}/getdoctorlist`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setDoctor(data?.data?.doctors);
  };

  const fetchTest = async (e) => {
    try {
      const data = await axios.get(`${API}/gettestcategory`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setTest(data?.data?.testCategory);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDoctor();
    fetchTest();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.collectorForm}>
          <div className={classes.formheader}>
            <div className={classes.formname}>
              <div className={classes.formh2}>
                Create New Permanent Patient Card{" "}
              </div>
              <div className={classes.formspecification}>
                {rows?.length} You can unique card for your permanent patients
              </div>
            </div>
            <div>
              <Buttons className={classes.formButton} onClick={()=>navigate('/patience-cards')}>
                &nbsp; Back to test table
              </Buttons>
            </div>
          </div>

          <div>
            <div className={classes.formMain}>
              <FormControl>
                <div className={classes.formDiv1}>
                  <div className={classes.formDiv2}>
                    <div className={classes.formHeading}>
                      Permanent Patient card
                    </div>
                    <div className={classes.formLable}>Patient first name</div>
                    <Input
                      type="text"
                      placeholder="Patient first name"
                      className={classes.formInput}
                      value={patients.firstName}
                      onChange={(e) =>
                        setPatience({ ...patients, firstName: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Gender*</div>
                    <FormControl>
                      <Select
                        className={classes.selectInput}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <p>Select</p>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>{" "}
                    <br />
                    <div className={classes.formLable}>Phone number</div>
                    <Input
                      type="number"
                      maxlength="10"
                      placeholder="Enter Phone number"
                      className={classes.formInput}
                      value={patients.phoneNumber}
                      onChange={(e) =>
                        setPatience({
                          ...patients,
                          phoneNumber: e.target.value,
                        })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Email address</div>
                    <Input
                      type="email"
                      placeholder="Enter Email address"
                      className={classes.formInput}
                      value={patients.emailAddress}
                      onChange={(e) =>
                        setPatience({
                          ...patients,
                          emailAddress: e.target.value,
                        })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Address</div>
                    <Input
                      type="text"
                      placeholder="Enter Address"
                      className={classes.formInput}
                      value={patients.address}
                      onChange={(e) =>
                        setPatience({ ...patients, address: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Lab Pre*</div>
                    <FormControl>
                      <Select
                        className={classes.selectInput2}
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <p>Select</p>
                        </MenuItem>
                        {test &&
                          test?.map((row) => {
                            return (
                              
                              <MenuItem value={row?.prefix}>
                                <p>{row?.prefix}</p>
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>{" "}
                    <br />
                    <div className={classes.formLable}>Lab Suf*</div>
                    <FormControl>
                      <Select
                        className={classes.selectInput2}
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <p>Select</p>
                        </MenuItem>
                        {test &&
                          test?.map((row) => {
                            return (
                              <MenuItem value={row?.suffix}>
                                <p>{row?.suffix}</p>
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>{" "}
                    <br />
                  </div>
                  <div className={classes.formDiv3}>
                    <div className={classes.formLable}>Patient last name</div>
                    <Input
                      type="text"
                      placeholder="Patient last name"
                      className={classes.formInput}
                      value={patients.lastName}
                      onChange={(e) =>
                        setPatience({ ...patients, lastName: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Age*</div>
                    <Input
                      type="number"
                      maxLength="2"
                      placeholder="Age"
                      className={classes.formInput}
                      value={patients.age}
                      onChange={(e) =>
                        setPatience({ ...patients, age: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Patient id</div>
                    <Input
                      type="number"
                      placeholder="Enter id"
                      className={classes.formInput}
                      value={patients.patientId}
                      onChange={(e) =>
                        setPatience({ ...patients, patientId: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Status</div>
                    <FormControl>
                      <Select
                        className={classes.selectInput}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <p>Select</p>
                        </MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="InActive">InActive</MenuItem>
                      </Select>
                    </FormControl>{" "}
                    <br />
                    <div className={classes.formLable}>City</div>
                    <Input
                      type="text"
                      placeholder="Enter City"
                      className={classes.formInput}
                      value={patients.city}
                      onChange={(e) =>
                        setPatience({ ...patients, city: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Lab no*</div>
                    <Input
                      type="number"
                      placeholder="Enter Lab no"
                      className={classes.formInput}
                      value={patients.labNumber}
                      onChange={(e) =>
                        setPatience({ ...patients, labNumber: e.target.value })
                      }
                    />{" "}
                    <br />
                    <div className={classes.formLable}>Reffered by</div>
                    <FormControl>
                      <Select
                        className={classes.selectInput2}
                        value={referredBy}
                        onChange={(e) => setDoctorVal(e.target.value)}
                      >
                        <MenuItem value="">
                          <p>Select</p>
                        </MenuItem>
                        {doctor?.map((doctors) => {
                          return (
                            <MenuItem value={doctors?._id}>
                              {doctors?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>{" "}
                    <br />
                  </div>
                </div>
                <div className={classes.formDiv4}>
                  <Buttons className={classes.cancelButton}>Cancel</Buttons>
                  <Buttons
                    onClick={handleSubmit}
                    className={classes.submitButton}
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

export default PatientCardForm;
