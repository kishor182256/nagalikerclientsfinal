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
import { tableStyles } from "../../Styles/AddNewDocStyle";
import Buttons from "../../Components/Shared/Buttons";
import { PendingSvg } from "../../Components/Shared/UserSvg";
import PopoverMenu from "../../Components/Shared/Popover";
import { API } from "../../config";


const PatientSample = () => {
  const tableclasses = tableStyles();
  const [rows, setRows] = useState([]);
  const [name, SetName] = useState("");
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState();


  const formatedDate = (newDate) => {
    const date = new Date(newDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatTime = (newTime) => {
    const time = new Date(newTime);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const TOKEN = localStorage.getItem("logintoken");

  const filteredData = rows?.filter((item) =>
    item?.firstname.toLowerCase().includes(name?.toLowerCase())
  );

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
  }, [page]);

  const handleDelete = (id) => {
    
  };

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

  const header = [
    "Collection name",
    "Location",
    "Patient name & no",
    "Date & Time",
    "Lab No",
    "Reffered By",
    "Sample",
    "Status",
    "Actions",
  ];

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>Sample collections</div>
            <div className={tableclasses.specification}>
              {rows?.length}sample collection
            </div>
          </div>
          {/* <div>
            <Buttons className={tableclasses.addButton}>
              <DoctorSvg /> &nbsp; Add new Patient
            </Buttons>
          </div> */}
        </div>

        <div className={tableclasses.filterSearch}>
           <div>
            {/* <Buttons className={tableclasses.filterButton1}>
              <FilterSvg />
            </Buttons>
            <Buttons className={tableclasses.filterButton2}>Filter By</Buttons>
            <Buttons className={tableclasses.filterButton2}>Date</Buttons>
            <Buttons className={tableclasses.filterButton2}>Location</Buttons>
            <Buttons className={tableclasses.filterButton2}>
              Sample Status
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
            {/* <SearchIcon    className={tableclasses.searchIcon} /> */}
            <TextField
              className={tableclasses.searchField}
              placeholder="Search"
              variant="standard"
              size="small"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
          </div>
        </div>

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
            {filteredData?.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={tableclasses.customTableCell}
                >
                  <div className={tableclasses.name}>
                    <div>{row?.collector?.name?.toString()}</div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div className={tableclasses.name}>
                    <div>{row.city}</div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div className={tableclasses.name}>
                    <div>{row.firstname}</div>
                    <div className={tableclasses.specification}>
                      {row.phone}
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
                  <div>{row.sampleType}</div>
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
                    {row.sampleStatus}{" "} <PendingSvg />
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
                    {/* <PopoverMenu
                      data={rows}
                      // handleEdit={() => handleEdit(row._id)}
                      handleDelete={() => {
                        console.log("row._id", row);
                      }}
                    /> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

export default PatientSample;
