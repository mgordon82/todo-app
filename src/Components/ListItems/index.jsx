import {
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ItemDialog from '../ItemDialog';

const ListItems = (props) => {
  const { title, description, action, data, setData, completed, setTrigger } =
    props;

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

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
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(updatedData));
    setTrigger(true);
  };

  const handleOpenDetails = (details) => {
    localStorage.setItem('detailData', JSON.stringify(details));
    navigate('/detail');
  };

  const handleCloseDialog = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpenDialog(false);
      setTrigger(true);
    }
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
        {action && (
          <Grid item>
            <Button onClick={() => setOpenDialog(true)} size='small'>
              Add New
            </Button>
          </Grid>
        )}
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
                    <IconButton
                      sx={{ flexGrow: 0 }}
                      onClick={() => handleChange(item)}
                    >
                      <Checkbox
                        checked={item.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </IconButton>
                    <ListItemButton
                      role={undefined}
                      onClick={() => handleOpenDetails(item)}
                      dense
                    >
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
      <ItemDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleCloseDialog={handleCloseDialog}
        type='add'
      />
    </div>
  );
};

export default ListItems;
