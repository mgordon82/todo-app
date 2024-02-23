import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ListView from './Views/ListView';
import DetailView from './Views/DetailView';
import { Container } from '@mui/material';
import Header from './Components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { DetailProvider } from './Contexts';

function App() {
  return (
    <CssBaseline>
      <DetailProvider>
        <Router>
          <Header />
          <Container maxWidth='lg'>
            <Routes>
              <Route path='/' element={<ListView />} />
              <Route path='/detail' element={<DetailView />} />
            </Routes>
          </Container>
        </Router>
      </DetailProvider>
    </CssBaseline>
  );
}

export default App;
