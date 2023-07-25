import { tableStyles } from '../Styles/AddNewDocStyle';
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';
import { formStyles } from '../Styles/Formstyle';
import Buttons from '../Components/Shared/Buttons';
import Input from '../Components/Shared/Input';
import { API } from '../config';
import axios from 'axios';

const AddPermanentPatientCard = () => {
  const tableclasses = tableStyles();
  const classes = formStyles();
  const [rows, setRows] = useState();
  const [sub, setSub] = useState();
  const [status, setStatus] = useState('');
  const [subid, setSubId] = useState('');
  const [rate, setPrice] = useState(0);
  const TOKEN = localStorage.getItem("logintoken");


  const handleSubmit = async () => {
    console.log('Submit', status, subid, rate);

    try {
      const data = await axios.put(
        `${API}/addtestcategoryprice`,
        { status, subid, rate },
        {
          headers: { authtoken: `${TOKEN}` },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={tableclasses.root}>
      <div className={tableclasses.body}>
        <div className={tableclasses.header}>
          <div className={`w-full flex justify-between `}>
            <div>
              <div className={tableclasses.h2}>
                Create New Permanent Patient Card
              </div>
              <div className={`mt-1.5 ${tableclasses.specification}`}>
                You can unique card for your permanent patients
              </div>
            </div>
            <div>
              <Button className='bg-[#C9C9C9] text-white text-xs py-2.5 px-5 capitalize'>
                Back to table
              </Button>
            </div>
          </div>

          {/* <div>
            <Buttons
              className={tableclasses.addButton}
              onClick={() => navigate('/add-doctor')}
            >
              <DoctorSvg /> &nbsp; Add new doctor
            </Buttons>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddPermanentPatientCard;
