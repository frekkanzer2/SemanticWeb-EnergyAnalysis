import logo from './logo.svg';
import './css/App.css';
import {Tester} from './view/homepage.js';
import {TerritoryPage} from './view/territorypage';

function App() {

  var testdata = {
    name: "Here goes the territory name",
    description: "AUIBDAUWI B UIAB DUIA BDUIWAB DIAW NDUIBA IFBWAIUO DBAWUI DBWAUI BDWAUI BDWAUI DNWAIO DBWAUID BAWIO FNBUI AWU BIUO ANW DIOWABFUWA NIOAW"
  }

  return (
    <div className="App">
      <header className="App-header">
        <TerritoryPage name={testdata.name} description = {testdata.description}/>
      </header>
    </div>
  );
}

export default App;
