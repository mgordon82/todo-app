import { Grid } from '@mui/material';
import ListItems from '../Components/ListItems';
import todoTempData from '../Data/initialData.json';
import { useEffect, useState } from 'react';

const ListView = () => {
  const [todoData, setTodoData] = useState([]);
  const local = JSON.parse(localStorage.getItem('todoList'));

  useEffect(() => {
    if (local && local.length > 0) {
      setTodoData(local);
    } else {
      setTodoData([...todoTempData]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoData));
  }, [todoData]);

  console.log('todo data', todoData);

  return (
    <Grid sx={{ padding: '20px 0px' }} container spacing={5}>
      {todoData && (
        <>
          <Grid item xs={12}>
            <ListItems
              title='To-Do Items'
              description='Check each box to mark completed'
              action
              completed={false}
              data={todoData && todoData}
              setData={setTodoData}
            />
          </Grid>
          <Grid item xs={12}>
            <ListItems
              title='Completed Items'
              description='Check each box to mark incomplete'
              data={todoData && todoData}
              completed={true}
              setData={setTodoData}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ListView;
