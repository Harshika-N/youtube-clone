import React, { useEffect, useState } from 'react'
import './Navbar.css'


import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({setSidebar}) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchText(params.get('search') || '');
  }, [location.search]);

  const handleSearch = () => {
    const query = searchText.trim();
    if (!query) {
      navigate('/');
      return;
    }
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={()=>setSidebar(prev=>prev===false?true:false)} src={menu_icon} alt="Menu Icon" />
           <Link to='/'><img className='logo' src={logo} alt="Logo" />
        </Link> 
        </div>
        <div className='nav-middle flex-div'>

          <div className='search-box flex-div'>
            <input
              type="text"
              placeholder='Search'
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)}
              onKeyDown={(e)=>e.key === 'Enter' && handleSearch()}
            />
            <img src={search_icon} alt="Search Icon" onClick={handleSearch} />

          </div>
            
        </div>
        <div className='nav-right flex-div'>
            <img src={upload_icon} alt="Upload Icon" />
            <img src={more_icon} alt="More Icon" />
            <img src={notification_icon} alt="Notification Icon" />
            <img className='user-icon' src={profile_icon} alt="Profile Icon" />

        </div>
    </nav>
  )
}

export default Navbar
