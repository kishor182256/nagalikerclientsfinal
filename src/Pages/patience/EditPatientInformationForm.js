import React, { useEffect, useState } from "react";
import {
  Box,
  Tab,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { formStyles } from "../../Styles/Formstyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import Input from "../../Components/Shared/Input";
import SelectDropDown from "../../Components/Shared/SelectDropDown";
import { toast } from "react-toastify";


const EditPatientInformationForm = () => {
  const classes = formStyles();
  const [value, setValue] = useState("1");
  const [rows, setRows] = useState();
  const [status, setStatus] = useState("");
  const [reportcategory, setCategory] = useState();
  const [subcategory, setsubCategory] = useState();
  const [reportDelivery, setReportDelivery] = useState("");
  const [sampleFrom, setSampleFrom] = useState("");
  const [suffix, setSuffix] = useState("");
  const [prefix, setPrefix] = useState("");
  const [account, setAccount] = useState();
  const [phone, setPhone] = useState();
  const [doctor, setDoctor] = useState();
  const [accountVal, setAccountVal] = useState();
  const [referedby, setDoctorVal] = useState();
  const [sampleStatus, setsamplestatus] = useState("");
  const [sampleType, setsampleType] = useState("");
  const [refID, setRefId] = useState();
  const [barcodeId,setBarCodeId] = useState("");
  const [gender,setGender] = useState();
  const [selectedSub,setSelectedSub] = useState();

  
 



  const [labnumber, setLabnumber] = useState();
  const [totalamount, settotalamount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paidamount, setpaidamount] = useState(0);
  const [dueamount, setdueamount] = useState(0);
  const [netamount, setnetamount] = useState(0);

  const [city, setCity] = useState();
  const [lastname, setLastname] = useState();
  const [firstname, setfirstname] = useState();
  const [notes, setNotes] = useState();
  const [sample, setsample] = useState();
  const [age, setAge] = useState();
  const [address, setaddress] = useState();
  const [mode,setMode] = useState();
  const [foc,setFoc] = useState();
  
  const [discountreason, setdiscountreason] = useState();
  const [email, setemail] = useState();
  const [subcategories, setsubcategories] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams()

  const fetchTest = async (e) => {
    try {
      const data = await axios.get(`${API}/gettestcategory`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setRows(data.data.testCategory);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNetAmountCalculation = () => {
    if (!isChecked) {
      const calculatedNetAmount = totalamount - discount;
      setnetamount(calculatedNetAmount);
    }
  };

  const handleDueAmountCalculation = () => {
    if (!isChecked) {
      const calculatedDueAmount = netamount - paidamount;
      setdueamount(calculatedDueAmount);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  

  const fetchPatience = async (e) => {
    try {
      const data = await axios.get(`${API}/get-single-patience/${id}`, {
        headers: { authtoken: `${TOKEN}` },
      });
        
        const {phone,labnumber,lastname,firstname,age,email,address
        } = data.data;
        setPhone(phone);
        setLabnumber(labnumber);
        setLastname(lastname);
        setaddress(address);
        setAge(age);
        setfirstname(firstname);
        setemail(email);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(()=>{
    fetchPatience();
  },[])

  useEffect(()=>{
    handleNetAmountCalculation();
    handleDueAmountCalculation();  
  },[totalamount,discount,paidamount])




  useEffect(()=>{
    setsubcategories(selectedSub?.map((selectedSub)=>selectedSub._id))
  },[selectedSub])

  

  const fetchsubCategory = async (e) => {
    try {
      const data = await axios.get(`${API}/gettestsubcategory`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setsubCategory(data?.data?.subTestCategory);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAccount = async () => {
    const data = await axios.get(`${API}/getaccountdetails`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setAccount(data?.data?.accountDetails);
  };

  const fetchDoctor = async () => {
    const data = await axios.get(`${API}/getdoctorlist`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setDoctor(data?.data?.doctors);
  };

  useEffect(() => {
    fetchTest();
    fetchsubCategory();
    fetchAccount();
    fetchDoctor();
  }, []);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleMode = (event) => {
    setMode(event.target.value);
  };

  const handleFoc = (event)=>{
    setFoc(event.target.value);
  }

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  const TOKEN = localStorage.getItem("logintoken");
  

  

  const registerPatience = async () => {
   
    try {  
        
            const data = await axios.put(
              `${API}/edit-patience/${id}`,
              {
                prefix,suffix,
                labnumber,reportDelivery,
                totalamount,
                discount,
                city,
                lastname,
                firstname,
                gender,
                sampleStatus,
                netamount,
                sample,
                referedby,
                age,sampleFrom,
                address,accountVal,
                refID,sampleType,
                paidamount,
                dueamount,
                discountreason,
                phone,
                reportcategory,
                subcategories,
                email,mode,barcodeId
              },
              {
                headers: { authtoken: `${TOKEN}` },
              }
            );
            if(data){
              toast.success("Patience Updated SuccessFully")
            }
      
    } catch (err) {
      console.log(err);
      toast.error("Error in Updation")
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.collectorForm}>
        <div className={classes.formheader}>
          <div className={classes.formname}>
            <div className={classes.formh2}>Edit patient Details</div>
            <div className={classes.formspecification}>
              {/* {rows?.length} Complete all 3 steps */}
            </div>
          </div>
          <div>
            <Buttons className={classes.formButton} onClick={()=>navigate('/list-patience')}>
              &nbsp; Back to test table
            </Buttons>
          </div>
        </div>

        <div>
          <Box sx={{ padding: "0 6%", borderColor: "blue" }}>
            <TabContext value={value} className={classes.tabs}>
              <Box sx={{ padding: "0 26%", marginBottom: "40px" }}>
                <TabList
                  onChange={handleChange1}
                  aria-label="lab API tabs example"
                  sx={{
                    padding: "0 10%",
                    "& .MuiTabs-indicator": { backgroundColor: "black" },
                  }}
                >
                  <Tab
                    label="Patient Information"
                    className={classes.tablist}
                    value="tab1"
                  />
                  <Tab
                    label="Investigations"
                    className={classes.tablist}
                    value="tab2"
                  />
                  <Tab label="Payments" className={classes.tablist} value="tab3" />
                </TabList>
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <TabPanel value="tab1">
                  <div>
                    <div className={classes.formMain}>
                      <FormControl style={{ width: "100%" }}>
                        <div className={classes.formDiv1}>
                          <div
                            style={{ width: "30%", marginLeft: "2%" }}
                            className={classes.formDiv2}
                          >
                            <div className={classes.formHeading}>
                              Basic information
                            </div>
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
                                {rows?.map((row) => {
                                  return (
                                    <MenuItem value={row?.prefix}>
                                      <p>{row?.prefix}</p>
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>
                              Patient First Name*
                            </div>
                            <Input
                              type="text"
                              placeholder="Enter First Name  here"
                              className={classes.formInput2}
                              value={firstname}
                              onChange={(e) => setfirstname(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Gender*</div>
                            <FormControl>
                              <Select
                                className={classes.selectInput2}
                                value={gender}
                                onChange={handleChange}
                                displayEmpty
                              >
                                <MenuItem value="">
                                  <p>Select</p>
                                </MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>Sample from</div>
                            <FormControl>
                              <Select
                                className={classes.selectInput2}
                                value={sampleFrom}
                                onChange={(e) => setSampleFrom(e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  <p>Select</p>
                                </MenuItem>
                                <MenuItem value="doctor">Doctor</MenuItem>
                                <MenuItem value="lab">Lab</MenuItem>
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>
                              Reference ID
                            </div>
                            <Input
                              type="text"
                              placeholder="Enter here"
                              className={classes.formInput2}
                              value={refID}
                              onChange={(e)=>setRefId(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Address</div>
                            <Input
                              type="text"
                              placeholder="Enter here"
                              className={classes.formInput2}
                              value={address}
                              onChange={(e) => setaddress(e.target.value)}
                            />{" "}
                            <br />
                          </div>
                          <div
                            style={{ width: "30%", marginLeft: "2%" }}
                            className={classes.formDiv3}
                          >
                            <div className={classes.formLable}>Lab no*</div>
                            <Input
                              type="number"
                              placeholder="Enter here"
                              className={classes.formInput2}
                              value={labnumber}
                              onChange={(e) => setLabnumber(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Last name</div>
                            <Input
                              type="text"
                              placeholder="Enter Last name here"
                              className={classes.formInput2}
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Age*</div>
                            <Input
                              type="number"
                              placeholder="Enter here"
                              className={classes.formInput2}
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Account</div>
                            <FormControl>
                              <Select
                                className={classes.selectInput2}
                                value={accountVal}
                                onChange={(e) => setAccountVal(e.target.value)}   
                              >
                                <MenuItem value="">
                                  <p>Select</p>
                                </MenuItem>
                                {account?.map((acc) => {
                                  return (
                                    <MenuItem value={acc._id}>
                                      <p>{acc.prefix}</p>
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>
                              Mobile Number
                            </div>
                            <Input
                              type="number"
                              placeholder="Enter mobile here"
                              className={classes.formInput2}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Email</div>
                            <Input
                              type="email"
                              placeholder="Enter email here"
                              className={classes.formInput2}
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                            />{" "}
                            <br />
                          </div>
                          <div
                            style={{ width: "30%", marginLeft: "2%" }}
                            className={classes.formDiv3}
                          >
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
                                {rows?.map((row) => {
                                  return (
                                    <MenuItem value={row?.suffix}>
                                      <p>{row?.suffix}</p>
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>Reffered by</div>
                            <FormControl>
                              <Select
                                className={classes.selectInput2}
                                value={referedby}
                                onChange={(e) => setDoctorVal(e.target.value)}
                              >
                                <MenuItem value="">
                                  <p>Select</p>
                                </MenuItem>
                                {doctor?.map((doctors) => {
                                  return (
                                    <MenuItem value={doctors._id}>
                                      {doctors.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>
                              Send Repo by
                            </div>
                            <FormControl>
                              <Select
                                className={classes.selectInput2}
                                value={reportDelivery}
                                onChange={(e) =>
                                  setReportDelivery(e.target.value)
                                }
                              >
                                <MenuItem value="">
                                  <p>Select</p>
                                </MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="phone">Phone</MenuItem>
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>City</div>
                            <Input
                              type="text"
                              placeholder="Enter City here"
                              className={classes.formInput2}
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />{" "}
                            <br />
                            <div className={classes.formLable}>Notes</div>
                            <Input
                              type="text"
                              placeholder="Enter Notes here"
                              className={classes.formInput2}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />{" "}
                            <br />
                          </div>
                        </div>
                        <div className={classes.formLable}>
                          <Checkbox {...label} color="default" />
                          Urgent requirement
                        </div>{" "}
                        <div className={classes.formDiv4}>
                          <Buttons className={classes.cancelButton}>
                            Cancel
                          </Buttons>
                          <Buttons
                          onClick={() => setValue("tab2")}
                           className={classes.submitButton}>
                            To Investigations
                          </Buttons>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="tab2">
                  <div>
                    <div className={classes.formMain}>
                      <FormControl style={{ width: "75%" }}>
                        <div className={classes.formDiv1}>
                          <div className={classes.formDiv2}>
                            <div className={classes.formHeading}>
                              Test information{" "}
                            </div>
                            <div className={classes.formLable}>
                              Select Category
                            </div>
                            <FormControl>
                              <Select
                                value={reportcategory}
                                onChange={(event) =>
                                  setCategory(event.target.value)
                                }
                                className={classes.selectInput}
                              >
                                {rows?.map((option) => (
                                  <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>{" "}
                            <br />
                          </div>
                        </div>
                      </FormControl>

                      <SelectDropDown data={subcategory} setSelectedSub={setSelectedSub} setTotal={settotalamount} />

                      <FormControl style={{ width: "75%" }}>
                        <div className={classes.formDiv1}>
                          <div className={classes.formDiv2}>
                            <h4>Sample </h4>
                            <div className={classes.formLable}>Sample</div>
                            <FormControl>
                              <Select
                                className={classes.selectInput}
                                value={sampleType}
                                onChange={(e) => setsampleType(e.target.value)}
                              >
                                <MenuItem value="">
                                  <p>Select</p>
                                </MenuItem>
                                <MenuItem value="blood">Blood</MenuItem>
                                <MenuItem value="urine">Urine</MenuItem>
                              </Select>
                            </FormControl>{" "}
                            <br />
                            <div className={classes.formLable}>Bar code ID</div>
                            <Input
                              type="text"
                              placeholder="Enter here"
                              className={classes.formInput}
                              value={barcodeId}
                              onChange={(e)=>setBarCodeId(e.target.value)}
                            />{" "}
                            <br />
                          </div>
                          <div style={{ marginTop: "60px" }}>
                            <div className={classes.formLable}>
                              Sample status
                            </div>
                            <FormControl>
                              <Select
                                className={classes.selectInput}
                                value={sampleStatus}
                                onChange={(e) =>
                                  setsamplestatus(e.target.value)
                                }
                              >
                                <MenuItem value="">
                                  <p>Select</p>
                                </MenuItem>
                                <MenuItem value="collected">Collected</MenuItem>
                                <MenuItem value="received">Received</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                              </Select>
                            </FormControl>{" "}
                            <br />
                          </div>
                        </div>{" "}
                        <div className={classes.formDiv4}>
                          <Buttons className={classes.cancelButton}>
                            Cancel
                          </Buttons>
                          <Buttons
                           onClick={() => setValue("tab3")}
                           className={classes.submitButton}>
                            To Payment
                          </Buttons>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="tab3" sx={{}}>
                  <div>
                    <div className={classes.formMain}>
                      <FormControl>
                        <div className={classes.formDiv1}>
                          <div className={classes.formDiv2}>
                            <div className={classes.formHeading}>
                              Payment details
                            </div>
                            <div className={classes.formLable}>
                              Free of cost:
                              <Checkbox
                                {...label}
                                color="default"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                            </div>{" "}
                            <br />
                            <Box style={{ display: "flex" }}>
                              <Box>
                                <div className={classes.formLable}>
                                  Total Bill amount
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter here"
                                  disabled={isChecked}
                                  className={classes.formInput}
                                  value={totalamount}
                                  // onChange={(e) =>
                                  //   settotalamount(e.target.value)
                                  // }
                                />{" "}
                                <br />
                                <div className={classes.formLable}>
                                  Discount amount
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter Discount here"
                                  className={classes.formInput}
                                  value={discount}
                                  onChange={(e) => setDiscount(e.target.value)}
                                  disabled={isChecked}
                                />{" "}
                                <br />
                                <div className={classes.formLable}>
                                  Net amount to pay
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Enter net amount here"
                                  className={classes.formInput}
                                  value={netamount}
                                  onChange={(e) => setnetamount(e.target.value)}
                                  disabled={isChecked}
                                />{" "}
                                <br />
                                <div className={classes.formLable}>
                                  Paid amount
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Enter here"
                                  className={classes.formInput}
                                  value={paidamount}
                                  onChange={(e) =>
                                    setpaidamount(e.target.value)
                                  }
                                  disabled={isChecked}
                                />{" "}
                                <br />
                                <div className={classes.formLable}>
                                  FOC/Discount by
                                </div>
                                <FormControl>
                                  <Select
                                    className={classes.selectInput}
                                    value={foc}
                                    onChange={handleFoc}
                                    disabled={isChecked}
                                  >
                                    <MenuItem value="" disabled>
                                      <p>Select</p>
                                    </MenuItem>
                                    <MenuItem value={"Category1"}>
                                      Category1
                                    </MenuItem>
                                    <MenuItem value={"Category2"}>
                                      Category2
                                    </MenuItem>
                                  </Select>
                                </FormControl>{" "}
                                <br />
                              </Box>
                              <Box>
                                <div className={classes.formDiv3}>
                                  <div
                                    className={classes.formLable}
                                    style={{ marginTop: "60px" }}
                                  >
                                    Payment mode
                                  </div>
                                  <FormControl>
                                    <Select
                                      className={classes.selectInput}
                                      value={mode}
                                      onChange={handleMode}
                                      disabled={isChecked}
                                    >
                                      <MenuItem value="">
                                        <p>Select</p>
                                      </MenuItem>
                                      <MenuItem value="online">OnLine</MenuItem>
                                      <MenuItem value="cash">Cash</MenuItem>
                                    </Select>
                                  </FormControl>{" "}
                                  <br />
                                 
                                  <br />
                                  <br />
                                  <div className={classes.formLable}>
                                    Due amount
                                  </div>
                                  <Input
                                    type="text"
                                    placeholder="Enter here"
                                    className={classes.formInput}
                                    value={dueamount}
                                    onChange={(e) =>
                                      setdueamount(e.target.value)
                                    }
                                    disabled={isChecked}
                                  />{" "}
                                  <br />
                                  <div className={classes.formLable}>
                                    FOC/Discount reason
                                  </div>
                                  <Input
                                    type="text"
                                    placeholder="Enter Discount reason here"
                                    className={classes.formInput}
                                    value={discountreason}
                                    onChange={(e) =>
                                      setdiscountreason(e.target.value)
                                    }
                                  />
                                  <br />
                                </div>
                              </Box>
                            </Box>
                          </div>
                        </div>
                        <div className={classes.formDiv4}>
                          <Buttons className={classes.cancelButton}>
                            Cancel
                          </Buttons>
                          <Buttons
                            className={classes.submitButton}
                            onClick={registerPatience}
                          >
                            Submit
                          </Buttons>
                        </div>
                      </FormControl>
                    </div>
                  </div>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EditPatientInformationForm;
