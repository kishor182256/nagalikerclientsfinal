import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddPriceListForm = () => {
  const classes = formStyles();
  const [rows, setRows] = useState();
  const [account, setAccount] = useState();
  const [sub, setSub] = useState();
  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("logintoken");

  const fetchTest = async () => {
    try {
      const data = await axios.get(`${API}/gettestcategory`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setRows(data.data.testCategory);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSubTest = async () => {
    try {
      const data = await axios.get(`${API}/gettestsubcategory`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setSub(data.data.subTestCategory);
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


  useEffect(() => {
    fetchTest();
    fetchSubTest();
    fetchAccount();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const data = await axios.put(`${API}/addtestcategoryprice`, values, {
        headers: { authtoken: `${TOKEN}` },
      });
      if(data){
        toast.success("Price Added SuccessFully")
      }else{
        toast.error("Price Added Error")
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = Yup.object({
    status: Yup.string().required("Category is required"),
    rate: Yup.number().required("Rate is required"),
    subid: Yup.string().required("Group Format is required"),
    shortname: Yup.string().required("Shortname Format is required"),
    collect: Yup.string().required("Collection Format is required"),
    pricelist: Yup.string().required("Pricelist Format is required")
  });

  const formik = useFormik({
    initialValues: {
      status: "",
      rate: 0,
      subid: "",
      shortname:"",
      collect:"",
      pricelist:""
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
              <div className={classes.formh2}>Add New Price list </div>
              <div className={classes.formspecification}>
                {rows?.length} You can create a new report group here
              </div>
            </div>
            <div>
              <Buttons
                className={classes.formButton}
                onClick={() => navigate("/add-price-list")}
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
                    <div className={classes.formHeading}> New price list </div>
                    <div className={classes.formLable}>Select Account</div>
                    <Select
                      name="account"
                      value={formik.values.account}
                      onChange={formik.handleChange}
                      className={classes.selectInput}
                    >
                      {account?.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.account && (
                      <div className={classes.error}>{formik.errors.account}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Rate</div>
                    <Input
                      name="rate"
                      type="number"
                      placeholder="Enter Rate"
                      className={classes.formInput}
                      value={formik.values.rate}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.rate && (
                      <div className={classes.error}>{formik.errors.rate}</div>
                    )}
                    <br />
                    <div className={classes.formLable}>Price List Name</div>
                    <Input
                      name="pricelist"
                      type="text"
                      placeholder="Enter Price List"
                      className={classes.formInput}
                      value={formik.values.pricelist}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.pricelist && (
                      <div className={classes.error}>{formik.errors.pricelist}</div>
                    )}
                    <br />
                  </div>
                  <div className={classes.formDiv3}>

                    <div className={classes.formLable}>Select Category</div>
                    <Select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className={classes.selectInput}
                    >
                      {rows?.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.status && (
                      <div className={classes.error}>{formik.errors.status}</div>
                    )}
                    <br />
                    <br />
                    <div className={classes.formLable}>Short Name/Id</div>
                    <Input
                      name="shortname"
                      type="text"
                      placeholder="Enter Short Name/Id"
                      className={classes.formInput}
                      value={formik.values.shortname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.shortname && (
                      <div className={classes.error}>{formik.errors.shortname}</div>
                    )}
                    <br/>
                    <div className={classes.formLable}>Sample Collection</div>
                    <Input
                      name="collect"
                      type="text"
                      placeholder="Enter Sample Collection"
                      className={classes.formInput}
                      value={formik.values.collect}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.collect && (
                      <div className={classes.error}>{formik.errors.collect}</div>
                    )}
                  </div>
                  
                </div>
                <div className={classes.formLable}>Select Group Format</div>
                    <Select
                      name="subid"
                      value={formik.values.subid}
                      onChange={formik.handleChange}
                      className={classes.selectInput}
                    >
                      {sub?.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.subid && (
                      <div className={classes.error}>{formik.errors.subid}</div>
                    )}
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

export default AddPriceListForm;
