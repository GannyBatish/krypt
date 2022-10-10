import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
const useStyles=makeStyles(() => ({
  App:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh',
  },
}));
function App() {
  const classes=useStyles();
  return (
      <Router>
        <div className={classes.App}>
          <Header />
          <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/coins/:id' element={<Coinpage/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
