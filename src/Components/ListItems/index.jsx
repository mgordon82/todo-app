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
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
const ListItems = (props) => {
  const { title, description, action, data, setData, completed } = props;
  const filteredData = data.filter((item) => item.completed === completed);
  const handleChange = (itemData) => {
    const newData = data.map((item) =>
      item.id === itemData.id
        ? {
            ...item,
            completed: !item.completed,
            completedDate: !item.completed ? new Date().toISOString() : null,
          }
        : item
    );
    setData(newData);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
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
        {filteredData.length > 0 ? (
          <>
            {description && (
              <Grid container alignItems='center'>
                <InfoIcon color='info' fontSize='small' />
                <Typography pl={'10px'} lineHeight='1em' variant='caption'>
                  {description}
                </Typography>
              </Grid>
            )}

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {filteredData.map((item, key) => {
                const labelId = `checkbox-list-label-${key}`;

                return (
                  <ListItem
                    key={key}
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon color='error' />
                      </IconButton>
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
                          checked={item.completed}
                          onChange={() => handleChange(item)}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={item.summary}
                        secondary={item.description}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </>
        ) : (
          'No items to show'
        )}
      </Card>
    </div>
  );
};

export default ListItems;
