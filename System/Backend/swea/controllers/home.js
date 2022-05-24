const { allCountry } = require('./Territory');

const QueryEngine = require('@comunica/query-sparql').QueryEngine;
const myEngine = new QueryEngine();


/*to set a local end point from a ttl file, follow this link: 
    https://comunica.dev/docs/query/getting_started/setup_endpoint/

    Command 1 - require package: npm install -g @comunica/query-sparql-file
    Command 2 - open "End Point Server" - comunica-sparql-file-http Ontology\swea.ttl

    IMPORTANT: the exported file from protege, must be a .ttl
    IMPORTANT: Make sure that the relative or absolute path of the file does not contain spaces...*/


    const countries = [];      
    const sources = [];   
    

//All Country
exports.allCountryAndResources = async (req, res, next) => {
    var end1 = false;
    

    const bindingsStream = await myEngine.queryBindings(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX swea: <http://www.semanticweb.org/abate/ontologies/2022/4/swea#>
        PREFIX dbo: <http://dbpedia.org/ontology/>

        SELECT ?individual ?name
        WHERE { 
            ?individual rdf:type swea:Territory.
            ?individual rdfs:label ?name.
            FILTER ( LANG ( ?name) = 'en' )
        }`, {
        sources: ['http://localhost:3000/sparql', 'https://dbpedia.org/sparql'],
    });

    bindingsStream.on('data', (binding) => {
        var jsonData = {};
        jsonData['name'] = binding.get('name').value;
        jsonData['uri'] = binding.get('individual').value;
        
        countries.push(jsonData);
    });

    bindingsStream.on('end', () => {
        // The data-listener will not be called anymore once we get here.
        end1 = true;
    });

    bindingsStream.on('error', (error) => {
        console.error(error);
    });


    const bindingsStream2 = await myEngine.queryBindings(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX swea: <http://www.semanticweb.org/abate/ontologies/2022/4/swea#>
        PREFIX dbo: <http://dbpedia.org/ontology/>

        SELECT ?individual ?name
        WHERE { 
            ?individual rdf:type swea:Renewable_Energy_Sources.
            ?individual rdfs:label ?name.
            FILTER ( LANG ( ?name) = 'en' )
        }`, {
        sources: ['http://localhost:3000/sparql', 'https://dbpedia.org/sparql'],
    });

    bindingsStream2.on('data', (binding) => {
        var jsonData = {};
        jsonData['name'] = binding.get('name').value;
        jsonData['uri'] = binding.get('individual').value;
        
        sources.push(jsonData);
    });

    bindingsStream2.on('end', () => {
        // The data-listener will not be called anymore once we get here.
        while(!end1);
        return res.json([{countries:  countries}, {sources: sources}]);
    });

    bindingsStream2.on('error', (error) => {
        console.error(error);
    });
}

