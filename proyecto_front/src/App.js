import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/navbar/navbar';
import { BrowserRouter as Router } from 'react-router-dom'

import AppRouter from './components/router/routes';

function App() {
  return (
    <div className="App">
      <Menu/>
      <AppRouter/>
      <Router>
      </Router>
    </div>
  );
}

export default App;
