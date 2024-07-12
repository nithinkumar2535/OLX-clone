import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import Home from './Pages/Home';
import ViewPost from './Pages/ViewPost';
import { FirebaseContext,AuthContext} from './store/Context';
import Post from './store/PostContext';
import {onAuthStateChanged} from 'firebase/auth';
import Create from './Components/Create/Create';


function App() {

  const { setUser } = useContext(AuthContext);
  const { firebase, } = useContext(FirebaseContext);
  useEffect(()=>{
    onAuthStateChanged(firebase,(user)=>{
      setUser(user)
    })
  })
  return (
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
