import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

const DetailView = () => {
  const local = JSON.parse(localStorage.getItem('detailData')) || {};
  const [data, setData] = useState({});

  useEffect(() => {
    if (local) {
      setData(local);
    }
  }, []);

  const { summary, description, completed, completedDate, createdDate } = data;
  return (
    <div>
      <h2>Details</h2>
      <p>Summary: {summary}</p>
      <p>Description: {description}</p>
      <p>Complete: {completed ? 'Completed' : 'Incomplete'}</p>
      {completed && <p>Completed On: {completedDate}</p>}
      <p>Created On: {createdDate}</p>
    </div>
  );
};

export default DetailView;
