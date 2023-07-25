import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormControl from "@material-ui/core/FormControl";
import { Box } from "@material-ui/core";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { formStyles } from "../../Styles/Formstyle";
import { API } from "../../config";
import Input from "../../Components/Shared/Input";
import Buttons from "../../Components/Shared/Buttons";



const EditAccount = () => {
  const classes = formStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState();

  

  const TOKEN = localStorage.getItem("logintoken");

  const fetchAccount = async (e) => {
    try {
      const data = await axios.get(`${API}/getaccountdetails/${params.id}`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setData(data?.data?.singleaccount);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address number is required"),
    prefix: Yup.string().required("Prefix is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().required("Email is required"),
    computername: Yup.string().required("Computer Name is required"),
    keyperson: Yup.string().required("Key Person is required"),
    place: Yup.string().required("Place Person is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: data?.email || "",
      address: data?.address || "",
      name: data?.name || "",
      phone: data?.phone || "",
      keyperson: data?.keyperson || "",
      computername: data?.computername || "",
      prefix: data?.prefix || "",
      place: data?.place || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data = await axios.put(
          `${API}/editaccount/${params.id}`,
          values,
          {
            headers: { authtoken: `${TOKEN}` },
          }
        );
        if (data?.data?.message === "Account updated successfully") {
          toast.success("Account updated successfully");
        } else {
          toast.error("Account updation Error");
        }
      } catch (e) {
        console.log(e);
        toast.error("Error in saving Category");
      }
    },
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  if (!data) {
   <p>Loading....</p>
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.collectorForm}>
          <div className={classes.formheader}>
            <div className={classes.formname}>
              <div className={classes.formh2}>Edit Account List </div>
              <div className={classes.formspecification}>
               Edit Account List
              </div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/get-account-list")}
              >
                &nbsp; Back to test table
              </Buttons>
            </div>
          </div>

          <div>
            <div className={classes.formMain}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <div className={classes.formDiv1}>
                    <div className={classes.formDiv2}>
                      <div className={classes.formHeading}>
                        {" "}
                        Edit Account List{" "}
                      </div>
                      <Box>
                        <div className={classes.formLable}>Account Name</div>
                        <Input
                          type="text"
                          placeholder="Enter account name"
                          className={classes.formInput}
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <div className={classes.error}>{errors.name}</div>
                        )}
                        <br />
                        <div className={classes.formLable}>Address</div>
                        <Input
                          type="textarea"
                          placeholder="Enter Address"
                          className={classes.formInput}
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                        />
                        {errors.address && touched.address && (
                          <div className={classes.error}>{errors.address}</div>
                        )}
                        <br />

                        <div className={classes.formLable}>Key Person</div>
                        <Input
                          type="text"
                          placeholder="Enter Key Person"
                          className={classes.formInput}
                          name="keyperson"
                          value={values.keyperson}
                          onChange={handleChange}
                        />
                        {errors.keyperson && touched.keyperson && (
                          <div className={classes.error}>
                            {errors.keyperson}
                          </div>
                        )}
                        <br />
                        <div className={classes.formLable}>Computer Name</div>
                        <Input
                          type="text"
                          placeholder="Computer Name"
                          className={classes.formInput}
                          name="computername"
                          value={values.computername}
                          onChange={handleChange}
                        />
                        {errors.computername && touched.computername && (
                          <div className={classes.error}>
                            {errors.computername}
                          </div>
                        )}
                        <br />
                      </Box>
                    </div>

                    <div className={classes.formDiv3}>
                      <div className={classes.formLable}>
                        Account Code/Prefix
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter Prefix"
                        className={classes.formInput}
                        name="prefix"
                        value={values.prefix}
                        onChange={handleChange}
                      />
                      {errors.prefix && touched.prefix && (
                        <div className={classes.error}>{errors.prefix}</div>
                      )}
                      <br />
                      <div className={classes.formLable}>Place</div>
                      <Input
                        type="text"
                        placeholder="Enter Place"
                        className={classes.formInput}
                        name="place"
                        value={values.place}
                        onChange={handleChange}
                      />
                      {errors.place && touched.place && (
                        <div className={classes.error}>{errors.place}</div>
                      )}
                      <br />
                      <div className={classes.formLable}>Phone Number</div>
                      <Input
                        type="number"
                        placeholder="Enter Phone"
                        className={classes.formInput}
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && touched.phone && (
                        <div className={classes.error}>{errors.phone}</div>
                      )}
                      <br />

                      <div className={classes.formLable}>Email Address</div>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        className={classes.formInput}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email && (
                        <div className={classes.error}>{errors.email}</div>
                      )}
                      <br />
                    </div>
                  </div>
                  <div className={classes.formDiv4}>
                    <Buttons className={classes.cancelButton}>Cancel</Buttons>
                    <Buttons className={classes.submitButton} type="submit">
                      Submit
                    </Buttons>
                  </div>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
