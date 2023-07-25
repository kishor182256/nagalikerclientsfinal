import React from 'react';
import { tableStyles } from '../Styles/AddNewDocStyle';
import { Button } from '@material-ui/core';

const PatientsCards = () => {
  const tableclasses = tableStyles();

  const patientInfo = [
    {
      id: 1,
      name: 'Lab',
      value: 'DSC-148-23',
    },
    {
      id: 2,
      name: 'Patient name',
      value: 'Ashok Kumar',
    },
    {
      id: 3,
      name: 'Age/Sex',
      value: '55 yrs / Male',
    },
    {
      id: 10,
      name: 'Mobile number',
      value: '9876543210 ',
    },
    {
      id: 11,
      name: 'Email Address',
      value: 'xyz@gmail.com ',
    },
    {
      id: 4,
      name: 'Referred by',
      value: 'Dr.self',
    },

    {
      id: 6,
      name: 'Created  Date',
      value: '08-April-23, 10:23AM',
    },
    {
      id: 6,
      name: 'Address ',
      value: 'xyz, xyz',
    },

    {
      id: 8,
      name: 'No of test visits ',
      value: '05',
    },
  ];

  return (
    <div className={tableclasses.root}>
      <div
        className='px-7'
        style={{
          fontFamily: 'Poppins',
          backgroundColor: '#FFFFFF',

          alignItems: 'center',
          borderRadius: '12px',
          marginLeft: '6%',
          marginRight: '6%',
          marginTop: '3%',

          position: 'relative',
        }}
      >
        <div className={`w-full ${tableclasses.header}`}>
          <div className={`w-full flex justify-between `}>
            <div className='flex justify-between flex-1'>
              <div className={tableclasses.h2}>Brooklyn Simmons</div>
              <div
                className={`mt-1.5 text-[#B5B5C3] !text-sm ${tableclasses.specification}`}
              >
                Patient ID: 9876543210
              </div>
              <div className={`mt-1.5 text-sm ${tableclasses.specification}`}>
                Status:{' '}
                <span className='bg-[#F4FFF3] px-3 py-2 rounded-md'>
                  {' '}
                  Active
                </span>
              </div>
            </div>
            <div className='flex-1 flex justify-end'>
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
        <ul className='flex justify-between max-w-3xl  text-[#464E5F] font-medium'>
          <div className='flex-1'>
            {patientInfo.slice(0, 5).map(item => {
              const { id, name, value } = item;

              return (
                <li
                  className='my-2.5 flex items-center max-w-[350.65px]'
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
            {patientInfo.slice(5, patientInfo.length).map(item => {
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
        <div className='mt-10'>
          <SVGComponent />
        </div>
      </div>
    </div>
  );
};

export default PatientsCards;

const SVGComponent = props => (
  <svg
    width={235}
    height={222}
    viewBox='0 0 235 222'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <rect y={0.203735} width={235} height={221} fill='url(#pattern0)' />
    <defs>
      <pattern
        id='pattern0'
        patternContentUnits='objectBoundingBox'
        width={1}
        height={1}
      >
        <use
          xlinkHref='#image0_1011_4917'
          transform='matrix(0.00195312 0 0 0.00207685 0 -0.0316742)'
        />
      </pattern>
      <image
        id='image0_1011_4917'
        width={512}
        height={512}
        xlinkHref='data:image/png;base64,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'
      />
    </defs>
  </svg>
);
