import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/navbar/navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import AppRouter from './components/router/routes';

function App() {
  return (
    <Container>
      <div className="App">
        <Menu/>
        <AppRouter/>
        <Router>
        </Router>
      </div>
    </Container>
  );
}

export default App;
