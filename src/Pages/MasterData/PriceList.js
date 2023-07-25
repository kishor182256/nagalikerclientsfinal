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
import { tableStyles } from "../../Styles/AddNewDocStyle";
import { API } from "../../config";
import Buttons from "../../Components/Shared/Buttons";
import PopoverMenu from "../../Components/Shared/Popover";

const PriceList = () => {
  const tableclasses = tableStyles();
  const TOKEN = localStorage.getItem("logintoken");

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);
  const [page,setPage] = useState(1);
  const [pageInfo,setPageInfo] = useState()



  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await axios.get(`${API}/gettestsubcategory/${page}/5`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data.data.subTestCategory);
    setPageInfo(data?.data)
  };

  useEffect(() => {
    fetchData();
  }, [newData,page]);

  const handleDelete = (data) => {
    console.log("handleDelete", data);
  };

  const handleEdit = (id) => {
    navigate(`/edit-price-list/${id}`);
  };

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
            <div className={tableclasses.h2}>Price List</div>
            <div className={tableclasses.specification}>{rows?.length} available test</div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/register-price-list")}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.49984 9.88346C5.65889 9.88346 4.1665 8.39108 4.1665 6.55013C4.1665 4.70918 5.65889 3.2168 7.49984 3.2168C9.34079 3.2168 10.8332 4.70918 10.8332 6.55013C10.8332 8.39108 9.34079 9.88346 7.49984 9.88346ZM15.8332 9.88347C15.3729 9.88347 14.9998 9.51038 14.9998 9.05014V7.38347H13.3332C12.8729 7.38347 12.4998 7.01038 12.4998 6.55014C12.4998 6.0899 12.8729 5.7168 13.3332 5.7168H14.9998V4.05014C14.9998 3.5899 15.3729 3.2168 15.8332 3.2168C16.2934 3.2168 16.6665 3.5899 16.6665 4.05014V5.7168H18.3332C18.7934 5.7168 19.1665 6.0899 19.1665 6.55014C19.1665 7.01038 18.7934 7.38347 18.3332 7.38347H16.6665V9.05014C16.6665 9.51038 16.2934 9.88347 15.8332 9.88347Z"
                  fill="white"
                />
                <path
                  d="M0.00054307 17.5494C0.323549 13.5722 3.55159 11.5501 7.48612 11.5501C11.476 11.5501 14.7541 13.4611 14.9983 17.5501C15.008 17.713 14.9983 18.2168 14.3722 18.2168C11.2843 18.2168 6.6956 18.2168 0.606252 18.2168C0.39726 18.2168 -0.0170515 17.7661 0.00054307 17.5494Z"
                  fill="white"
                />
              </svg>{" "}
              &nbsp; Add new test
            </Buttons>
          </div>
        </div>

        <div className={tableclasses.filterSearch}>
          <div>
            <Buttons className={tableclasses.printButton}>Print</Buttons>
          </div>

          <div className={tableclasses.searchContainer}>
            {/* <SearchIcon className={tableclasses.searchIcon} /> */}
            <TextField
              className={tableclasses.searchField}
              placeholder="Search"
              variant="standard"
              size="small"
            />
          </div>
        </div>

        <Table className={tableclasses.table}>
          <TableHead className={tableclasses.tableHead}>
            <TableRow>
              <TableCell className={tableclasses.customHeadName}>
                Report ID
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Report name
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Rate
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Report Category
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row._id}>
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
                  <div>{row.Rate}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.category.map((cat)=>cat.name)}</div>
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
          <Buttons
            onClick={setPrevPage}
             className={tableclasses.pageButton}>Previous</Buttons>
            <Buttons className={tableclasses.numButton}>{pageInfo?.currentPage}</Buttons>
            <Buttons
             onClick={setNextPage}
            className={tableclasses.pageButton}>Next</Buttons>
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};

export default PriceList;
