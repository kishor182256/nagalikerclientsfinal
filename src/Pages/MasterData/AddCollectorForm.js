import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import Input from "../../Components/Shared/Input";
import { formStyles } from "../../Styles/Formstyle";

const AddCollectorForm = () => {
  const classes = formStyles();
  const [rows, setRows] = useState();

  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("logintoken");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    id: Yup.string().required("ID is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      phone: "",
      email: "",
      location: "",
      status: "Inactive",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(`${API}/register-collector`, values, {
          headers: { authtoken: `${TOKEN}` },
        });
        if (data.data.errors) {
          toast.error("Collector already Registered");
        } else {
          toast.success("Collector Registered Successfully");
        }
      } catch (e) {
        console.log(e);
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
              <div className={classes.formh2}>Add New Sample Collector</div>
              <div className={classes.formspecification}>
                {rows?.length} You can add new sample collector into list
              </div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/register-collector")}
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
                    <div className={classes.formHeading}>
                      New Sample Collector
                    </div>
                    <div className={classes.formLable}>Name</div>
                    <Input
                      type="name"
                      placeholder="Enter name"
                      className={classes.formInput}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Phone number</div>
                    <Input
                      type="number"
                      placeholder="Enter Phone number"
                      className={classes.formInput}
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone && touched.phone && (
                      <div style={{ color: "red" }}>{errors.phone}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Location</div>
                    <Input
                      type="text"
                      placeholder="Enter Location"
                      className={classes.formInput}
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.location && touched.location && (
                      <div style={{ color: "red" }}>{errors.location}</div>
                    )}
                    <br />
                  </div>
                  <div className={classes.formDiv3}>
                    <div className={classes.formLable}>ID</div>
                    <Input
                      type="text"
                      placeholder="Enter ID"
                      className={classes.formInput}
                      name="id"
                      value={values.id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.id && touched.id && (
                      <div style={{ color: "red" }}>{errors.id}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Email Id</div>
                    <Input
                      type="email"
                      placeholder="Enter Email Id"
                      className={classes.formInput}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Status</div>
                    <Select
                      className={classes.selectInput}
                      placeholder="Select"
                      label="Select"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem
                        value="Active"
                        style={{ backgroundColor: "transparent" }}
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        value="Inactive"
                        className={classes.menuInput}
                      >
                        Inactive
                      </MenuItem>
                    </Select>{" "}
                    <br />
                  </div>
                </div>
                <div className={classes.formDiv4}>
                  <Buttons
                    className={classes.cancelButton}
                    onClick={() => navigate("/register-collector")}
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

export default AddCollectorForm;
