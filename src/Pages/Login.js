import React, { useState, useEffect } from "react";
import Input from "../Components/Shared/Input";
import { useStyles } from "../Styles/InputStyle";
import axios from "axios";
import { API } from "../config";
import { useNavigate } from "react-router-dom";
import Buttons from "../Components/Shared/Buttons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/action";
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const classes = useStyles();

 

  const [data, setData] = useState();
  const navigate = useNavigate();


  const handleLogin = async ({ email, password }) => {
    try {
      const data = await axios.post(`${API}/login`, {
        email: email,
        password: password,
      });
      setData(data?.data);
      localStorage.setItem("logintoken", data?.data?.token);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (data?.token) {
      const time =   setTimeout(() => {
        localStorage.setItem("logintoken", data?.token);
      },500)
      if (data?.admin?.role === "admin") {
      localStorage.setItem("user", data?.admin?.email);
      localStorage.setItem("role", data?.admin?.role);
      }else {
        localStorage.setItem("user", data?.user?.email);
        localStorage.setItem("role", data?.user?.role);
      }
     setTimeout(() => {
        navigate("/register-doctor");
        window.location.reload();
      },1500)
      return ()=> clearTimeout(time)
    } else if (data?.token) {
      toast.error("Please enter the username and password correctly");
    }
    
  }, [data, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  // Extract formik props
  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <>
      {/*  <ThemeProvider theme={theme}> */}
      <div className={classes.myDiv}>
        <div className={classes.myDiv1}>
          <p className={classes.textLogo}>LOGO</p>
        </div>
        <div className={classes.myDiv2}>
          <div>
            <p className={classes.maintext1}>
              Lorem Ipsum is <br />
              simply <span className={classes.subtext1}>dummy text</span>{" "}
            </p>
            <br />
            <p className={classes.subtitle1}>
              Lorem Ipsum is simply dummy text of the <br />
              printing and typesetting industry.{" "}
            </p>
          </div>
          <div>
            <img src="/images/login-img.png" alt="" />
          </div>
          <div className={classes.myDiv3}>
            <div className={classes.myDiv4}>
              <div>
                <p className={classes.maintext2}>Log In Here</p>
                <p className={classes.subtitle2}>
                  Manage all of Patients reports and view <br />
                  referred doctor details
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <Input
                  name="email"
                  type="email"
                  placeholder="Mobile / Email ID"
                  value={values.email}
                  onChange={handleChange}
                  className={classes.customInput}
                />
                {errors.email && touched.email && (
                  <div style={{color:"red"}}>{errors.email}</div>
                )}
                <br />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  className={classes.customInput}
                />
                {errors.password && touched.password && (
                  <div style={{color:"red"}}>{errors.password}</div>
                )}
                <br /> <br />
                <span className={classes.caption}>Forget Password?</span>{" "}
                <br /> <br />
                <Buttons type="submit" className={classes.customButton}>
                  Login
                </Buttons>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Login;
