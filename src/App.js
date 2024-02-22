import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ListView from './Views/ListView';
import DetailView from './Views/DetailView';
import { Container } from '@mui/material';
import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<ListView />} />
          <Route path='/detail' element={<DetailView />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
