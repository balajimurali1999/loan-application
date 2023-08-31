import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import ViewLoan from './components/ViewLoan';

function App() {
  return (
    <div className="App">
      <Link to='/applyLoan'>form</Link>
      <Routes>
        <Route path='/applyLoan' element={<LoanForm userData={{}}></LoanForm>}></Route>
        <Route path='loans' element={<LoanList></LoanList>}></Route>
        <Route path='loan/:id' element={<ViewLoan></ViewLoan>}></Route>
      </Routes>
    </div>
  );
}

export default App;
