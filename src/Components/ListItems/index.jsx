import {
  Card,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

      <Card variant='outlined' sx={{ marginTop: 1, padding: '5px 10px' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <>
                    <IconButton
                      edge='end'
                      sx={{ marginRight: '5px' }}
                      aria-label='edit'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  // onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      //   checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
};

export default ListItems;
