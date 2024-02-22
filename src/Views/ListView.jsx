import { Grid } from '@mui/material';
import ListItems from '../Components/ListItems';

const ListView = () => {
  return (
    <Grid sx={{ padding: '20px 0px' }} container spacing={5}>
      <Grid item xs={12}>
        <ListItems title='To-Do Items' action />
      </Grid>
      <Grid item xs={12}>
        <ListItems title='Completed Items' />
      </Grid>
    </Grid>
  );
};

export default ListView;
