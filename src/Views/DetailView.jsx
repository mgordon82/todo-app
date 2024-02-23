import {
  Box,
  Breadcrumbs,
  Card,
  Chip,
  Grid,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../utils/formatDateTime';

const DetailView = () => {
  const navigate = useNavigate();
  const local = JSON.parse(localStorage.getItem('detailData')) || {};
  const [data, setData] = useState({});

  useEffect(() => {
    if (local) {
      setData(local);
    }
  }, []);

  const { summary, description, completed, completedDate, createdDate } = data;
  return (
    <Box sx={{ marginTop: '15px', padding: '10px' }}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          To-Do Dashboard
        </Link>
        <Link underline='none' color='text.primary' aria-current='page'>
          Details
        </Link>
      </Breadcrumbs>
      <Card raised sx={{ marginTop: '15px', padding: '10px' }}>
        <Grid container justifyContent='space-between' spacing={3}>
          <Grid item>Summary: {summary}</Grid>
          <Grid item>
            {completed ? (
              <Tooltip title={`Completed On: ${formatDateTime(completedDate)}`}>
                <Chip color='success' label='Complete' size='small' />
              </Tooltip>
            ) : (
              <Chip color='warning' label='Incomplete' size='small' />
            )}
          </Grid>
          <Grid item xs={12}>
            Description: {description}
          </Grid>
          <Grid item xs={12} textAlign='right'>
            <Typography variant='caption'>
              Created On: {formatDateTime(createdDate)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DetailView;
