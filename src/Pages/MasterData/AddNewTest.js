import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import Button from "../../Components/Shared/Buttons";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { API } from "../../config";
import PopoverMenu from "../../Components/Shared/Popover";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserSvg } from "../../Components/Shared/UserSvg";

const AddNewTest = () => {
  const tableclasses = tableStyles();

  const TOKEN = localStorage.getItem("logintoken");

  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [name, SetName] = useState("");
  const [newData, setNewData] = useState(false);
  const [page,setPage] = useState(1);
  const [pageInfo,setPageInfo] = useState()




  const fetchData = async () => {
    const data = await axios.get(`${API}/gettestsubcategory/${page}/10`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data?.data?.subTestCategory);
    setPageInfo(data?.data)
  };

  useEffect(() => {
    fetchData();
  }, [newData,page]);

  const handleDelete = async (id) => {
    const data = await axios.delete(`${API}/deletetestsubcategory/${id}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    if(data?.data?.message ==='Test  removed successfully'){
      setNewData(true)
      toast.success('Test removed successfully')
      setNewData(false)
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-test/${id}`)
  };

  const filteredData = rows?.filter((item) =>
    item?.name?.toLowerCase().includes(name?.toLowerCase())
  );

  const setNextPage = () => {
    if(pageInfo?.currentPage>0){
      if(page===pageInfo?.totalPages) return 
      setPage(page+1)
    }
  }

  const setPrevPage = () => {
    if(pageInfo.currentPage>1){
      setPage(page-1)
    }
  }

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>Tests</div>
            <div className={tableclasses.specification}>345 available test</div>
          </div>
          <div>
            <Button
              className={tableclasses.addButton}
              onClick={() => navigate("/register-new-test")}
            >
              <UserSvg/>{" "}
              &nbsp; Add new test
            </Button>
          </div>
        </div>

        <div className={tableclasses.filterSearch}>
          <div>
            <Button className={tableclasses.printButton}>Print</Button>
          </div>

          <div className={tableclasses.searchContainer}>
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
              <TableCell className={tableclasses.customHeadName}>
                Test ID
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Test name
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Unit
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Category
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Options
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Actions
              </TableCell>
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
                    <div>{row.id}</div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.name}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.units}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row?.category?.map((sub)=>sub?.name)}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row?.options.map((map)=>map.code)}|{row?.options.map((map)=>map.option)} {row?.options.map((map)=>map.code)}|{row?.options.map((map)=>map.option)} </div>
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
        <div className={tableclasses.pagination}>
          <div className={tableclasses.name}>Showing {rows?.length} of {pageInfo?.totalItems} entries</div>
          <div>
            <Button
            onClick={setPrevPage}
             className={tableclasses.pageButton}>Previous</Button>
            <Button className={tableclasses.numButton}>{pageInfo?.currentPage}</Button>
            {page<pageInfo?.totalPages&&<Button 
             onClick={setNextPage}
            className={tableclasses.pageButton}>Next</Button>}
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};

export default AddNewTest;
