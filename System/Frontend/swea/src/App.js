import * as React from 'react';
import logo from './logo.svg';
import './css/App.css';
import {TerritoryPage} from './view/territorypage';
import {SourcePage} from './view/sourcepage';
import {HomePage} from './view/homepage';

function App() {

  const [pageid, setPageid] = React.useState(0);

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

  var testdata_source = {
    name: "Biomass",
    definition: "Definizione della fonte rinnovabile",
    description: "Fonte molto bella, questa in particolare è massa di specialità BIO. Avete capito bene, proprio BIO!",
    criterias: [
      ["Il sole deve battere forte", "Gesù ci vuole vittoriosi", "Gesù si chiama vittorio"],
      ["Questo è un criterio", "Anche questo è un criterio", "Questo è Carmine"],
      ["Pippo Baudo è capellone"],
      [],
      ["Gesù disse agli apostoli: welcome to Favelas, mangiatene tutti e poi datevi alla pazza gioia sul culo di dio"]
    ],
    placedTerritories: [{name: "Italy", address: "dbpedia:italy"}, {name: "Romania", address: "dbpedia:romania"}]
  }

  var homedata_source = {
    t: [{name: "Italy", address: "dbpedia:italy"}, {name: "Romania", address: "dbpedia:romania"}, {name: "Russia", address: "dbpedia:russia"}],
    s: [{name: "Wind Power", address: "dbpedia:wind_power"}]
  }

  
  var changePage = (page_id, list_index) => {
    // IN SELECTED YOU HAVE THE SELECTED OBJECT
    let selected = null;
    if (page_id == 1) {
      var territories = homedata_source.t;
      selected = territories[list_index];
    } else if (page_id == 2) {
      var sources = homedata_source.s;
      selected = sources[list_index];
    }
    setPageid(page_id);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {
            pageid == 0 ? <HomePage territories={homedata_source.t} sources={homedata_source.s} changePageCallback={changePage}/>
            : pageid == 1 ?
              <TerritoryPage 
                name={testdata_territory.name} 
                definition = {testdata_territory.definition}
                description = {testdata_territory.description} 
                sources = {testdata_territory.placedSources}
                criteria = {testdata_territory.criterias}
                companies = {testdata_territory.placedCompanies}
                changePageCallback={changePage}
              />
            : pageid == 2 ?
              <SourcePage 
                name={testdata_source.name} 
                definition = {testdata_source.definition}
                description = {testdata_source.description} 
                criteria = {testdata_source.criterias}
                territories = {testdata_source.placedTerritories}
                changePageCallback={changePage}
              />
            : <div></div>
          }
        </div>
      </header>
    </div>
  );

}

export default App;
