import { Box, IconButton, Modal, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { API } from '../../config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  width: '800.88px',
  padding: '0 10px',
  height: '100%',
  overflow: 'scroll',
  height: '100%',
  display: 'block',

  borderRadius: '6px',
  '&:focus': {
    outline: 'none',
  },
};

const patientInfo = [
  {
    id: 1,
    name: 'Patient No',
    value: '1102',
  },
  {
    id: 2,
    name: 'Patient name',
    value: 'Ashok Kumar',
  },
  {
    id: 3,
    name: 'Age/Sex ',
    value: '55 yrs / Male',
  },
  {
    id: 4,
    name: 'Referred by',
    value: 'Dr.self',
  },
  {
    id: 5,
    name: 'Bill No',
    value: '202/23',
  },
  {
    id: 6,
    name: 'Bill Date',
    value: '08-April-23, 10:23AM',
  },
  {
    id: 7,
    name: 'Phone Number',
    value: '9876543210',
  },
  {
    id: 8,
    name: 'Bill Type',
    value: 'Cash',
  },
];

const ReportPreview = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate(); 

  const params = useParams();


  const TOKEN = localStorage.getItem("logintoken");
  const [patience, setPatience] = useState();
   const range =
     patience?.gender === "male"
       ? patience?.subcategories?.map((ref) => ref.rangeForMale.map((ref)=>ref.refRange))
       : patience?.subcategories?.map((ref) => ref.rangeForFemale.map((ref)=>ref.refRange));


       console.log("patience",range)


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
  
  const handleClose = () => {
    setOpen(false)
    navigate('/list-patience')
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className='overflow-y-scroll '
    >
      <Box sx={style} className=''>
        <div>
          <header className='flex justify-between border-b border-[#C9C9C9] px-6 py-6 '>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Report preview
            </Typography>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </header>
          <main className=' px-6 py-6 '>
            <div className='flex items-center px-6'>
              <div className='bg-[#B82C3A] w-fit p-3 text-white font-semibold'>
                LOGO
              </div>
              <div className='flex-1 grid justify-center'>
                <h1 className='text-[#B82C3A] text-lg font-medium'>
                  Naglikar diagnostic labouratory
                </h1>
                <p className='text-xs text-[#B5B5C3]'>
                  Nariguddenahalli, kuvempu road, Bangalore -560064
                </p>
              </div>
            </div>
            <div className='bg-[#B82C3A] h-1 w-full my-6'></div>
            <ul className='flex justify-between max-w-2xl mx-auto text-[#464E5F] font-medium'>
              <div className='flex-1'>
                {patientInfo.slice(0, 4).map(item => {
                  const { id, name, value } = item;
                  return (
                    <li
                      className='my-2.5 flex items-center max-w-[300.65px]'
                      key={id}
                    >
                      <div className='flex-[0.8]'>{name}</div>
                      <div className='flex-[0.2]'>:</div>
                      <div className='flex-1'>{value}</div>
                    </li>
                  );
                })}
              </div>
              <div className='flex-1'>
                {patientInfo.slice(4, patientInfo.length).map(item => {
                  const { id, name, value } = item;
                  return (
                    <li
                      className='my-2.5 flex items-center max-w-[360.65px]'
                      key={id}
                    >
                      <div className='flex-[0.8]'>{name}</div>
                      <div className='flex-[0.2]'> :</div>
                      <div className='flex-1'>{value}</div>
                    </li>
                  );
                })}
              </div>
            </ul>

            {
              patience?.subcategories?.map((subcat) => {
                return(
                  <div>
              <div className='grid grid-cols-[1fr_100px_100px_1fr]  my-5 border-y border-#606060]/60 py-4 text-[#464E5F] font-semibold text-sm max-w-[650px] mx-auto'>
                <div>Test Name</div>
                <div>Results</div>
                <div>Units</div>
                <div className='text-center'>Normal Range</div>
              </div>
              <h1 className=' font-semibold my-10 text-center text-[#464E5F] underline underline-offset-2'>
                {subcat?.name}{' '}
              </h1>

              <div className='grid grid-cols-[1fr_100px_100px_1fr]  my-2  font-semibold text-sm max-w-[650px] mx-auto '>
                <div>FBS PPBS</div>
              </div>
              <div className='grid grid-cols-[1fr_100px_100px_1fr] text-[#464E5F]/90  my-1  text-sm max-w-[650px] mx-auto'>
                <div>Fasting Blood Sugar</div>
                <div>{subcat?.patienceresult}</div>
                <div>{subcat?.units}</div>
                <div className='text-center'>{range} {subcat?.units}</div>
              </div>
              <div className='grid grid-cols-[1fr_100px_100px_1fr] text-[#464E5F]/90  my-1  text-sm max-w-[650px] mx-auto'>
                <div>Post Prandial Blood Sugarr</div>
                <div>155.7</div>
                <div>mg/dl</div>
                <div className='text-center'>70-110 mg/dl</div>
              </div>
              <div className='grid grid-cols-[1fr_100px_100px_1fr]  my-5 font-semibold text-sm max-w-[650px] mx-auto '>
                <div>Lipid Profile</div>
              </div>

              <div className='grid grid-cols-[1fr_100px_100px_1fr] text-[#464E5F]/90  my-1  text-sm max-w-[650px] mx-auto'>
                <div>Post Prandial Blood Sugarr</div>
                <div>155.7</div>
                <div>mg/dl</div>
                <div className='text-center'>
                  Desirable: &lt;200 <br /> Borderline: 200-239 <br />
                  High: &gt;240
                </div>
              </div>

              <div className='grid grid-cols-[1fr_100px_100px_1fr] mt-8 text-[#464E5F]/90  my-1  text-sm max-w-[650px] mx-auto'>
                <div>Post Prandial Blood Sugarr</div>
                <div>155.7</div>
                <div>mg/dl</div>
                <div className='text-center'>
                  Desirable: &lt;200 <br /> Borderline: 200-239 <br />
                  High: &gt;240
                </div>
              </div>
              <div className='text-center text-sm my-10'>
                <h1>***End of report***</h1>
              </div>
              <div className='my-10'>
                <div className='flex flex-col items-end'>
                  <button className='bg-[#B82C3A] py-2 px-4 text-white font-semibold'>
                    Signature
                  </button>
                  <p className='text-sm my-2'>Lab Technologist</p>
                </div>

                <div className='bg-[#B82C3A] h-1 w-full mt-6'></div>
                <div className='flex items-center text-sm justify-between'>
                  <p className='text-[#B5B5C3]'>Thanks for refferal</p>
                  <p className='text-[#464E5F]'>Phone number: 9876543210</p>
                </div>
              </div>
            </div>
                )
              })
            }
          </main>
        </div>
      </Box>
    </Modal>
  );
};

export default ReportPreview;
