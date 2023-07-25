import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formStyles } from "../Styles/Formstyle";
import { API } from "../config";
import Buttons from "../Components/Shared/Buttons";
import Input from "../Components/Shared/Input";

const AddUserForm = () => {
  const classes = formStyles();
  const [rows, setRows] = useState();

  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("logintoken");

  const validationSchema = Yup.object().shape({
    printer: Yup.string().required("Printer is required"),
    sampleno: Yup.string().required("Samplenois required"),
    labrefno: Yup.string().required("Phone number is required"),
    firstname: Yup.string().required("Firstnameis required"),
    lastname: Yup.string().required("Lastname is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.string().required("Age is required"),
    labels: Yup.string()
    .required('Labels is required'),
  });

  const formik = useFormik({
    initialValues: {
      printer: "",
      sampleno: "",
      labrefno: "",
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
      labels: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${API}/generatebarcode`, values, {
          headers: { authtoken: TOKEN },
          responseType: 'blob',
        });
        if (response.data instanceof Blob) {
          const fileUrl = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = fileUrl;
          
          link.download = 'barcode.png';
          link.click();
          window.URL.revokeObjectURL(fileUrl);
          toast.success("Barcode Generated");
        } else {
          toast.error("Error while generating Barcode");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while generating Barcode");
      }
    },
    
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.collectorForm}>
          <div className={classes.formheader}>
            <div className={classes.formname}>
              <div className={classes.formh2}>Generate Bar code</div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/register-user")}
              >
                &nbsp; Back to test table
              </Buttons>
            </div>
          </div>

          <div>
            <div className={classes.formMain}>
              <FormControl>
                <div className={classes.formDiv1}>
                  <div className={classes.formDiv2}>
                    <div className={classes.formHeading}>Barcode</div>
                    <div className={classes.formLable}>Barcode Printer</div>
                    <Input
                      type="text"
                      placeholder="Enter name"
                      className={classes.formInput}
                      name="printer"
                      value={values.printer}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.printer && touched.printer && (
                      <div style={{ color: "red" }}>{errors.printer}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Sample Number</div>
                    <Input
                      type="number"
                      placeholder="Enter Sample Number"
                      className={classes.formInput}
                      name="sampleno"
                      value={values.sampleno}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sampleno && touched.sampleno && (
                      <div style={{ color: "red" }}>{errors.sampleno}</div>
                    )}
                    <br />

                    <div className={classes.formLable}>Patience First Name</div>
                    <Input
                      type="text"
                      placeholder="Enter First Name"
                      className={classes.formInput}
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstname && touched.firstname && (
                      <div style={{ color: "red" }}>{errors.firstname}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>No of Labels</div>
                    <Input
                      type="text"
                      placeholder="Enter Labels"
                      className={classes.formInput}
                      name="labels"
                      value={values.labels}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.labels && touched.labels && (
                      <div style={{ color: "red" }}>{errors.labels}</div>
                    )}
                    <br />
            
                  </div>
                  <div className={classes.formDiv3}>
                    <div className={classes.formLable}>Lab Ref No</div>
                    <Input
                      type="text"
                      placeholder="Enter Lab Ref No"
                      className={classes.formInput}
                      name="labrefno"
                      value={values.labrefno}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.labrefno && touched.labrefno && (
                      <div style={{ color: "red" }}>{errors.labrefno}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Patience Last Name</div>
                    <Input
                      type="text"
                      placeholder="Enter Last Name"
                      className={classes.formInput}
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastname && touched.lastname && (
                      <div style={{ color: "red" }}>{errors.lastname}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Age</div>
                    <Input
                      type="number"
                      placeholder="Enter Age"
                      className={classes.formInput}
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.age && touched.age && (
                      <div style={{ color: "red" }}>{errors.age}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Gender</div>
                    <Select
                      className={classes.selectInput}
                      placeholder="Select"
                      label="Select"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>{" "}
                    {errors.gender && touched.gender && (
                      <div style={{ color: "red" }}>{errors.gender}</div>
                    )}
                    <br />
                  </div>
                </div>
                <div className={classes.formDiv4}>
                  <Buttons
                    className={classes.cancelButton}
                    onClick={() => navigate("/list-patience")}
                  >
                    Cancel
                  </Buttons>

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

export default AddUserForm;
