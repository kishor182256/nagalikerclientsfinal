import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

const MaterialTableWithInput = ({ refRange, params,enteredValue}) => {
  const [data, setData] = useState([]);
  const [value, setResult] = useState([]);
  const [path, setPath] = useState("");
  const [verif, setVerify] = useState(false);

  const TOKEN = localStorage.getItem("logintoken");

   const resultVal = enteredValue?.join(',')

  const gender = refRange?.gender;

  const urlValue = () => {
    const path = window.location.pathname;
    if (path.startsWith("/verify-report/")) {
      setPath(path);
      verify(path);
    } else {
      const extractedValue = path.split("/").pop();
      setPath(extractedValue);
    }
  };

  const verify = () => {
    const input = path;
    const substring = "verify-report";

    if (input?.includes(substring)) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  };

  useEffect(() => {
    urlValue();
    verify();
  }, [path]);

  const { phone, id } = useParams();

  const navigate = useNavigate();

  const range =
    refRange?.gender === "male"
      ? refRange?.subcategories?.map((ref) => ref.rangeForMale[0])
      : refRange?.subcategories?.map((ref) => ref.rangeForFemale[0]);


  const tableStyles = makeStyles({
    table: {
      borderTop: "1px solid rgba(96, 96, 96, 0.3)",
    },
    tableCell: {
      height: 15,
      borderRight: "1px solid rgba(96, 96, 96, 0.3)",

      padding: "8px",
    },
    container: {
      overflow: "hidden", // Hide the scrollbar
    },
  });

  const classes = tableStyles();

  const handleResultChange = (e, index) => {
    const updatedResult = [...value];
    updatedResult[index] = e.target.value;
    setResult(updatedResult);
  };

  const handleCellChange = (e, id, field) => {
    const updatedData = data?.map((item) => {
      if (item._id === id) {
        const updatedItem = {
          ...item,
          [field]: e.target.value,
        };
        return updatedItem;
      }
      return item;
    });

    setData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/update-patient-report/`,
        { phone, value, id, gender },
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
      toast.success("Report updated");
      navigate("/list-patience");
    } catch (e) {
      console.error(e);
      // toast.error("Error in update-patient-report");
    }
  };

  useEffect(() => {}, [value]);

  return (
    <form onSubmit={handleSubmit}>
      <TableContainer
        component={Paper}
        style={{ marginTop: "20px" }}
        className={classes.container}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                Test Parameter
              </TableCell>
              <TableCell className={classes.tableCell}>Result</TableCell>
              <TableCell className={classes.tableCell}>Low</TableCell>
              <TableCell className={classes.tableCell}>High</TableCell>
              <TableCell className={classes.tableCell}>
                Reference Range
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {range !== undefined &&
              range?.map((item, index) => (
                <TableRow key={item?._id}>
                  <TableCell className={classes.tableCell}>
                    {refRange?.subcategories[index]?.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <TextField
                      style={{ width: "100%", height: "100%" }}
                      contentEditable
                      value={value[index] || ""}
                      onChange={(e) => handleResultChange(e, index)}
                      variant="outlined"
                      margin="normal"
                    />
                  </TableCell>

                  {item?.low && (
                    <TableCell
                      className={classes.tableCell}
                      onInput={(e) => handleCellChange(e, item?._id, "low")}
                    >
                      {item?.low}
                    </TableCell>
                  )}
                  {item?.high && (
                    <TableCell
                      className={classes.tableCell}
                      onInput={(e) => handleCellChange(e, item?._id, "high")}
                    >
                      {item?.high}
                    </TableCell>
                  )}
                  {item?.refRange && (
                    <TableCell
                      className={classes.tableCell}
                      onInput={(e) =>
                        handleCellChange(e, item?._id, "refRange")
                      }
                    >
                      {item?.refRange}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={!value}
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        {verif ? "Verify" : "Submit"}
      </Button>
    </form>
  );
};

export default MaterialTableWithInput;
