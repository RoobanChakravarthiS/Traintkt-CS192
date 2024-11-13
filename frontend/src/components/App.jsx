import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Book from "./Book";
import Home from "./Home";
import Signup from "./Signup";
import PassengerInfo from './PassengerInfo';
import Profile from './Profile';
import Checkout from './Checkout';


const  App=()=> {


  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login"  element={<Login />} />
        <Route path="/"  element={<Login />} />
        <Route path="signup" element={<Signup/>}/>
        <Route path="book" element={<Book/>}/>
        <Route path="/passenger-info" element={<PassengerInfo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
