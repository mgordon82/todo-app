import { Grid } from '@mui/material';
import ListItems from '../Components/ListItems';
import { useEffect, useState } from 'react';
import { useDetailContext } from '../Contexts';

const ListView = () => {
  const { data, updateData } = useDetailContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (trigger) {
      const fetchData = async () => {
        try {
          const cachedData = localStorage.getItem('todoList');
          if (cachedData) {
            updateData(JSON.parse(localStorage.getItem('todoList')));
            setIsLoading(false);
          } else {
            const response = await fetch('/initialData.json');
            if (!response.ok) {
              throw new Error('Problems fetching data');
            }
            const jsonData = await response.json();
            updateData(jsonData);
            localStorage.setItem('todoList', JSON.stringify(jsonData));
            setIsLoading(false);
          }
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };
      fetchData();

      setTrigger(false);
    }
  }, [trigger]);

  return !isLoading ? (
    !error ? (
      <Grid sx={{ padding: '20px 0px' }} container spacing={5}>
        <Grid item xs={12}>
          <ListItems
            title='To-Do Items'
            description='Check each box to mark completed'
            action
            completed={false}
            data={data}
            setData={updateData}
            setTrigger={setTrigger}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItems
            title='Completed Items'
            description='Check each box to mark incomplete'
            data={data}
            completed={true}
            setData={updateData}
            setTrigger={setTrigger}
          />
        </Grid>
      </Grid>
    ) : (
      <div>There was an issue: {error}</div>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default ListView;
