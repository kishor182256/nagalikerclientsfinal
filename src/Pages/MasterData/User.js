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
import PopoverMenu from "../../Components/Shared/Popover";
import Buttons from "../../Components/Shared/Buttons";
import { UserSvg } from "../../Components/Shared/UserSvg";


const User = () => {
  const tableclasses = tableStyles();
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);

  const [name, SetName] = useState("");
  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/getuserlist`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data.data.users);
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
    navigate(`/edit-user/${id}`);
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

  const filteredData = rows?.filter((item) =>
    item?.name?.toLowerCase().includes(name.toLowerCase())
  );

  const header = [
    "Name",
    "ID",
    "Email",
    " Phone number",
    "Audit lock days",
    "STATUS",
    "OPTIONS",
  ];

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>List of Users/Operators</div>
            <div className={tableclasses.specification}>
              {rows?.length} available doctors
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

        <div className={tableclasses.filterSearch}>
          <div>
            {/* <Button className={tableclasses.filterButton1}>Options</Button> */}
            <Buttons
              className={tableclasses.filterButton2}
              onClick={exportToExcel}
            >
              Export
            </Buttons>
            {/* <Button className={tableclasses.filterButton2}>Edit</Button>
            <Button className={tableclasses.filterButton2}>Delete</Button>
            <Button className={tableclasses.filterButton3}>Access right</Button> */}
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
            {filteredData?.map((row) => (
              <TableRow key={row._id}>
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
                  <div>{row.auditlockdays}</div>
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

export default User;
