import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { formStyles } from "../../Styles/Formstyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import Input from "../../Components/Shared/Input";

const AddSampleForm = () => {
  const classes = formStyles();

  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [sampleby, setSampleBy] = useState("");


  const TOKEN = localStorage.getItem("logintoken");

  const handleSubmit = async (values) => {
    try {
      const data = await axios.post(`${API}/addnewsample`, values, {
        headers: { authtoken: `${TOKEN}` },
      });
      if (data) {
        toast.success("Sample Added SuccessFully");
      } else {
        toast.error("Sample Add Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    formik.setFieldValue("status", status);
    formik.setFieldValue("sampleby", sampleby);
  }, [status, sampleby]);

  const validationSchema = Yup.object({
    status: Yup.string().required("Status is required"),
    sampleFromname: Yup.string().required("SampleFromname is required"),
    phone: Yup.number().required("Phone Format is required"),
    sampleId: Yup.string().required("SampleId Format is required"),
    sampleby: Yup.string().required("Sampleby Format is required"),
  });

  const formik = useFormik({
    initialValues: {
      sampleFromname: "",
      phone: "",
      sampleId: "",
      status: "",
      sampleby: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className={classes.root}>
        <div className={classes.collectorForm}>
          <div className={classes.formheader}>
            <div className={classes.formname}>
              <div className={classes.formh2}>Add new Sample from </div>
              <div className={classes.formspecification}>
                You can create a new Sample group here
              </div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/get-sample-list")}
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
                    <div className={classes.formHeading}> Add New Sample </div>
                    <div className={classes.formLable}>Sample From Name</div>
                    <Input
                      name="sampleFromname"
                      type="text"
                      placeholder="Enter From Name"
                      className={classes.formInput}
                      value={formik.values.sampleFromname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.sampleFromname && (
                      <div className={classes.error}>
                        {formik.errors.sampleFromname}
                      </div>
                    )}
                    <br />
                    <div className={classes.formLable}>Phone Number</div>
                    <Input
                      name="phone"
                      type="number"
                      placeholder="Enter phone number"
                      className={classes.formInput}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phone && (
                      <div className={classes.error}>{formik.errors.phone}</div>
                    )}
                    <br />
                    <FormControl>
                      <div className={classes.formLable}>Select Status</div>
                      <Select
                        className={classes.selectInput}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="" disabled>
                          <p>Select</p>
                        </MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="InActive">InActive</MenuItem>
                      </Select>
                    </FormControl>{" "}
                    {formik.errors.status && (
                      <div className={classes.error}>
                        {formik.errors.status}
                      </div>
                    )}
                    <br />
                  </div>
                  <div className={classes.formDiv3}>
                    <div className={classes.formLable}>Short Id</div>
                    <Input
                      name="sampleId"
                      type="text"
                      placeholder="Enter Id"
                      className={classes.formInput}
                      value={formik.values.sampleId}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.sampleId && (
                      <div className={classes.error}>
                        {formik.errors.sampleId}
                      </div>
                    )}
                    <br />
                    <div className={classes.formLable}>By Default</div>
                    <FormControl>
                      <Select
                        className={classes.selectInput}
                        value={sampleby}
                        onChange={(e) => setSampleBy(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <p>Select</p>
                        </MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                    </FormControl>{" "}
                    {formik.errors.sampleby && (
                      <div className={classes.error}>
                        {formik.errors.sampleby}
                      </div>
                    )}
                    <br />
                  </div>
                </div>
                <div className={classes.formDiv4}>
                  <Buttons className={classes.cancelButton}>Cancel</Buttons>
                  <Buttons
                    className={classes.submitButton}
                    onClick={formik.handleSubmit}
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

export default AddSampleForm;
