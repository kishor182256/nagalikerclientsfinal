import React, { useEffect, useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core';
import { formStyles } from '../Styles/Formstyle';
import Buttons from '../Components/Shared/Buttons';
import Input from '../Components/Shared/Input';
import axios from 'axios';
import { API } from '../config';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditReportGroupForm = () => {
    const classes = formStyles();
    const [name, setName] = useState();
    const [prefix, setPrefix] = useState();
    const [suffix, setSuffix] = useState();
    const [lastnumber, setLastnumber] = useState();
    const navigate = useNavigate();


    const params = useParams()



  

  const TOKEN = localStorage.getItem("logintoken");


    
    const fetchCollector = async (e) => {
      try {
        const data = await axios.get(`${API}/gettestcategory/${params.id}`, {
          headers: { authtoken: `${TOKEN}` },
        });

        const { name, lastnumber, prefix, suffix } = data.data.testCategory;
        setName(name);
        setLastnumber(lastnumber);
        setPrefix(prefix);
        setSuffix(suffix);
      } catch (e) {
        console.error(e);
      }
    };
  
  
    useEffect(()=>{
      fetchCollector()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const data =  await axios.put(`${API}/edittestcategory/${params.id}`,{name, lastnumber, prefix, suffix}, {
            headers: { authtoken: `${TOKEN}` },
          });
          if(data.data){
           toast.success("Report group Updated")
          }
        } catch (e) {}
      };
    

  return (
    <>  
    <div  className={classes.root}> 
      <div  className={classes.collectorForm}> 
        <div className={classes.formheader}>
          <div className={classes.formname}>
            <div className={classes.formh2}>Edit Report category/group </div>
            <div className={classes.formspecification}>
              You can Edit report group here 
            </div>
          </div>
          <div>
            <Buttons className={classes.formButton} onClick={() =>navigate('/add-report-group')}>
              &nbsp; Back to test table
            </Buttons>
          </div>
        </div>
        
        <div>
          <div className={classes.formMain}>
            <FormControl>
              <div  className={classes.formDiv1}>
                <div  className={classes.formDiv2}>
                <div className={classes.formHeading}> New Report category/group </div>
                <div className={classes.formLable}>Report group name</div>
                <Input
                  type="text"
                  placeholder="Enter name"
                  className={classes.formInput}
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />{" "}
                <br />
                <div className={classes.formLable}>Last number</div>
                <Input
                  type="text"
                  placeholder="Enter Phone lastdigits"
                  className={classes.formInput}
                  value={lastnumber}
                  onChange={(e)=>setLastnumber(e.target.value)}
                />{" "}
                <br />
                </div>
              <div  className={classes.formDiv3}>
                <div className={classes.formLable}>Prefix</div>
                <Input
                  type="text"
                  placeholder="Enter Prefix"
                  className={classes.formInput}
                  value={prefix}
                  onChange={(e)=>setPrefix(e.target.value)}
                />{" "}
                <br />
                <div className={classes.formLable}>Sufix</div>
                <Input
                  type="text"
                  placeholder="Enter Suffix"
                  className={classes.formInput}
                  value={suffix}
                  onChange={(e)=>setSuffix(e.target.value)}
                />{" "}
                <br />
              </div>
              </div> 
              <div className={classes.formDiv4}>
                <Buttons className={classes.cancelButton}>
                Cancel
                </Buttons>
                <Buttons className={classes.submitButton} onClick={handleSubmit}>
                Submit
                </Buttons>
              </div>
            </FormControl>
          </div>
        </div>    
        
      </div> 
    </div> 




    
   </>
  )
}

export default EditReportGroupForm