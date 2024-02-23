import {
  Box,
  Breadcrumbs,
  Card,
  Chip,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../utils/formatDateTime';
import EditIcon from '@mui/icons-material/Edit';
import ItemDialog from '../Components/ItemDialog';

const DetailView = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const [cachedDetailData, setCachedDetailData] = useState({
    id: null,
    summary: '',
    description: '',
    createdDate: null,
    completedDate: null,
  });

  useEffect(() => {
    if (!openDialog) {
      setCachedDetailData(JSON.parse(localStorage.getItem('detailData')) || {});
    }
  }, [openDialog]);

  const { summary, description, completed, completedDate, createdDate } =
    cachedDetailData;

  const handleCloseDialog = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpenDialog(false);
    }
  };
  return cachedDetailData !== null ? (
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
            <IconButton
              size='small'
              onClick={() => setOpenDialog(true)}
              sx={{ marginLeft: '5px' }}
            >
              <EditIcon />
            </IconButton>
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
      <ItemDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleCloseDialog={handleCloseDialog}
        cachedData={cachedDetailData}
        type='edit'
      />
    </Box>
  ) : (
    <div>No data available</div>
  );
};

export default DetailView;
