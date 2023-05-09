import './App.css';
import DBProj from './DBProj'
import Get from './Get'
import GetAreas from './GetAreas'
import GetSellers from './Getsellers';
import SellerSearch from './SellerSearch';
import Topcars from './topcars';

function App() {
  return (
    <div>
      <div style={{margin : '10px 30px'}}>
        <DBProj />
        <div className="line"></div>
        <Get />
        <div className="line"></div>
        <GetAreas />
        <div className="line"></div>
        <GetSellers />
        <div className="line"></div>
        <SellerSearch />
        <div className="line"></div>
        <Topcars />
        <div className="line"></div>
      </div>
      
    </div>
  );
}

export default App;