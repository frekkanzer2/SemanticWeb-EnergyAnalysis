const QueryEngine = require('@comunica/query-sparql').QueryEngine;
const myEngine = new QueryEngine();


/*to set a local end point from a ttl file, follow this link: 
    https://comunica.dev/docs/query/getting_started/setup_endpoint/

    Command 1 - require package: npm install -g @comunica/query-sparql-file
    Command 2 - open "End Point Server" - comunica-sparql-file-http Ontology\swea.ttl

    IMPORTANT: the exported file from protege, must be a .ttl
    IMPORTANT: Make sure that the relative or absolute path of the file does not contain spaces...*/

//All Country
exports.allCountry = async (req, res, next) => {
    
    const result = [];

    const bindingsStream = await myEngine.queryBindings(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX swea: <http://www.semanticweb.org/abate/ontologies/2022/4/swea#>
                
        SELECT ?individual 
        WHERE { 
            ?individual rdf:type swea:Territory .
        } LIMIT 100`, {
        sources: ['http://localhost:3000/sparql'],
    });

    bindingsStream.on('data', (binding) => {
        
        // Obtaining values
        result.push(binding.get('individual').value);
        
    });

    bindingsStream.on('end', () => {
        // The data-listener will not be called anymore once we get here.
        console.log("Ended");

        return res.json({
            queryResult : result
        });

    });

    bindingsStream.on('error', (error) => {
        console.error(error);
    });

}

//singleCountryInf
exports.singleCountryInf = async (req, res, next) => {
    
    const countryRes = req.query.res;
    const result = [];
    var jsonData = {};
 

    console.log(`SELECT ?abstract ?population WHERE
    {
       <` + countryRes + `> dbo:abstract ?abstract .
       <` + countryRes + `> dbo:populationTotal ?population.

    FILTER ( LANG ( ?abstract) = 'en' )
    }`);
    const bindingsStream = await myEngine.queryBindings(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    SELECT ?abstract ?population
    WHERE
    {
       <` + countryRes + `> dbo:abstract ?abstract .
       <` + countryRes + `> dbo:populationTotal ?population.

    FILTER ( LANG ( ?abstract) = 'en' )
    }`, {
        sources: ['https://dbpedia.org/sparql'],
    });

    bindingsStream.on('data', (binding) => {
        
        jsonData['abstract'] = binding.get('abstract').value;
        jsonData['population'] = binding.get('population').value;
        
        console.log(jsonData)

        result.push(jsonData);
    });

    bindingsStream.on('end', () => {
        // The data-listener will not be called anymore once we get here.
        console.log("Ended");

        return res.json(jsonData);

    });

    bindingsStream.on('error', (error) => {
        console.error(error);
    });

}