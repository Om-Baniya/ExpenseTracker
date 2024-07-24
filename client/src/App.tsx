import './App.css'
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { FinancialRecordsProvider } from './contexts/financial-record-contexts';
import { SignedIn,UserButton } from '@clerk/clerk-react';
//import {dark} from "@clerk/themes";
function App() {
  return (
    <Router> 
      <div className='app-container'>
        <div className='navbar'>
          <Link to="/"></Link>
          <SignedIn>
            <UserButton showName />
        </SignedIn>
        </div>
        <Routes>
          <Route path='/' element={<FinancialRecordsProvider><Dashboard /></FinancialRecordsProvider>}/>
          <Route path='/auth' element={<Auth />}/>
        </Routes>
      </div>
     
    </Router>
  );
}

export default App
