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
import { UserSvg } from "../../Components/Shared/UserSvg";
import Buttons from "../../Components/Shared/Buttons";
import PopoverMenu from "../../Components/Shared/Popover";

const GetSampleList = () => {
  const tableclasses = tableStyles();

  const TOKEN = localStorage.getItem("logintoken");

  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [name, SetName] = useState();
  const [newData, setNewData] = useState(false);
  const [page,setPage] = useState(1);
  const [pageInfo,setPageInfo] = useState();




  const fetchData = async () => {
    const data = await axios.get(`${API}/getsampledetails/${page}/10`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data?.data?.sampleDetails);
    setPageInfo(data?.data)
  };

  useEffect(() => {
    fetchData();
  }, [newData,page]);

  const handleDelete = async (id) => {
    const data = await axios.delete(`${API}/deletesample/${id}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    if(data?.data?.message ==='Sample removed successfully'){
      setNewData(true)
      toast.success('Sample removed successfully')
      setNewData(false)
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-sample-list/${id}`)
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
            <div className={tableclasses.h2}>sample From</div>
            <div className={tableclasses.specification}>{rows?.length} available sample</div>
          </div>
          <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate("/register-sample-list")}
            >
              <UserSvg/>{" "}
              &nbsp; Add new Sample
            </Buttons>
          </div>
        </div>

        <div className={tableclasses.filterSearch}>
          <div>
            <Buttons className={tableclasses.printButton}>Print</Buttons>
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
                sample From Name
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Short/ID
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Phone
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Default
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Status
              </TableCell>
              <TableCell className={tableclasses.customHeadName}>
                Actions
              </TableCell>
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
                  <div className={tableclasses.name}>
                    <div>{row.sampleId}</div>
                  </div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.sampleFromname}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.sampleId}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.phone}</div>
                </TableCell>
                <TableCell className={tableclasses.customTableCell}>
                  <div>{row.sampleby}</div>
                </TableCell>

                <TableCell className={tableclasses.customTableCell}>
                <div style={{ color: row.status === 'active' ? 'green' : 'red' }}>{row.status}</div>
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
            {page<pageInfo?.totalPages&&<Buttons 
             onClick={setNextPage}
            className={tableclasses.pageButton}>Next</Buttons>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSampleList;
