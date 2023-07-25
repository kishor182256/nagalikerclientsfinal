import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { Box } from "@material-ui/core";
import { formStyles } from "../Styles/Formstyle";
import Buttons from "../Components/Shared/Buttons";
import Input from "../Components/Shared/Input";
import axios from "axios";
import { API } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddReportGroupForm = () => {
  const classes = formStyles();
  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("logintoken");


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    lastnumber: Yup.string().required("Last number is required"),
    prefix: Yup.string().required("Prefix is required"),
    suffix: Yup.string().required("Suffix is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastnumber: "",
      prefix: "",
      suffix: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await axios.post(
          `${API}/addtestcategory`,
          values,
          {
            headers: { authtoken: `${TOKEN}` },
          }
        );
        if (data?.data?.message === "Test category saved") {
          toast.success("Test category saved");
        } else {
          toast.error("Category with the same name already exists");
        }
      } catch (e) {
        console.log(e);
        toast.error("Error in saving Category");
      }
    },
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.collectorForm}>
          <div className={classes.formheader}>
            <div className={classes.formname}>
              <div className={classes.formh2}>
                Add New Report category/group{" "}
              </div>
              <div className={classes.formspecification}>
                You can create a new report group here
              </div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/add-report-group")}
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
                        New Report category/group{" "}
                      </div>
                      <div className={classes.formLable}>Report group name</div>
                      <Input
                        type="text"
                        placeholder="Enter name"
                        className={classes.formInput}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      {errors.name && touched.name && (
                        <div className={classes.error}>{errors.name}</div>
                      )}
                      <br />
                      <div className={classes.formLable}>Last number</div>
                      <Input
                        type="text"
                        placeholder="Enter Phone last digits"
                        className={classes.formInput}
                        name="lastnumber"
                        value={values.lastnumber}
                        onChange={handleChange}
                      />
                      {errors.lastnumber && touched.lastnumber && (
                        <div className={classes.error}>{errors.lastnumber}</div>
                      )}
                      <br />
                    </div>
                    <div className={classes.formDiv3}>
                      <div className={classes.formLable}>Prefix</div>
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
                      <div className={classes.formLable}>Suffix</div>
                      <Input
                        type="text"
                        placeholder="Enter Suffix"
                        className={classes.formInput}
                        name="suffix"
                        value={values.suffix}
                        onChange={handleChange}
                      />
                      {errors.suffix && touched.suffix && (
                        <div className={classes.error}>{errors.suffix}</div>
                      )}
                      <br />
                    </div>
                  </div>
                  <div className={classes.formDiv4}>
                    <Buttons 
                    onClick={() => navigate("/add-report-group")}
                    className={classes.cancelButton}>Cancel</Buttons>
                    <Buttons
                      className={classes.submitButton}
                      type="submit"
                    >
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

export default AddReportGroupForm;
