import Form from './components/Form'
import './styles/styles.scss';
import Weather from './components/Weather';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import {useState} from 'react';



export default function App() {
  const [currUser, setCurrUser] = useState({
    name: '',
    isLoggedIn: true
  })

  return (

    <Router>
        <Routes>
          <Route path="/volante/dashboard" element={<Dashboard currUser={currUser}/>}>
          </Route>
          <Route path="/volante/" element={<Login setCurrUser={setCurrUser} />}>
          </Route>
        </Routes>
    </Router>
  );
}
