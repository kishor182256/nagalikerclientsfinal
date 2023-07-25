import { Box, IconButton, Modal, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  width: '1298.85px',
  padding: '0 10px',

  display: 'block',

  borderRadius: '6px',
  '&:focus': {
    outline: 'none',
  },
};

const patientInfo = [
  {
    id: 1,
    name: 'Lab',
    value: 'NDSC-148-23 No',
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
    name: 'Patient ID',
    value: '1234',
  },
  {
    id: 5,
    name: 'Sample no',
    value: '1234',
  },
  {
    id: 6,
    name: 'Report/Test',
    value: 'Bio-Chemistry',
  },
  {
    id: 7,
    name: 'Entry by',
    value: 'SOBH',
  },
  {
    id: 8,
    name: 'Entry Date',
    value: '23/04/2023, 10:23AM',
  },
];

const tableHeader = [
  { id: 1, name: 'Test Parameters' },
  { id: 2, name: 'Results' },
  { id: 3, name: 'LOW' },
  { id: 4, name: 'High' },
  { id: 5, name: 'Reference  Range' },
];
const tableData = [
  {
    id: 1,
    test: 'Fasting Blood Sugar',
    result: '',
    low: '60',
    high: '120',
    range: '70-110 mg/dl',
  },
  {
    id: 1,
    test: 'Fasting Blood Sugar',
    result: '',
    low: '60',
    high: '120',
    range: '70-110 mg/dl',
  },
];

const NewReportEntry = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <header className='flex justify-between bg-[#FAFAFA] border-b border-[#C9C9C9] px-6 py-6 '>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              New report entry
            </Typography>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </header>
          <main className=' px-6 py-6 '>
            <ul className='flex justify-between'>
              <div className='flex-1'>
                {patientInfo.slice(0, 3).map(item => {
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
                {patientInfo.slice(3, 6).map(item => {
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
              <div className='flex-1'>
                {patientInfo.slice(6, patientInfo.length).map(item => {
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
            <div className='bg-black/50 h-[1px] w-full my-5'></div>
            <table
              border='1'
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px',
                borderColor: 'red',
              }}
            >
              <tr>
                {tableHeader.map(item => {
                  const { id, name } = item;
                  return (
                    <th key={id} className='text-left uppercase  px-3 h-16'>
                      {name}
                    </th>
                  );
                })}
              </tr>

              {tableData.map(date => {
                return (
                  <tr className='border border-[#C9C9C9] divide-x-2 divider-[#C9C9C9] h-12 '>
                    <td className='px-5'>{date.test}</td>
                    <td className='px-5'>{/* <input type='text'  /> */}</td>
                    <td className='px-5'>{date.low}</td>
                    <td className='px-5'>{date.high}</td>
                    <td className='px-5'>{date.range}</td>
                  </tr>
                );
              })}
            </table>
            <div className='my-20'>
              <div className='flex justify-end gap-5'>
                <button
                  onClick={handleClose}
                  className='py-3 px-8 bg-[#C9C9C9] rounded  text-white font-semibold'
                >
                  Cancel
                </button>
                <button
                  onClick={handleClose}
                  className='py-3 px-8 bg-[#B82C3A] rounded text-white font-semibold'
                >
                  Save
                </button>
              </div>
            </div>
          </main>
        </div>
      </Box>
    </Modal>
  );
};

export default NewReportEntry;
