import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import { DoctorSvg, PendingSvg } from "../../Components/Shared/UserSvg";
import PopoverMenu from "../../Components/Shared/Popover";
import AssignCollector from "../../Components/Shared/CollectorAssign";

const Patient = () => {
  const tableclasses = tableStyles();

  const TOKEN = localStorage.getItem("logintoken");
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);
  const [name, setName] = useState();
  const [assign, setAssign] = useState(false);
  const [id, setID] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/getpatiencelist/${page}/10`, {
        headers: { authtoken: `${TOKEN}` },
      });
      setRows(response.data.patients);
      setPageInfo(response.data);
    } catch (error) {
      console.error("Fetching Data Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [newData, page, rowsPerPage, fetch]);

  const handleAssign = (data) => {
    setAssign(true);
  };

  const handleView = async (phone) => {
    navigate(`/appointment-view/${phone}`)

  }

  const viewReport = async (id) => {
    navigate(`/patient-report/${id}`)
  }

  const handleEdit = async (id) => {
    navigate(`/edit-patience/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/delete-patience/${id}`, {
        headers: { authtoken: `${TOKEN}` },
      });
      if (response.data) {
        setNewData(true);
        toast.success("Patience deleted successfully");
        setNewData(false);
      }
    } catch (error) {
      console.error("Fetching Data Error", error);
    }
  };

  const filteredData = rows?.filter((item) =>
    item?.name?.toLowerCase().includes(name?.toLowerCase())
  );



  const formatedDate = (newDate) => {
    const date = new Date(newDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatTime = (newTime) => {
    const time = new Date(newTime);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  

  const header = [
    "SL No",
    "Patient Name",
    "Date & Time",
    "Lab No",
    "Reffered by",
    "Sample From",
    "Price",
    "Status",
    "Action",
  ];

  const setNextPage = () => {
    if (pageInfo?.currentPage > 0) {
      if (page === pageInfo?.totalPages) return;
      setPage(page + 1);
    }
  };

  const setPrevPage = () => {
    if (pageInfo.currentPage > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>Patients</div>
            <div className={tableclasses.specification}>
              {rows?.length} pending patient reports
            </div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/add-patience")}
            >
              <DoctorSvg /> &nbsp; Add new Patient
            </Buttons>
          </div>
        </div>

        <div className={tableclasses.filterSearch}>
          <div>
            {/* <Buttons className={tableclasses.filterButton1}>
              <FilterSvg />
            </Buttons>
            <Buttons className={tableclasses.filterButton2}>Filter By</Buttons>
            <Buttons className={tableclasses.filterButton2}>Date</Buttons>
            <Buttons className={tableclasses.filterButton2}>Category</Buttons>
            <Buttons className={tableclasses.filterButton2}>
              Test Status
            </Buttons>
            <Buttons className={tableclasses.filterButton3}>
              <ResetFilterSvg />
              <span style={{ color: "#FF8743", marginLeft: 6, text: "center" }}>
                Reset FIlter
              </span>{" "}
            </Buttons> */}
            <Buttons className={tableclasses.printButton}>Print</Buttons>
          </div>

          <div className={tableclasses.searchContainer}>
            <TextField
              className={tableclasses.searchField}
              placeholder="Search"
              variant="standard"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <>
          <Table className={tableclasses.table}>
            <TableHead className={tableclasses.tableHead}>
              <TableRow>
                {header.map((header) => {
                  return (
                    <TableCell className={tableclasses.customHeadName}>
                      {header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={tableclasses.customTableCell}
                    style={{ display: "flex" }}
                  >
                    <div className={tableclasses.name}>
                      <div>{index + 1}</div>
                    </div>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={tableclasses.customTableCell}
                  >
                    <div className={tableclasses.name}>
                      <div>
                        {row.firstname} {row.lastname}
                      </div>
                      <div className={tableclasses.specification}>
                        {row.sampNo}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div>{formatedDate(row.updatedAt)}</div>
                    <div className={tableclasses.specification}>
                      {formatTime(row.updatedAt)}
                    </div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div>{row.labnumber}</div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div>{row?.referedby?.map((ref)=>ref.name)}</div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div>{row.sampleFrom}</div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div>{row?.totalamount}</div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div
                      style={{
                        text: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <PendingSvg />
                      </div>
                      <div>
                        <span
                          style={{
                            color: "#D48A48",
                            marginLeft: 6,
                            text: "center",
                          }}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={tableclasses.customTableCell}>
                    <div className={tableclasses.customArrow}>
                      ...
                      <PopoverMenu
                        data={rows}
                        handleEdit={() => handleEdit(row._id)}
                        handleDelete={() => handleDelete(row._id)}
                        handleView={() => handleView(row.phone)}
                        viewReport={() => viewReport(row.phone)}
                        handleAssign={() => {
                          handleAssign(row._id);
                          setID(row._id);
                        }}
                      />
                    </div>
                  </TableCell>
                  {assign && (
                    <AssignCollector
                      assign={assign}
                      setAssign={setAssign}
                      patienceId={id}
                    />
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
        <div className={tableclasses.pagination}>
          <div className={tableclasses.name}>
            Showing {rows?.length} of {pageInfo?.totalItems} entries
          </div>
          <div>
            <Buttons onClick={setPrevPage} className={tableclasses.pageButton}>
              Previous
            </Buttons>
            <Buttons className={tableclasses.numButton}>
              {pageInfo?.currentPage}
            </Buttons>
            <Buttons onClick={setNextPage} className={tableclasses.pageButton}>
              Next
            </Buttons>
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};

export default Patient;
