import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formStyles } from "../../Styles/Formstyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import Input from "../../Components/Shared/Input";

const AddVisit = () => {
  const classes = formStyles();
  const [rows, setRows] = useState();

  const navigate = useNavigate();

  const currentDate = new Date()
  const formattedDate = currentDate.toISOString().split('T')[0];

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

   const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  const TOKEN = localStorage.getItem("logintoken");

  const validationSchema = Yup.object().shape({
    patId: Yup.string().required("Patient ID is required"),
    date: Yup.date().required("Date is required"),
    phone: Yup.string().required("Phone number is required"),
    time: Yup.string().required("Time is required"),
    patienceName: Yup.string().required("Patient Name is required"),
    investigation: Yup.string().required("Investigation is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    visitby: Yup.string().required("Visited By is required"),
    amount: Yup.number().required("Amount is required"),
    opetatorId: Yup.string().required("Operator ID is required"),
    notes: Yup.string().required("Notes is required"),
  });
  

  const formik = useFormik({
    initialValues: {
      patId: "",
      date: formattedDate,
      phone: "",
      time: formattedTime,
      patienceName: "",
      investigation: "",
      address: "",
      city: "",
      visitby:"",
      amount:0,
      opetatorId:"",
      notes:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(`${API}/book-patience-visit`, values, {
          headers: { authtoken: `${TOKEN}` },
        });
        if (data.data.errors) {
          toast.error("Patience already Registered");
        } else {
          toast.success("Patience Registered Successfully");
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
              <div className={classes.formh2}>Book Visit</div>
              <div className={classes.formspecification}>
                 You can book for visit
              </div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/visitor-book")}
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
                    <div className={classes.formHeading}>Book</div>
                    <div className={classes.formLable}>Patience Id</div>
                    <Input
                      type="text"
                      placeholder="Enter Id"
                      className={classes.formInput}
                      name="patId"
                      value={values.patId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.patId && touched.patId && (
                      <div style={{ color: "red" }}>{errors.patId}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Visit Schedule Date</div>
                    <Input
                      type="date"
                      placeholder={formattedDate}
                      className={classes.formInput}
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={formattedDate}
                    />
                    {errors.date && touched.date && (
                      <div style={{ color: "red" }}>{errors.date}</div>
                    )}
                    <br />

                    <div className={classes.formLable}>Patience Name</div>
                    <Input
                      type="text"
                      placeholder="Enter patienceName"
                      className={classes.formInput}
                      name="patienceName"
                      value={values.patienceName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.patienceName && touched.patienceName && (
                      <div style={{ color: "red" }}>{errors.patienceName}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>City</div>
                    <Input
                      type="text"
                      placeholder="Enter City"
                      className={classes.formInput}
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.city && touched.city && (
                      <div style={{ color: "red" }}>{errors.city}</div>
                    )}
                    <br />

                    <div className={classes.formLable}>Amount To Visitor</div>
                    <Input
                      type="text"
                      placeholder="Enter Amount"
                      className={classes.formInput}
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.amount && touched.amount && (
                      <div style={{ color: "red" }}>{errors.amount}</div>
                    )}
                    <br />

                    <div className={classes.formLable}>Notes</div>
                    <Input
                      type="text"
                      placeholder="Enter notes"
                      className={classes.formInput}
                      name="notes"
                      value={values.notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notes && touched.notes && (
                      <div style={{ color: "red" }}>{errors.notes}</div>
                    )}
                    <br />
            
                  </div>
                  <div className={classes.formDiv3}>
                    <div className={classes.formLable}>Phone No</div>
                    <Input
                      type="text"
                      placeholder="Enter Phone"
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
                    <div className={classes.formLable}>Visit Time</div>
                    <Input
                      type="time"
                      placeholder={formattedTime}
                      className={classes.formInput}
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.time && touched.time && (
                      <div style={{ color: "red" }}>{errors.time}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Visit By</div>
                    <Input
                      type="text"
                      placeholder="Enter Visit by"
                      className={classes.formInput}
                      name="visitby"
                      value={values.visitby}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.visitby && touched.visitby && (
                      <div style={{ color: "red" }}>{errors.visitby}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Operator Id</div>
                    <Input
                      type="text"
                      placeholder="Enter opetatorId"
                      className={classes.formInput}
                      name="opetatorId"
                      value={values.opetatorId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.opetatorId && touched.opetatorId && (
                      <div style={{ color: "red" }}>{errors.opetatorId}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Investigation</div>
                    <Input
                      type="text"
                      placeholder="Enter investigation"
                      className={classes.formInput}
                      name="investigation"
                      value={values.investigation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.investigation && touched.investigation && (
                      <div style={{ color: "red" }}>{errors.investigation}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Address</div>
                    <Input
                      type="text"
                      placeholder="Enter address"
                      className={classes.formInput}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.investigation && touched.address && (
                      <div style={{ color: "red" }}>{errors.address}</div>
                    )}
                    <br />
                  </div>
                  
                </div>
                
                <div className={classes.formDiv4}>
                  <Buttons
                    className={classes.cancelButton}
                    onClick={() => navigate("/register-user")}
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

export default AddVisit;
