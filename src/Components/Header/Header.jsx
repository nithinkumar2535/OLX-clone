import React,{useContext} from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import {signOut} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';




function Header() {
  const {user} = useContext(AuthContext);
  const {firebase,} = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleLogout = ()=>{
    signOut(firebase)
    .then(()=>{
      navigate('/')
    })
  }


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          
           
              {user ? (
                <div className="dropdown">
                  <div
                    className="mt-2 d-block link-body-emphasis  dropdown-toggle text-dark"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user-secret text-dark fs-3"></i>
                  </div>
                  <ul
                    className="dropdown-menu text-small bg-light"
                    style={{}}
                  >
                    <li>
                      <p className="dropdown-item ">
                        {user.displayName}
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" href="/grrui">
                        Profile settings
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item logoutbtn"
                      onClick={handleLogout}>
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              ) : (
               <Link to={"/login"} className='text-dark h6'>Login</Link>
              )}
            
          <hr />
        </div>
        <Link to={user ? "/create" : "/login"}>
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
