//Pages
import Home from './pages/Home';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import EmailSent from "./pages/EmailSent"

//styled componetns
import {StyledContainer} from './components/Style';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//auth & redux
import AuthRoute from "./components/AuthRoute";
import BasicRoute from './components/BasicRoute';
import { connect } from 'react-redux';

function App({checked}) {
  return (
    <Router>
      {checked && 
      <StyledContainer>
        <Routes>
          <Route path='/emailsent/:userEmail' element={<EmailSent/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login/:userEmail?' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </StyledContainer>
      }
    </Router>
  );
}
const mapStateToProps = ({session}) => ({
  checked: session.checked,
});

export default connect(mapStateToProps)(App);
