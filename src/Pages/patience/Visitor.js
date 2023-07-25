import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import { DoctorSvg } from "../../Components/Shared/UserSvg";
import PopoverMenu from "../../Components/Shared/Popover";
import { convertTo12HourFormat, formatedDate } from "../../helper/helper";


const Visitor = () => {
  const tableclasses = tableStyles();
  const navigate = useNavigate();

  const [newData, setNewData] = useState(false);
  const TOKEN = localStorage.getItem("logintoken");

  const [rows, setRows] = useState(null);
  

  const fetchData = async () => {
    const data = await axios.get(`${API}/get-booking-list`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data?.data?.bookingList);
  };

  useEffect(() => {
    fetchData();
  }, [newData]);

  useEffect(() => {
    if (!TOKEN) {
      navigate("/");
    }
  }, [TOKEN]);

  const handleEdit = (id) => {
    navigate(`/edit-doctor/${id}`);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(`${API}/delete-booking-list/${id}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    if (data?.data?.message === "Booking removed successfully") {
      setNewData(true);
      toast.success("Doctor removed successfully");
      setNewData(false);
    }
  };

  const header = [
    
    "ID","Scheduled Date & Time","Name & Id",
    " Phone No",
    "Investigation","Completed Date & Time","Lab No","Visit By","Amount",
    "STATUS",
    "OPTIONS",
  ];

  return (
    <Box className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>Visit List</div>
            <div className={tableclasses.specification}>
              {rows?.length} available Visits
            </div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/add-visit")}
            >
              <DoctorSvg /> &nbsp; Create New Visit
            </Buttons>
          </div>
        </div>
        <Table className={tableclasses.table}>
          <TableHead className={tableclasses.tableHead}>
            <TableRow>
              {header.map((header) => {
                return (
                  <TableCell className={tableclasses.customTableCell}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, ind) => (
              <TableRow key={row.email}>
                <TableCell
                  component="th"
                  scope="row"
                  className={tableclasses.customTableCell}
                >
                  <div className={tableclasses.profile}>
                    <div>{ind + 1}</div>
                    <div className={tableclasses.name}>
                      <div></div>
                      <div className={tableclasses.specification}></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div className={tableclasses.name}>
                    <div>{formatedDate(row?.date)}</div>
                    <div className={tableclasses.specification}>
                      {convertTo12HourFormat(row?.time)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                <div className={tableclasses.name}>
                    <div>{row?.patienceName}</div>
                    <div className={tableclasses.specification}>
                      {row?.patId}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row?.phone}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>-</div>
                  {/* <div className={tableclasses.specification}>{row.area}</div> */}
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                <div className={tableclasses.name}>
                    <div>{formatedDate(row?.date)}</div>
                    <div className={tableclasses.specification}>
                      {convertTo12HourFormat(row?.time)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>-</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row?.visitby}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row?.amount}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>Pending</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div className={tableclasses.customArrow}>
                    ...
                    <PopoverMenu
                      data={rows}
                      handleDelete={() => handleDelete(row._id)}
                      visit={true}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Box>
  );
};

export default Visitor;
