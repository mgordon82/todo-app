import { AppBar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position='static'>
      <Typography variant='h6' component='h1' sx={{ padding: '0 15px' }}>
        To Do Application
      </Typography>
    </AppBar>
  );
};

export default Header;
