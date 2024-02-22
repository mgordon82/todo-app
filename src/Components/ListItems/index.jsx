import { Card, Grid } from '@mui/material';
const ListItems = (props) => {
  const { title, action } = props;
  return (
    <div>
      <Grid container justifyContent='space-between'>
        <Grid item>
          <h3
            style={{
              margin: 0,
              fontSize: '1em',
              textTransform: 'uppercase',
            }}
          >
            {title || ''}
          </h3>
        </Grid>
        {action && <Grid item>Add New</Grid>}
      </Grid>

      <Card variant='outlined' sx={{ marginTop: 1, padding: 2 }}>
        Some stuff goes here
      </Card>
    </div>
  );
};

export default ListItems;
