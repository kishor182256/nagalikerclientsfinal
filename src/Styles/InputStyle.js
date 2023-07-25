import { makeStyles   } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  
  myDiv: {
  height: 700,
  backgroundImage: `url(/images/VectorBody.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  marginBottom: 100,
  
  },

  myDiv1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#B82C3A",
    height: 72,
  },
  myDiv2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   /*  paddingTop: 80, */
    /* marginX: '132px', */
  },
  myDiv3: {
    marginTop: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    width: 480,
    height: 430,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
/*     backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)', // for Safari */
  },

  textLogo: {
    fontSize: '40px', 
    fontWeight: 'semibold', 
    color: 'white',
    fontFamily: 'Poppins',
  },

  maintext1:{
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  }, 
  subtext1:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#B82C3A',
    fontFamily: 'Poppins',
  }, 
  subtitle1: {
    fontSize: 16,
    color: '#696969',
    fontFamily: 'Poppins',
  },
  maintext2:{
    fontSize: 28,
    fontFamily: 'Poppins',
    marginTop: '0px',
    marginBottom: '0px',
  },
  subtitle2: {
    fontSize: 12,
    color: '#696969',
    fontFamily: 'Poppins',
    marginTop: '6px',
  },
  caption: {
    fontSize: 12,
    color: '#B82C3A',
    fontFamily: 'Poppins',
  },

  customInput: {
    width : '362px',
    fontFamily: 'Poppins',
    marginTop: '10px',
    '& .MuiInputBase-input': { /* input field */
          color: '#676767',
          fontSize: '17px',
          fontFamily: 'Poppins',
          fontWeight: 900,
        },
    '& .MuiInputBase-root': { /* input border */
      borderRadius: '14px',
      border: '1px solid #DDDDDD',
      height : '53px',
      marginTop: '6px',
    },
    '&  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent', /* remove input bordercolor focus */
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DDDDDD',
    },
    
  },

  customButton: {
    backgroundColor: '#B82C3A',
    color: 'white',
    borderRadius: '14px',
    height : '53px',
    width : '112px',
    fontFamily: 'Poppins',
    '&:hover': {
        backgroundColor: '#B82C3A',
    },
  },
    
});
