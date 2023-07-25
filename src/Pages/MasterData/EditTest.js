import React, { useEffect, useState } from "react"
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formStyles } from "../../Styles/Formstyle";
import Buttons from "../../Components/Shared/Buttons";
import Input from "../../Components/Shared/Input";
import { API } from "../../config";
import { AddFemaleFieldSvg, AddFieldSvg, MinusButtonSvg } from "../../Components/Shared/UserSvg";

const EditTest = () => {
  const classes = formStyles();
  const [value, setValue] = useState("1");
  const [rows, setRows] = useState();
  const [status, setStatus] = useState("male");
  const [category, setCategory] = useState();
  const [singlecategory, setSingleCategory] = useState();

  const {id} = useParams();

  

  const [formFields, setFormFields] = useState([
    { ageUpto: "", low: "", high: "", refRange: "" },
  ]);

  const [optionFields, setOptionFields] = useState([{ code: "", option: "" }]);

  const [FemaleformFields, setFemaleFormFields] = useState([
    { ageUpto: "", low: "", high: "", refRange: "" },
  ]);

  const navigate = useNavigate();

  const [testname, setTestname] = useState();
  const [testid, setTestid] = useState();
  const [unit, setUnit] = useState();
  const [deltalimit, setDeltaLimit] = useState();
  const [tat, setTat] = useState();
  const [normal, setNormal] = useState();
  const [deltime, setDeltime] = useState();

  const testdata = {
    status,
    category,
    testname,
    testid,
    unit,
    deltalimit,
    tat,
    normal,
    deltime,
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const TOKEN = localStorage.getItem("logintoken");

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

  const gettestsubcategory = async (e) => {
    try {
      const data = await axios.get(`${API}/gettestsubcategory/${id}`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setSingleCategory(data.data);
      
      const {deltaCheckTime,normalValue,name,tatinMinute,units,status,deltaLimit} = data.data.testSubCategory;
      setDeltime(deltaCheckTime)
      setDeltaLimit(deltaLimit);
      setNormal(normalValue);
      setStatus(status);
      setUnit(units);
      setTat(tatinMinute);
      setTestname(name);
      setTestid(data.data.testSubCategory.id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTest();
    gettestsubcategory();
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const fields = [...formFields];
    fields[index][name] = value;
    setFormFields(fields);
  };

  const handleOptionChange = (index, event) => {
    const { name, value } = event.target;
    const fields = [...optionFields];
    fields[index][name] = value;
    setOptionFields(fields);
  };

  const handleAddOptionFields = () => {
    setOptionFields([...optionFields, { code: "", option: "" }]);
  };

  const handleRemoveOptionField = (index) => {
    const updatedOptionFields = [...optionFields];
    updatedOptionFields.splice(index, 1);
    setOptionFields(updatedOptionFields);
  };
  

  const handleInputChangeFemale = (index, event) => {
    const { name, value } = event.target;
    const fields = [...formFields];
    fields[index][name] = value;
    setFemaleFormFields(fields);
  };

  const handleAddFields = () => {
    setFormFields([
      ...formFields,
      { ageUpto: "", low: "", high: "", refRange: "" },
    ]);
  };

  const AddFieldsFemale = () => {
    setFemaleFormFields([
      ...FemaleformFields,
      { ageUpto: "", low: "", high: "", refRange: "" },
    ]);
  };

  const handleSubmit = async () => {
   
      try {
        if(!testdata||!formFields||!FemaleformFields||!optionFields){
          toast.error("Please Enter All Fields")
        }
        const data = await axios.put(
          `${API}/edittestsubcategory/${id}`,
          { testdata, formFields, FemaleformFields,optionFields },
          {
            headers: { authtoken: `${TOKEN}` },
          }
        );
        if (data?.data) {
          toast.success("Test Subcategory Updated successfully");
        }
      } catch (e) {
        console.log(e);
        toast.error("Error updating Subcategory");
      }
    
  };

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.collectorForm}>
        <div className={classes.formheader}>
          <div className={classes.formname}>
            <div className={classes.formh2}>Edit Test</div>
            <div className={classes.formspecification}>
              You can Edit Test
            </div>
          </div>
          <div>
            <Buttons
              className={classes.formButton}
              onClick={() => navigate("/add-test")}
            >
              &nbsp; Back to test table
            </Buttons>
          </div>
        </div>

        <div>
          <Box sx={{ padding: "0 12%", borderColor: "blue" }}>
            <TabContext value={value} className={classes.tabs}>
              <Box sx={{ padding: "0 30%", marginBottom: "40px" }}>
                <TabList
                  onChange={handleChange1}
                  aria-label="lab API tabs example"
                  sx={{ "& .MuiTabs-indicator": { backgroundColor: "black" } }}
                >
                  <Tab
                    label="Test Information"
                    className={classes.tablist}
                    value="1"
                  />
                  <Tab
                    label="Reference Range"
                    className={classes.tablist}
                    value="tab2"
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{}}>
                <div>
                  <div className={classes.formMain}>
                    <FormControl>
                      <div className={classes.formDiv1}>
                        <div className={classes.formDiv2}>
                          <div className={classes.formHeading}>
                            New Test Information
                          </div>
                          <div className={classes.formLable}>Category</div>
                          <FormControl>
                            <Select
                              value={category}
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
                          <div className={classes.formLable}>Test Name</div>
                          <Input
                            type="text"
                            placeholder="Enter Test Name"
                            className={classes.formInput}
                            value={testname}
                            onChange={(e) => setTestname(e.target.value)}
                          />{" "}
                          <br />
                          <div className={classes.formLable}>Normals</div>
                          <Input
                            type="text"
                            placeholder="Enter Normals"
                            className={classes.formInput}
                            value={normal}
                            onChange={(e) => setNormal(e.target.value)}
                          />{" "}
                          <br />
                          <div className={classes.formLable}>
                            Time arount test(TAT) in minutes
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter TAT"
                            className={classes.formInput}
                            value={tat}
                            onChange={(e) => setTat(e.target.value)}
                          />{" "}
                          <br />
                          {/* <div className={classes.formLable}>
                            Result visble to all:
                            <Checkbox {...label} color="default" />
                          </div>
                          <div className={classes.formLable}>
                            Print in card:
                            <Checkbox {...label} color="default" />
                          </div>{" "} */}
                          <br />
                        </div>
                        <div className={classes.formDiv3}>
                          <div className={classes.formLable}>Test ID</div>
                          <Input
                            type="text"
                            placeholder="Enter Test ID"
                            className={classes.formInput}
                            value={testid}
                            onChange={(e) => setTestid(e.target.value)}
                          />{" "}
                          <br />
                          <div className={classes.formLable}>Unit</div>
                          <Input
                            type="text"
                            placeholder="Enter Unit"
                            className={classes.formInput}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                          />{" "}
                          <br />
                          {/* <div className={classes.formLable}>Default value</div> */}
                          <br />
                          <div className={classes.formLable}>
                            Delta check limit
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter Delta limit"
                            className={classes.formInput}
                            value={deltalimit}
                            onChange={(e) => setDeltaLimit(e.target.value)}
                          />
                          <div>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                style={{
                                  fontSize: "6px",
                                  margin: "0 30px 0 0 ",
                                }}
                                value="% value"
                                control={
                                  <Radio
                                    color="default"
                                    style={{ width: "8px", height: "8px" }}
                                  />
                                }
                                label="% value"
                              />
                              <FormControlLabel
                                style={{ fontSize: "6px" }}
                                value="male"
                                control={
                                  <Radio
                                    color="Absolute value"
                                    style={{ width: "8px", height: "8px" }}
                                  />
                                }
                                label="Absolute value"
                              />
                            </RadioGroup>
                            <br />
                          </div>
                          <div className={classes.formLable}>
                            Delta check time duration
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter Delta duration"
                            className={classes.formInput}
                            value={deltime}
                            onChange={(e) => setDeltime(e.target.value)}
                          />{" "}
                          <br />
                        </div>
                      </div>
                      <div className={classes.genderDiv1}>
                
                          <div>
                            <div className={classes.genderHeading}>
                              Test Value Options
                            </div>
                            {optionFields.map((field, index) => (
                              <div
                                className={classes.genderDiv2}
                                style={{ display: "flex" }}
                              >
                                <div>
                                  <div className={classes.formLable}>Code</div>
                                  <Input
                                    type="number"
                                    placeholder="Enter Code"
                                    className={classes.genformInput}
                                    name="code"
                                    value={field.code}
                                    onChange={(event) =>
                                      handleOptionChange(index, event)
                                    }
                                  />
                                  <br />
                                </div>

                                <div style={{ width: "100%" }}>
                                  <div className={classes.formLable}>
                                    Options
                                  </div>
                                  <Input
                                    type="text"
                                    placeholder="Enter Option"
                                    className={classes.genformInput}
                                    name="option"
                                    value={field.option}
                                    onChange={(event) =>
                                      handleOptionChange(index, event)
                                    }
                                  />
                                  <br />
                                </div>

                                <div>
                                  {index === 0 ? (
                                    <div
                                      style={{
                                        marginTop: "28px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <AddFieldSvg
                                        handleAddFields={handleAddOptionFields}
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        marginTop: "28px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleRemoveOptionField(index)
                                      }
                                    >
                                      <MinusButtonSvg />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                       
                      </div>
                      <div className={classes.formDiv4}>
                        <Buttons className={classes.cancelButton}>
                          Cancel
                        </Buttons>
                        <Buttons
                          className={classes.submitButton}
                          onClick={() => setValue("tab2")}
                        >
                          Add Ref Data
                        </Buttons>
                      </div>
                    </FormControl>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="tab2" sx={{}}>
                <div>
                  <div className={classes.formHeading}>
                    New Report Group Format
                  </div>
                  <div className={classes.formLable}>Gender</div>
                  <div>
                    <Select
                      className={classes.selectInput}
                      placeholder="Select"
                      label="Select"
                      value={status}
                      onChange={handleChange}
                    >
                      <MenuItem
                        value="male"
                        style={{ backgroundColor: "transparent" }}
                      >
                        Male
                      </MenuItem>

                      <MenuItem value="female" className={classes.menuInput}>
                        Female
                      </MenuItem>
                      <MenuItem
                        value="transgender"
                        style={{ backgroundColor: "transparent" }}
                      >
                        Transgender
                      </MenuItem>
                    </Select>{" "}
                    <Buttons className={classes.addButton}>Add</Buttons>
                    <br />
                  </div>

                  
                      {status === "male" && (
                        <div className={classes.genderDiv}>
                        <div className={classes.genderDiv1}>
                        <div>
                          <div className={classes.genderHeading}>For Male</div>
                          {formFields.map((field, index) => (
                            <div
                              className={classes.genderDiv2}
                              style={{ display: "flex" }}
                            >
                              <div>
                                <div className={classes.formLable}>
                                  Age upto
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter Age Range"
                                  className={classes.genformInput}
                                  name="ageUpto"
                                  value={field.ageUpto}
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>

                              <div>
                                <div className={classes.formLable}>
                                  High value
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter high value"
                                  className={classes.genformInput}
                                  name="high"
                                  value={field.high}
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div>
                                <div className={classes.formLable}>
                                  Low value
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter low value"
                                  className={classes.genformInput}
                                  name="low"
                                  value={field.low}
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div>
                                <div className={classes.formLable}>
                                  Refrange value
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Enter Refrange value"
                                  className={classes.genformInput}
                                  name="refRange"
                                  value={field.refRange}
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div
                                style={{ marginTop: "28px", cursor: "pointer" }}
                              >
                                <AddFieldSvg
                                  handleAddFields={handleAddFields}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                  </div>
                      )}
                    

                 
                      {status === "female" && (
                         <div className={classes.genderDiv}>
                         <div className={classes.genderDiv1}>
                        <div>
                          <div className={classes.genderHeading}>
                            For FeMale
                          </div>
                          {FemaleformFields.map((field, index) => (
                            <div
                              className={classes.genderDiv2}
                              style={{ display: "flex" }}
                            >
                              <div>
                                <div className={classes.formLable}>
                                  Age upto
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter Age Range"
                                  className={classes.genformInput}
                                  name="ageUpto"
                                  value={field.ageUpto}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>

                              <div>
                                <div className={classes.formLable}>
                                  High value
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter high value"
                                  className={classes.genformInput}
                                  name="high"
                                  value={field.high}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div>
                                <div className={classes.formLable}>
                                  Low value
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter low value"
                                  className={classes.genformInput}
                                  name="low"
                                  value={field.low}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div>
                                <div className={classes.formLable}>
                                  Refrange value
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Enter Refrange value"
                                  className={classes.genformInput}
                                  name="refRange"
                                  value={field.refRange}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div
                                style={{ marginTop: "28px", cursor: "pointer" }}
                              >
                                <AddFemaleFieldSvg
                                  handleFemale={AddFieldsFemale}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                  </div>
                      )}
                   

                 
                      {status === "transgender" && (
                         <div className={classes.genderDiv}>
                         <div className={classes.genderDiv1}>
                        <div>
                          <div className={classes.genderHeading}>
                            For Transgender
                          </div>
                          {FemaleformFields.map((field, index) => (
                            <div
                              className={classes.genderDiv2}
                              style={{ display: "flex" }}
                            >
                              <div>
                                <div className={classes.formLable}>
                                  Age upto
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter Age Range"
                                  className={classes.genformInput}
                                  name="ageUpto"
                                  value={field.ageUpto}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>

                              <div>
                                <div className={classes.formLable}>
                                  High value
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter high value"
                                  className={classes.genformInput}
                                  name="high"
                                  value={field.high}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div>
                                <div className={classes.formLable}>
                                  Low value
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Enter low value"
                                  className={classes.genformInput}
                                  name="low"
                                  value={field.low}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div>
                                <div className={classes.formLable}>
                                  Refrange value
                                </div>
                                <Input
                                  type="text"
                                  placeholder="Enter Refrange value"
                                  className={classes.genformInput}
                                  name="refRange"
                                  value={field.refRange}
                                  onChange={(event) =>
                                    handleInputChangeFemale(index, event)
                                  }
                                />{" "}
                                <br />
                              </div>
                              <div
                                style={{ marginTop: "28px", cursor: "pointer" }}
                              >
                                <AddFemaleFieldSvg
                                  handleFemale={AddFieldsFemale}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                        </div>
                      )}
                    

                  <div className={classes.formDiv4}>
                    <Buttons className={classes.cancelButton}>Cancel</Buttons>
                    <Buttons
                      className={classes.submitButton}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Buttons>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EditTest;
