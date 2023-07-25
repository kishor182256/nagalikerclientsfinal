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


const GetAccountList = () => {
  const tableclasses = tableStyles();
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);

  const [name, SetName] = useState("");
  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/getaccountdetails`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data?.data?.accountDetails);
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
    navigate(`/edit-account-list/${id}`);
  };

  const handleDelete = async (id) => {
    
    // return;
    const data = await axios.delete(`${API}/deleteaccount/${id}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    
    if (data?.data?.message === "Account  removed successfully") {
      setNewData(true);
      toast.success("Account  removed successfully");
      setNewData(false);
    }
  };

  const filteredData = rows?.filter((item) =>
    item?.name?.toLowerCase().includes(name.toLowerCase())
  );

  const header = [
    "SL NO",
    "Account Name",
    "Account Code",
    "Place",
    "Phone No",
    "Key Person",
    "Price",
    "Default",
    "Options"
  ];

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>Account List</div>
            <div className={tableclasses.specification}>
              {rows?.length} available cards
            </div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/add-new-account")}
            >
              <UserSvg /> &nbsp; Add New Account
            </Buttons>
          </div>
        </div>

        <div className={tableclasses.filterSearch} >
          <div style={{visibility:"hidden"}}>
            <Buttons className={tableclasses.filterButton1}>Options</Buttons>
            <Buttons
              className={tableclasses.filterButton2}
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
            {filteredData?.map((row,index) => (
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
                  <div>{row.name}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.prefix}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.place}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.phone}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <Buttons className={tableclasses.customActive}>
                    <div>{row.keyperson}</div>
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

export default GetAccountList;
