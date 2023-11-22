import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home/Home";
import './App.css';
import News from './pages/NewsPage/News';
import NewsDetails from './components/NewsDetails';
import SingUp from './pages/auth/SingUp';
import LogIn from './pages/auth/LogIn';
import Dashboard from './pages/Dashboard/Dashboard';
import ByNewsSite from './components/ByNewsSite';


function App() {
  return (
   <BrowserRouter>
      <NavMenu/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/news/id/:id" element={<NewsDetails/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/bynewssite/:site" element={<ByNewsSite/>}/>
          <Route path='/singup' element={<SingUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
        </Routes>
      <Footer/>
   </BrowserRouter>
  );
}

export default App;
