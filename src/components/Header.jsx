import React,{useState} from 'react';
import Form from './SearchForm';
import PortalMenu from './PortalMenu';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => setShowMenu(true);
  const closePortal = () => setShowMenu(false);

  return (
    <div className="header"> 
      <span className="backBtn" onClick={() => window.history.back()}><i className="fas fa-chevron-left"></i></span>
      {showMenu && <PortalMenu closePortal={closePortal}/>}
      <button className="sandwichBtn" onClick={openMenu}>
        <i className="fas fa-bars"></i><span className="menuSpan">Menu</span>
      </button>
      <div className="headLink"><a href="https://alexthunders.ru/">HOME</a></div>
      <div className="fantomDiv1"/>
      <Form />
      <button className="proBtn">IMDbPro</button>
      <div className="fantomDiv2"/>
      <button className="watchBtn"><i className="far fa-bookmark watchI"></i>Watchlist</button>
      <button className="userBtn"><i className="fas fa-user-circle userCircle"></i><span className="userSpan">User</span><i className="fas fa-caret-down userDd"></i></button>
    </div>
  )
}

