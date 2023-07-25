import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      `,
    },
  },
});
