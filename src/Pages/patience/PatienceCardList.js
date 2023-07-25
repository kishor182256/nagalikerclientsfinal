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
import * as XLSX from "xlsx";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import { UserSvg } from "../../Components/Shared/UserSvg";
import PopoverMenu from "../../Components/Shared/Popover";
import { formatedDateInDigit } from "../../helper/helper";


const PatienceCardList = () => {
  const tableclasses = tableStyles();
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);

  const [name, SetName] = useState("");
  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/get-patience-card`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data?.data?.patients);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  // const filteredData = data.filter(item =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    fetchData();
  }, [newData]);

  useEffect(() => {
    if (!TOKEN) {
      navigate("/");
    }
  }, [TOKEN]);

  const handleEdit = (id) => {
    navigate(`/edit-patience-card/${id}`);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(`${API}/delete-patience-card/${id}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    if (data?.data?.message === "Card removed successfully") {
      setNewData(true);
      toast.success("Card removed successfully");
      setNewData(false);
    }
  };

  const filteredData = rows?.filter((item) =>
    item?.name?.toLowerCase().includes(name.toLowerCase())
  );

  const header = [
    "SL NO",
    "Patience Name",
    "PATience ID",
    "LAB",
    "Created Dated",
    "Refered BY",
    "Phone",
    "No of Visits",
    "status",
    "Options"
  ];

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>Patience Cards</div>
            <div className={tableclasses.specification}>
              {rows?.length} available cards
            </div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/add-patience-cards")}
            >
              <UserSvg /> &nbsp; Create new Patience Card
            </Buttons>
          </div>
        </div>

        <div className={tableclasses.filterSearch} >
          <div style={{visibility:"hidden"}}>
            <Buttons className={tableclasses.filterButton1}>Options</Buttons>
            <Buttons
              className={tableclasses.filterButton2}
              onClick={exportToExcel}
            >
              Export
            </Buttons>
            <Buttons className={tableclasses.filterButton2}>Edit</Buttons>
            <Buttons className={tableclasses.filterButton2}>Delete</Buttons>
            <Buttons className={tableclasses.filterButton3}>Access right</Buttons>
          </div>

          <div className={tableclasses.searchContainer}>
            {/* <SearchIcon className={tableclasses.searchIcon} /> */}
            <TextField
              className={tableclasses.searchField}
              /* displayEmpty */
              placeholder="Search"
              /*  defaultValue="Search" */
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
            {rows?.map((row,index) => (
              <TableRow key={row._id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={tableclasses.customTableCell}
                >
                  <div className={tableclasses.profile}>
                    <div>
                      {index+1}
                    </div>
                    <div className={tableclasses.name}>
                      <div></div>
                      <div className={tableclasses.specification}>
                        {row.specification}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.firstName}{" "}{row.lastName}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.patientId}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.labNumber}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{formatedDateInDigit(row.createdAt)}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <Buttons className={tableclasses.customActive}>
                    <div>{row?.referredBy?.map((ref)=>ref.name)}</div>
                  </Buttons>
                </TableCell>

                <TableCell className={tableclasses.customTableCell}>
                  <Buttons className={tableclasses.customActive}>
                    <div>{row.phoneNumber}</div>
                  </Buttons>
                </TableCell>


                <TableCell className={tableclasses.customTableCell}>
                  <Buttons className={tableclasses.customActive}>
                    <div>0</div>
                  </Buttons>
                </TableCell>

                <TableCell className={tableclasses.customTableCell}>
                  <Buttons className={tableclasses.customActive}>
                  <div style={{ color: row.status === 'InActive' ? 'red' : 'green' }}>{row.status}</div>
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

export default PatienceCardList;
