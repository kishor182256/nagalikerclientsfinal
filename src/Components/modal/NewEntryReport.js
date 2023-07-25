import { Box, Divider, Typography } from "@material-ui/core";
import { tableStyles } from "../../Styles/AddNewDocStyle";
import { useParams } from "react-router-dom";
import MaterialTableWithInput from "../MaterialTableWithInput";
import axios from "axios";
import { API } from "../../config";
import { useEffect, useState } from "react";
import {
  formatTime,
  formatedDate,
  formatedDateInDigit,
} from "../../helper/helper";

const NewReportEntrys = () => {
  const tableclasses = tableStyles();

  const params = useParams();


  const TOKEN = localStorage.getItem("logintoken");
  const [patience, setPatience] = useState();
  const [refRange, setrefRange] = useState();

 

  useEffect(() => {
    setrefRange(
      patience?.gender === "male"
        ? patience?.subcategories?.map((ref) => ref.rangeForMale)
        : patience?.subcategories?.map((ref) => ref.rangeForFemale)
    );
  }, []);


  const fetchUser = async (e) => {
    try {
      const data = await axios.get(
        `${API}/get-patientby-subcategory/${params.id}/${params.phone}`,
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
      setPatience(data?.data?.patience);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={tableclasses.name}>
            <div className={tableclasses.specification}>
              <Box className={tableclasses.entryMain}>
                <Box className={tableclasses.entryHeader}>
                  <Typography className={tableclasses.entryHeaderTypo}>
                    New report entry
                  </Typography>
                </Box>

                <Box className={tableclasses.patienceDetailsMain}>
                  <Box>
                    <Typography className={tableclasses.patienceFont}>
                      Lab Name: {patience?.firstname} {patience?.lastname}
                    </Typography>
                    <Typography className={tableclasses.patienceFont}>
                      Patient name: {patience?.firstname} {patience?.lastname}
                    </Typography>
                    <Typography className={tableclasses.patienceFont}>
                      Age/Sex: {patience?.gender}/{patience?.age}
                    </Typography>
                  </Box>
                  <Box className={tableclasses.patienceDetailsReport}>
                    <Typography className={tableclasses.patienceFont}>
                      Patient ID: {patience?._id.slice(-6)}
                    </Typography>
                    <Typography className={tableclasses.patienceFont}>
                      Sample no: {patience?._id.slice(-6)}
                    </Typography>
                    <Typography className={tableclasses.patienceFont}>
                      Report/Test:{" "}
                      {patience?.reportcategory?.map((test) => test.name)}
                    </Typography>
                  </Box>
                  <Box className={tableclasses.patienceDetailstime}>
                    <Typography className={tableclasses.patienceFont}>
                      Sample From: {patience?.sampleFrom}
                    </Typography>
                    <Typography className={tableclasses.patienceFont}>
                      Entry Date:{formatedDateInDigit(patience?.createdAt)}{" "}
                      {formatTime(patience?.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                <Box style={{ margingTop: "230px !important" }}>
                  <MaterialTableWithInput refRange={patience} params={params} />
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReportEntrys;
