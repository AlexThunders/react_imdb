import React, {useState,useEffect, useRef} from 'react';
import ReactDom from 'react-dom';

const PortalSearch = ({showPortal,inp,searchFromPortal,closePortal}) => {
  const [input, setInput] = useState('');
  const portal = useRef();
  let resize;

  useEffect(() => {
    resize = () => {
      if(showPortal === 'block' && portal !== null) {
        let width = portal.current.getBoundingClientRect().width;
        if(width >= 600) {
          window.removeEventListener('resize',resize);
          closePortal();
        }
        else {
          inp = input;
        }
      }
      window.addEventListener('resize',resize);
    }
  },[]);
  
  const handleSearch = (e) => {
    if(e.keyCode === 13) {
      searchFromPortal(input);
    }
  }
  
  return ReactDom.createPortal(
    <div ref={portal} className="serachPortal" style={{display: `${showPortal}`}}>
      <input 
        autoFocus
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search IMDb"
        onKeyDown={handleSearch}
        />
      <button type="button" onClick={() => {
        closePortal();
        window.removeEventListener('resize',resize);
      }
      }><i className="fas fa-times"></i>
      </button>
    </div>,
    document.getElementById('portalSearch')
      );
}
 
export default PortalSearch;
