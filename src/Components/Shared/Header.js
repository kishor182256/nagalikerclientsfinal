import React, { useEffect } from "react";
import { headerStyles } from "../../Styles/HeaderStyle";
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Shared/Buttons";

const Header = () => {
  const isActive = true;
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headclasses = headerStyles();

  const user =  localStorage.getItem("user");
  const role =  localStorage.getItem("role");

  let username = user?.split("@")[0];
  let capitalizedUsername = username?.charAt(0).toUpperCase() + username?.slice(1);

 

  const logout = () => {
    localStorage.removeItem("logintoken");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={headclasses.headerMain}>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            width: "15%",
            backgroundColor: "#B82C3A",
            height: "72px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#F4FFF3",
            fontSize: "18px",
            fontStyle:"bold"
          }}
        >
          Nagalikar
        </div>
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ backgroundColor: "#B82C3A", height: "72px" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                style={{
                  height: "72px",
                  border: "none",
                  color: "#F4FFF3",
                  fontSize: "16px",
                }}
                className={headclasses.tabs}
              >
                <Tab
                  className={headclasses.tablist}
                  label="Accounts"
                  value="1"
                  onClick={()=>navigate('/register-doctor')}
                />
                <Tab
                  className={headclasses.tablist}
                  label="Master data"
                  value="2"
                  onClick={()=>navigate('/add-test')}
                />
                <Tab
                  className={headclasses.tablist}
                  label="Patients"
                  value="3"
                  onClick={()=>navigate('/list-patience')}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div style={{ height: "80px" }}>
                <Link to="/register-doctor" className={location.pathname === "/register-doctor" ? headclasses.linkActive : ""}>
                  <Button
                    active={isActive}
                    className={headclasses.customButton}
                  >
                    Doctor
                  </Button>
                </Link>
                <Link to="/register-user" className={location.pathname === "/register-user" ? headclasses.linkActive : ""}>
                  <Button className={headclasses.customButton}>Users</Button>
                </Link>
                <Link to="/register-collector" className={location.pathname === "/register-collector" ? headclasses.linkActive : ""}>
                  <Button className={headclasses.customButton}>
                    Sample collector
                  </Button>
                </Link>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div style={{ height: "80px" }}>
                <Link to="/add-test" active={isActive} className={location.pathname === "/add-test" ? headclasses.linkActive : ""}>
                  <Button component={Link} className={headclasses.customButton}>
                    Test
                  </Button>
                </Link>
                <Link to="/add-report-group" className={location.pathname === "/add-report-group" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Report Group
                  </Button>
                </Link>
                <Link to="/add-report-format" className={location.pathname === "/add-report-format" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Report Format
                  </Button>
                </Link>
                <Link to="/add-price-list" className={location.pathname === "/add-price-list" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Price list
                  </Button>
                </Link>

                <Link to="/get-account-list" className={location.pathname === "/get-account-list" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Account List
                  </Button>
                </Link>

                <Link to="/get-sample-list" className={location.pathname === "/get-sample-list" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Sample From
                  </Button>
                </Link>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div style={{ height: "80px" }}>
                <Link to="/list-patience" className={location.pathname === "/list-patience" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/list-patience"
                    className={headclasses.customButton}
                  >
                    Patients
                  </Button>
                </Link>
                <Link to="/patience-cards" className={location.pathname === "/patience-cards" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/patience-cards"
                    className={headclasses.customButton}
                  >
                    Patient cards
                  </Button>
                </Link>

                <Link to="/assign-collector" className={location.pathname === "/assign-collector" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Sample collectors
                  </Button>
                </Link>

                <Link to="/visitor-book" className={location.pathname === "/visitor-book" ? headclasses.linkActive : ""}>
                  <Button
                    component={Link}
                    to="/my-page"
                    className={headclasses.customButton}
                  >
                    Visits
                  </Button>
                </Link>

              </div>
            </TabPanel>
          </TabContext>
        </Box>
        <div
          style={{
            width: "25%",
            backgroundColor: "#B82C3A",
            height: "72px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#F4FFF3",
              textAlign: "right",
              marginRight: "6px",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            <span>{capitalizedUsername}</span>
            <span>{role}</span>
          </div>
            <p style={{color:"#FFFFFF",marginLeft:"20px",fontWeight:"bold"}}>{capitalizedUsername?.charAt(0).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
