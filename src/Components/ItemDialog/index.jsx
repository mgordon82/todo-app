import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDetailContext } from '../../Contexts';

const ItemDialog = (props) => {
  const { data, updateData } = useDetailContext();
  const [updatedFormData, setUpdatedFormData] = useState({});
  const { openDialog, setOpenDialog, handleCloseDialog, cachedData, type } =
    props;

  useEffect(() => {
    if (cachedData) {
      setUpdatedFormData({
        id: cachedData.id || null,
        summary: cachedData.summary || '',
        description: cachedData.description || '',
        completed: cachedData.completed || false,
        completedDate: cachedData.completedDate || null,
        createdDate: cachedData.createdDate || null,
      });
    }
  }, [cachedData]);

  const [completed, setCompleted] = useState(updateData.completed || false);
  const [completedDate, setCompletedDate] = useState(
    updateData.completedDate || null
  );

  const handleCompletedChange = (event) => {
    const isCompleted = event.target.value === 'true';
    setCompleted(isCompleted);

    if (isCompleted) {
      const currentDate = new Date().toISOString();
      setCompletedDate(currentDate);
    } else {
      setCompletedDate(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const newItemData = {
      id: uuidv4(),
      summary: formJson.summary,
      description: formJson.description,
      completed: false,
      completedDate: null,
      createdDate: new Date().toISOString(),
    };

    updateData([...data, newItemData]);
    localStorage.setItem('todoList', JSON.stringify([...data, newItemData]));
    setUpdatedFormData({});
    handleCloseDialog();
  };

  const handleEditItem = (event) => {
    const itemIndex = data.findIndex((item) => item.id === cachedData.id);
    const items = [...data];
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const newItemData = {
      id: cachedData.id,
      summary: formJson.summary,
      description: formJson.description,
      completed: completed,
      completedDate: completedDate,
      createdDate: cachedData.createdDate,
    };
    items[itemIndex] = newItemData;
    localStorage.setItem('detailData', JSON.stringify(newItemData));
    localStorage.setItem('todoList', JSON.stringify(items));
    handleCloseDialog();
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={openDialog}
      onClose={handleCloseDialog}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          if (type === 'add') {
            handleAddItem(event);
          } else {
            handleEditItem(event);
          }
        },
      }}
    >
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        {type} To-Do Item
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${type} a to-do item, enter the required fields below and hit the
          ${type} To-Do button.`}
        </DialogContentText>
        <TextField
          autoFocus
          required
          value={updatedFormData.summary}
          onChange={(e) => handleChange(e, 'summary')}
          margin='dense'
          id='summary'
          name='summary'
          label='Summary/Title'
          type='text'
          fullWidth
          variant='outlined'
        />
        <TextField
          required
          margin='dense'
          multiline
          id='description'
          name='description'
          label='Description'
          value={updatedFormData.description}
          onChange={(e) => handleChange(e, 'description')}
          type='text'
          rows={4}
          fullWidth
          variant='outlined'
        />
      </DialogContent>
      <DialogActions sx={{ padding: '10px 25px' }}>
        <Grid
          container
          justifyContent={type !== 'edit' ? 'flex-end' : 'space-between'}
          alignItems='start'
        >
          {type === 'edit' && (
            <Grid item>
              <Select
                labelId='completed-select-label'
                value={completed.toString()}
                onChange={handleCompletedChange}
                size='small'
              >
                <MenuItem value='false'>Incomplete</MenuItem>
                <MenuItem value='true'>Completed</MenuItem>
              </Select>
            </Grid>
          )}
          <Grid item>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant='contained' type='submit'>
              {type} To-Do
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;
