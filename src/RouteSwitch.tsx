import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import SignUp from './Views/SignUp';
import SignedOut from './Views/SignedOut';
import Login from './Views/Login';


const RouteSwitch: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<SignedOut />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='sign-up' element={<SignUp />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;