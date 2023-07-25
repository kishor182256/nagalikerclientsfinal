import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import PopoverMenu from "../../Components/Shared/Popover";
import { formatedDate, formatedDateInDigit } from "../../helper/helper";
import { API } from "../../config";
import AppointmentPop from "../../Components/Shared/AppointmentPopover";
import EditSample from "../../Components/Shared/EditSample";

const AppointMent = () => {
  const tableclasses = tableStyles();
  const navigate = useNavigate();

  const [rows, setRows] = useState();
  const [newData, setNewData] = useState(false);
  const [subcategories, setSubcategories] = useState();
  const [assign, setAssign] = useState(false);
  const params = useParams();


  const price = rows?.map((row) => row);

  const TOKEN = localStorage.getItem("logintoken");

  const fetchData = async () => {
    const data = await axios.get(`${API}/get-patience/${params.phone}`, {
      headers: { authtoken: `${TOKEN}` },
    });
    setRows(data?.data);
    const subcat = data?.data?.map((subcat) => subcat?.subcategories);
    setSubcategories(subcat[0]?.map((subcat) => subcat));
  };

  useEffect(() => {
    fetchData();
  }, [newData]);

  useEffect(() => {
    if (!TOKEN) {
      navigate("/");
    }
  }, [TOKEN]);

  const handleDelete = (id)=>{
    console.log("delete", id);
  }

 

  const handleBarcode = ()=>{
    navigate('/generate-barcode')
  }

  const header = [
    "Item",
    "Short Name",
    "Rate/Price",
    "Category",
    "Collection",
    "Action",
  ];

  const priceheader = [
    "Reciet",
    "Date",
    "Paid Amount",
    "Due Amount",
    "Mode",
    "Operator",
    "Options",
  ];

  const collection = ["Sample", "Date & Time", "Status", "Barcode", "Options"];

  useEffect(() => {}, [rows]);

  const handlePrint = (row) => {
    return;
  }

  const handleEdit = (id) => {
    setAssign(true)
    console.log(id)
  }

  return (
    <div className={tableclasses.root} style={{ margin: "25px" }}>
      <div className={tableclasses.appointmentbody}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.h2}>
              {price?.firstname} {price?.lastname}
              <Box style={{ display: "flex", width: "100%",}}>
              <Box style={{ display: "flex", width: "100%"}}>
                <Typography className={tableclasses.patienceTypo}>
                  Patient ID: {rows?.map((ref) => ref._id)}
                </Typography>
              </Box>
              <Box>
                <Typography className={tableclasses.patienceTypo}>
                  Status: {rows?.map((ref) => ref.sampleStatus)}
                </Typography>
              </Box>
              </Box>
            </div>
          </div>
        </div>

        {rows?.map((row, index) => (
          <Box
            style={{ display: "flex", marginRight: "400px", margin: "20px" ,width: "100%",justifyContent:"space-between"}}
          >
            <Box key={index}>
              <Typography className={tableclasses.patienceTypo}>
                Lab: {row?.labnumber}
              </Typography>
              <Typography
                className={tableclasses.patienceTypo}
                style={{ width: "100%" }}
              >
                Patience Name: {row?.firstname} {row?.lastname}{" "}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Age/Sex : {row?.age}/{row?.gender}{" "}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Mobile: {row?.phone}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Email Address:{row?.email}
              </Typography>
            </Box>

            <Box style={{ marginLeft: "100px" }}>
              <Typography className={tableclasses.patienceTypo}>
                Refered By:{row?.referedby.map((ref) => ref.name)}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Created Date :{formatedDate(row?.createdAt)}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Address : {row?.address}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Sample From : {row?.sampleFrom}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                Reference ID : {row?.refID}
              </Typography>
              <Typography className={tableclasses.patienceTypo}>
                No of test: 2
              </Typography>
            </Box>
          </Box>
        ))}

        <Box>
          <Box>
            <Typography style={{ margin: "25px" }}>Investigations</Typography>
            <Table className={tableclasses.table}>
              <TableHead className={tableclasses.tableHead}>
                <TableRow>
                  {header.map((header) => {
                    return (
                      <TableCell className={tableclasses.customHeaderAppt}>
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {subcategories &&
                  subcategories?.map((row, index) => (
                    <TableRow key={row?.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={tableclasses.customTableCell}
                        style={{ display: "flex" }}
                      >
                        
                        <div className={tableclasses.name}>
                          <div>{row?.name}</div>
                        </div>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={tableclasses.customTableCell}
                      >
                        <div className={tableclasses.name}>
                          <div>{row?.shortname}</div>
                          <div className={tableclasses.specification}>
                            {/* {row?.Rate} */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={tableclasses.customTableCell}>
                        <div>{row?.Rate}</div>
                      </TableCell>
                      <TableCell className={tableclasses.customTableCell}>
                        <div>{row?.sampleType}</div>
                      </TableCell>
                      <TableCell className={tableclasses.customTableCell}>
                        <div>{rows?.collect}</div>
                      </TableCell>

                      <TableCell className={tableclasses.customTableCell}>
                        <div className={tableclasses.customArrow}>
                          ...
                          <AppointmentPop
                            data={rows}
                            handleDelete={() => handleDelete(row._d)}  
                             investigate={true} 
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>

          <Box>
            <Typography style={{ margin: "25px" }}>
              Sample collection
            </Typography>
            <Table className={tableclasses.table}>
              <TableHead className={tableclasses.tableHead}>
                <TableRow>
                  {collection.map((header) => {
                    return (
                      <TableCell className={tableclasses.customHeaderAppt}>
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {subcategories?.map((row, index) => {
                  return (
                    <TableRow key={row?._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={tableclasses.customTableCell}
                        style={{ display: "flex" }}
                      >
                        <div className={tableclasses.name}>
                          <div>{row?.sampleType}</div>
                        </div>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={tableclasses.customTableCell}
                      >
                        <div className={tableclasses.name}>
                          <div>{formatedDateInDigit(row?.createdAt)}</div>
                          <div className={tableclasses.specification}>
                            {/* {row?.Rate} */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={tableclasses.customTableCell}>
                        <div>{row?.status}</div>
                      </TableCell>
                      <TableCell className={tableclasses.customTableCell}>
                        <div>{row?.barcodeId ? row?.barcodeId:"ABC"}</div>
                      </TableCell>

                      <TableCell className={tableclasses.customTableCell}>
                        <div className={tableclasses.customArrow}>
                          ...
                          <AppointmentPop
                            data={rows}
                            handleBarcode={() => handleBarcode()}
                            handleView={() => ""}
                            viewReport={() => ""}
                            handleEdit={() => handleEdit(row._id)}
                            sample={true}
                          />
                        </div>
                      </TableCell>
                      {assign && (
                    <EditSample
                      assign={assign}
                      setAssign={setAssign}
                      id={row._id}
                    />
                  )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>

          <Box>
            <Typography style={{ margin: "25px" }}>
              Payment & reciept details
            </Typography>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography>
                  Total amount : ₹{price?.map((price) => price.totalamount)}
                </Typography>
              </Box>

              <Box>
                <Typography>
                  Discount amount : ₹{price?.map((price) => price.discount)}
                </Typography>
              </Box>

              <Box>
                <Typography style={{ marginRight: "35px" }}>
                  Net amount : ₹{price?.map((price) => price.netamount)}
                </Typography>
              </Box>
            </Box>
            <Table className={tableclasses.table}>
              <TableHead className={tableclasses.tableHead}>
                <TableRow>
                  {priceheader.map((header) => {
                    return (
                      <TableCell className={tableclasses.customHeaderAppt}>
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow key={row?.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={tableclasses.customTableCell}
                      style={{ display: "flex" }}
                    >
                      
                      <div className={tableclasses.name}>
                        <div>{index+1}</div>
                      </div>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={tableclasses.customTableCell}
                    >
                      <div className={tableclasses.name}>
                        <div>{row?.name}</div>
                        <div className={tableclasses.specification}>
                          {formatedDate(row?.createdAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={tableclasses.customTableCell}>
                      <div>{row?.paidamount}</div>
                    </TableCell>
                    <TableCell className={tableclasses.customTableCell}>
                      <div>{row?.dueamount}</div>
                    </TableCell>
                    <TableCell className={tableclasses.customTableCell}>
                      <div>Cash</div>
                    </TableCell>
                    <TableCell className={tableclasses.customTableCell}>
                      <div>Lab</div>
                    </TableCell>

                    <TableCell className={tableclasses.customTableCell}>
                      <div className={tableclasses.customArrow}>
                        ...
                        <AppointmentPop
                          data={rows}
                          handlePrint={() => handlePrint()}
                          handleEdit={() => handleEdit()}
                          payment={true}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AppointMent;
