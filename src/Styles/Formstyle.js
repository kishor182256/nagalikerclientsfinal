import { makeStyles   } from '@material-ui/core/styles';

export const formStyles = makeStyles({
  root: {
    background: '#f5f5f5', // Set your desired background color
    paddingBottom: '3%',
    paddingTop: '3%',
    fontFamily: 'Poppins',
    margin: 0,
  },
  collectorForm:{
    backgroundColor: '#FFFFFF',
    margin: '0 70px',
    borderRadius: '12px',
    paddingBottom: '6%',
  },
    myDiv5:{
       width: 480,
       height: 430,
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
      },

    selectInput:{
       width : '350px',
       height : '42px',
       fontFamily: 'Poppins',
       borderRadius: '4px',
       border: '2px solid #c4c4c4',
       marginTop: '9px',
       marginBottom: '28px',
       padding: '0 12px',
       color: '#676767',
       fontSize: '13px',
       fontFamily: 'Poppins',
       fontWeight: 400,
       '&.MuiInput-underline:before':{
            borderBottom: 0,
            content: 'none',
       },
       '&.MuiInput-underline:after':{
            borderBottom: 0,
            content: 'none',
       },
      
     },
    /*  menuInput:{
       backgroundColor: 'transparent',
       '&.MuiSelect-select:focus':{
        backgroundColor: 'transparent',
       },
      '&.MuiSelect-select.MuiSelect-select':{
        paddingLeft: '12px',
      },
      top: 0,
      '&.MuiPaper-root':{
        top: 224,
      },

     }, */

     selectLabel:{
       borderRadius: '14px',
      border: '1px solid #DDDDDD',
      height : '53px',
      marginTop: '6px',
        '&.MuiInputLabel-shrink':{
            transform: 'none',
        },
     },
     
     formheader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'left',
      paddingTop: '3%',
      paddingBottom: '8%',
      fontFamily: 'Poppins',
      margin: '0 60px'
    },
    formh2:{
      fontSize: '18px',
      fontWeight: 500,
      color: '#212121',
      fontFamily: 'Poppins',
    },
    formname: {
        fontFamily: 'Poppins',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        flexDirection: 'column',
        paddingLeft: '12px',
        fontSize: '14px',
        color: '#464E5F',
    },
    formspecification:{
        color: '#B5B5C3',
        fontSize: '12px',
        fontFamily: 'Poppins',
    },
    formButton: {
        borderRadius: '6px',
        height : '38px',
        fontFamily: 'Poppins',
        '&.MuiButton-contained':{
          backgroundColor: '#C9C9C9',
            color: '#FFFFFF',
            fontSize: '10px',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
             /*  transform: 'none', */ backgroundColor: '#C9C9C9',
            },
        }
    }, 
     formMain:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

     },
     formDiv1:{
       display: 'flex',
       /* margin: '0 5%' */

     },
     formDiv3:{
       marginTop: '90px',
     },
     formLable:{
      fontFamily: 'Poppins',
      fontSize: '13px',
      color: '#181C32',
     },

     formHeading:{
      /* margin: '0 0 70px 245px', */
      marginBottom: '70px',
      fontSize: '18px',
      fontFamily: 'Poppins',
      fontWeight: 500,
     },

     formInput: {
        width : '350px',
        fontFamily: 'Poppins',
        margin: '4px 48px 28px 0px',
        '& .MuiInputBase-input': { /* input field */
              color: '#676767',
              fontSize: '13px',
              fontFamily: 'Poppins',
              fontWeight: 400,
            },
        '& .MuiInputBase-root': { /* input border */
          borderRadius: '4px',
          border: '1px solid #DDDDDD',
          height : '42px',
          marginTop: '6px',
        },
        '&  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent', /* remove input bordercolor focus */
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#DDDDDD',
        },
        
      },

      error:{
        color:'red'
      },

      formDiv4:{
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'right',
        marginRight: '4%',
      },
      cancelButton: {
        borderRadius: '6px',
        height : '38px',
        fontFamily: 'Poppins',
        width: 110,
        marginRight: '2%',
        marginTop: '2%',
        '&.MuiButton-contained':{
          backgroundColor: '#C9C9C9',
            color: '#FFFFFF',
            fontSize: '10px',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
             /*  transform: 'none', */ backgroundColor: '#C9C9C9',
            },
        }
    }, 
    submitButton: {
      borderRadius: '6px',
      height : '38px',
      fontFamily: 'Poppins',
      width: 110,
      marginRight: '2%',
      marginTop: '2%',
      '&.MuiButton-contained':{
        backgroundColor: '#B82C3A',
          color: '#FFFFFF',
          fontSize: '10px',
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
          backgroundColor: '#B82C3A',
          },
      }
  }, 
  tablist:{
    textTransform: 'none',
    '&.MuiTabs-root':{
        textTransform: 'none',
        color: '#C9C9C9',
    },
    '&.Mui-selected':{
        borderBottom: '1px solid #e8e8e8',
        textTransform: 'none',
        color: '#273142',
        fontWeight: '600px',
    },
    '&.MuiTab-wrapper':{
      backgroundColor: '#273142',
    }, '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  },

  tabs:{
      '&.MuiTabs-root':{
          height: '72px',
          textTransform: 'none',
      },
      '& .MuiTabs-indicator':{
      bottom: "none",
      border: "none",
      display: 'none',
      },  
  }, 

  genderDiv1:{
    backgroundColor: '#FAFAFA',
    padding: '5%',
    margin: '5% 0',
    borderRadius: '12px',
  },
  genderDiv2:{
    margin: '40px 0',
    display: 'flex',
   /*  flexDirection: 'column', */
  },
  genderHeading:{
    fontSize:'16px',
    color: '#B82C3A',
  },
  genformInput: {
    width : '90%',
    fontFamily: 'Poppins',
    margin: '4px 48px 0px 0px',
    '& .MuiInputBase-input': { /* input field */
          color: '#676767',
          fontSize: '13px',
          fontFamily: 'Poppins',
          fontWeight: 400,
        },
    '& .MuiInputBase-root': { /* input border */
      borderRadius: '4px',
      border: '1px solid #DDDDDD',
      height : '42px',
      marginTop: '6px',
    },
    '&  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent', /* remove input bordercolor focus */
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DDDDDD',
    },
    
  },
 
  addButton: {
    borderRadius: '6px',
    height : '40px',
    fontFamily: 'Poppins',
    marginLeft: '2%',
    marginTop: '1%',
    '&.MuiButton-contained':{
      backgroundColor: '#B82C3A',
        color: '#FFFFFF',
        fontSize: '10px',
        boxShadow: 'none',
        textTransform: 'none',
        '&:hover': {
         /*  transform: 'none', */ backgroundColor: '#B82C3A',
        },
    }
}, 
addTestInput:{
  width : '60%',
  height : '42px',
  fontFamily: 'Poppins',
  borderRadius: '4px',
  border: '2px solid #c4c4c4',
  marginTop: '11px',
  marginBottom: '28px',
  padding: '0 12px',
  color: '#676767',
  fontSize: '13px',
  fontFamily: 'Poppins',
  fontWeight: 400,/* 
  backgroundColor: 'transparent',
  '&.MuiSelect-select:focus':{
   backgroundColor: 'transparent',
  }, */
  '&.MuiInput-underline:before':{
       borderBottom: 0,
       content: 'none',
  },
  '&.MuiInput-underline:after':{
       borderBottom: 0,
       content: 'none',
  },
 
},
testSelect:{
  '&. MuiOutlinedInput':{
    borderColor: 'red',
}

},
testName:{
  paddingLeft: '24px',
  backgroundColor: '#FAFAFA',
  borderBottom: '1px solid #c4c4c4',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
},
testMain:{
  display: 'flex',

},

selectInput2:{
  width : '260px',
  height : '42px',
  fontFamily: 'Poppins',
  borderRadius: '4px',
  border: '2px solid #c4c4c4',
  marginTop: '11px',
  marginBottom: '28px',
  padding: '0 12px',
  color: '#676767',
  fontSize: '13px',
  fontFamily: 'Poppins',
  fontWeight: 400,
  '&.MuiInput-underline:before':{
       borderBottom: 0,
       content: 'none',
  },
  '&.MuiInput-underline:after':{
       borderBottom: 0,
       content: 'none',
  },
 
},
formInput2: {
  width : '260px',
  fontFamily: 'Poppins',
  margin: '4px 48px 28px 0px',
  '& .MuiInputBase-input': { /* input field */
        color: '#676767',
        fontSize: '13px',
        fontFamily: 'Poppins',
        fontWeight: 400,
      },
  '& .MuiInputBase-root': { /* input border */
    borderRadius: '4px',
    border: '1px solid #DDDDDD',
    height : '42px',
    marginTop: '6px',
  },
  '&  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent', /* remove input bordercolor focus */
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#DDDDDD',
  },
  
},
    });     