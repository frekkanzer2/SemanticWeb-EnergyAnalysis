import logo from './logo.svg';
import './css/App.css';
import {Tester} from './view/homepage.js';
import {TerritoryPage} from './view/territorypage';
import {SourcePage} from './view/sourcepage';

function App() {

  var testdata_territory = {
    name: "Campania",
    definition: "Definizione del territorio",
    description: "Territorio montuoso, spesso ci girano le capre e le giraffe",
    placedSources: [{name: "Biomass", address: "dbpedia:biomass"}, {name: "Wind Power", address: "dbpedia:wind_power"}],
    criterias: [
      ["Il sole deve battere forte", "Gesù ci vuole vittoriosi", "Gesù si chiama vittorio"],
      ["Questo è un criterio", "Anche questo è un criterio", "Questo è Carmine"],
      ["Pippo Baudo è capellone"],
      [],
      ["Gesù disse agli apostoli: welcome to Favelas, mangiatene tutti e poi datevi alla pazza gioia sul culo di dio"]
    ],
    placedCompanies: [{name: "Ikea", address: "dbpedia:ikea"}, {name: "Sauttificio", address: "dbpedia:sauttificio"}]
  }

  return (
    <div className="App">
      <header className="App-header">
        <TerritoryPage 
          name={testdata_territory.name} 
          definition = {testdata_territory.definition}
          description = {testdata_territory.description} 
          sources = {testdata_territory.placedSources}
          criteria = {testdata_territory.criterias}
          companies = {testdata_territory.placedCompanies}
        />
      </header>
    </div>
  );
}

export default App;
