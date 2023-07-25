import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import PopoverMenu from "../../Components/Shared/Popover";
import { UserSvg } from "../../Components/Shared/UserSvg";

const PatientReport = () => {
  const tableclasses = tableStyles();
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);
  const params = useParams();

  const name = rows?.length > 1 ? rows[0] : rows;

  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/get-patience/${params.phone}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    console.log();
    setRows(data.data);
  };

  const subcategories = rows?.map((row) => row?.subcategories);


  useEffect(() => {
    fetchData();
  }, [newData]);

  useEffect(() => {
    if (!TOKEN) {
      navigate("/");
    }
  }, [TOKEN]);

  const handleEdit = (id) => {
    navigate(`/edit-patience-report/${id}/${params.phone}`);
  };

  const handlePreview = (id) => {
    navigate(`/patience-report-preview/${id}/${params.phone}`);
  };

  const handleEntry = (id, phone) => {
    navigate(`/new-report-entry/${id}/${params.phone}`);
  };

  const handleVerify = (id) => {
    navigate(`/verify-report/${id}/${params.phone}`);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(`${API}/delete-user/${id}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    if (data.data.message === "User removed successfully") {
      setNewData(true);
      toast.success("User removed successfully");
      setNewData(false);
    }
  };

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
    "Reports",
    "Operator",
    "Date & time",
    "Rep No",
    "Email/SMS",
    "STATUS",
    "OPTIONS",
  ];

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>
              {name?.firstname} {name?.lastname}
            </div>
            <div className={tableclasses.specification}>
              {rows?.length} available Reports
            </div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/add-user")}
            >
              <UserSvg /> &nbsp; Add new user
            </Buttons>
          </div>
        </div>

        <Table className={tableclasses.table}>
          <TableHead className={tableclasses.tableHead}>
            <TableRow>
              {header.map((header, i) => {
                return (
                  <TableCell className={tableclasses.customTableCell}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategories?.map((row, index) => {
              return (
                <>
                  {row.map((row, index) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={tableclasses.customTableCell}
                        >
                          <div className={tableclasses.profile}>
                            <div>{index + 1}</div>
                          </div>
                        </TableCell>
                        <TableCell className={tableclasses.customTableCell}>
                          <div>{row?.name}</div>
                        </TableCell>
                        <TableCell className={tableclasses.customTableCell}>
                          <div>Operator</div>
                        </TableCell>
                        <TableCell className={tableclasses.customTableCell}>
                          <div>{formatedDate(row.updatedAt)}</div>
                          <div className={tableclasses.specification}>
                            {formatTime(row.updatedAt)}
                          </div>
                        </TableCell>
                        <TableCell className={tableclasses.customTableCell}>
                          <div>{row._id}</div>
                        </TableCell>
                        <TableCell className={tableclasses.customTableCell}>
                          <Buttons className={tableclasses.customActive}>
                            <div>{rows?.map((r) => r.reportDelivery)}</div>
                          </Buttons>
                        </TableCell>

                        <TableCell className={tableclasses.customTableCell}>
                          <Buttons className={tableclasses.customActive}>
                            <div>{row.status}</div>
                          </Buttons>
                        </TableCell>
                        <TableCell className={tableclasses.customTableCell}>
                          <div className={tableclasses.customArrow}>
                            ...
                            <PopoverMenu
                              data={rows}
                              handleEdit={() => handleEdit(row._id)}
                              handlePreview={() => handlePreview(row._id)}
                              handleVerify={() => handleVerify(row._id)}
                              handleEntry={() =>
                                handleEntry(row._id, row.phone)
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientReport;
