import { useState, useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setTab } from "../redux/actions";
import logo from '../images/logo.svg';
import whiteLogo from '../images/whitelogo.svg';
import '../newApp.css';
// import DarkModeButton from "../components/darkmodebutton";

function NavBar() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;
  const { user, authToken, userLogout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isDropdownOpen, setDorpdownOpen] = useState(false);

  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();
  const tab = useSelector(state => state.tab.tab);

  const toggleDropdown = () => {
    setDorpdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`${BASE_URL}/api/profile/${user.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      const data = await response.json();
      setProfile(data);
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);


  const handleDropdown = () => {
    setActive(!isActive);
  }

  const handleSelect = (key) => {
    dispatch(setTab(key));
    setActive(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Add or remove 'scroll-down' class based on scroll position
      if (currentScroll > 0 || (tab != 0 && tab != 5)) {
        document.body.classList.add('scroll-down');
      } else if (tab == 0 || tab == 5) {
        document.body.classList.remove('scroll-down');
      }

      // Show or hide the 'go-top' element based on scroll position
      const goTop = document.querySelector('.go-top');
      if (currentScroll >= 620) {
        goTop.style.display = 'flex';
      } else {
        goTop.style.display = 'none';
      }
    };
    handleScroll();

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tab]);

  const menuOpt = [
    { name: "Home" },
    { name: "Transcriptor" },
    { name: "Translator" },
    { name: "Scan" },
    { name: "Lookup" },
    { name: "Blog" },
    { name: "Contact" },
  ]

  const populateMenu = () => {
    return menuOpt.map((option, key) => (
      <li key={key}><Link className={`header-link ${tab === key ? "active" : ""}`} key={key} alt="dropdown language item" value={option.name} onClick={handleSelect} to={`/${option.name.toLowerCase()}`}>{option.name}</Link>
      </li>
    ));
  }

  useEffect(() => {
    menuOpt.forEach((item, index) => {
      if ("/" + item.name.toLowerCase() === currentTab) {
        // console.log(item, index);
        dispatch(setTab(index));
      }
    })
  }, [tab]);

  return (
    <>
      <a href="#" className="go-top" aria-label="Go back to top"><i className="fa-solid fa-chevron-up"></i></a>
      <nav className={isActive ? "nav__active" : ""}>
        <Link className="nav__logo" alt="dotwise logo" value="Home" onClick={handleSelect} to={`/home`}>
          <img src={whiteLogo} height="60px" alt="Logo | Appvilla" className="nav__logo-white" />
          <img src={logo} height="60px" alt="Logo | Appvilla" className="nav__logo-orange" />
        </Link>
        <ul className="nav__links">
          {populateMenu()}
        </ul>
        <div className="nav__menu" onClick={handleDropdown}>
          <div className="hamburger"></div>
        </div>
        {user ? <div className={isDropdownOpen ? "nav__profile-dropdown open" : "nav__profile-dropdown"}>
          <div className="nav__profile" onClick={toggleDropdown}>
            <img src={BASE_URL + profile?.photo} alt="Profile Picture" className="nav__profile-pic" />
            <span className="nav__profile-name">{profile?.username}</span>
          </div>
          <ul className="nav__profile-options">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to='/' onClick={() => { userLogout(); toggleDropdown(); }} >Logout</Link></li>
          </ul>
        </div> : < Link className="nav__cta" alt="get started button" to={`/signup`}>
          Sign up
        </Link>}
        {/* {user ? <Link className="nav__cta" alt="get started button" onClick={userLogout} to={`/`}>Logout</Link> : */}
        {/*   < Link className="nav__cta" alt="get started button" to={`/signup`}> */}
        {/*     Sign up */}
        {/*   </Link> */}
        {/* <a href="#" className="nav__cta">Get Started</a> */}
      </nav >
      <Outlet />
    </>
  );
}

export default NavBar;
