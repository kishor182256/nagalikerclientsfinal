import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import { CollectorSvg } from "../../Components/Shared/UserSvg";
import PopoverMenu from "../../Components/Shared/Popover";
import { tableStyles } from "../../Styles/AddNewDocStyle";


const Collector = () => {
  const tableclasses = tableStyles();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);

  const navigate = useNavigate();

  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/getcollectorlist`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data.data.collector);
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
    navigate(`/edit-collector/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`${API}/delete-collector/${id}`, {
        headers: { authtoken: `${TOKEN}` },
      });

      if (data?.data?.message === "Collector removed successfully") {
        setNewData(true);
        toast.success("Collector removed successfully");
        setNewData(false);
      }
    } catch (err) {
      toast.error("Error deleting");
    }
  };

  const header = [
    "Name",
    "ID",
    "Email",
    " Phone Number",
    "Location",
    "STATUS",
    "OPTIONS",
  ];

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>List of sample collectors</div>
            <div className={tableclasses.specification}>
              {rows?.length} available sample collectors
            </div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/add-collector")}
            >
              <CollectorSvg /> &nbsp; Add new collector
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
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={tableclasses.customTableCell}
                >
                  <div className={tableclasses.profile}>
                    <div>
                      <img alt={row.name} src="../images/Rectangle.png" />
                    </div>
                    <div className={tableclasses.name}>
                      <div>{row.name}</div>
                      <div className={tableclasses.specification}>
                        {row.specification}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row._id}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.email}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.phone}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.location}</div>
                  <div className={tableclasses.specification}>{row.area}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <Buttons className={tableclasses.customActive}>
                  <div style={{ color: row.status === 'Active' ? 'green' : 'red' }}>{row.status}</div>
                  </Buttons>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div className={tableclasses.customArrow}>
                    ...
                    <PopoverMenu
                      data={rows}
                      handleEdit={() => handleEdit(row._id)}
                      handleDelete={() => handleDelete(row._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Collector;
