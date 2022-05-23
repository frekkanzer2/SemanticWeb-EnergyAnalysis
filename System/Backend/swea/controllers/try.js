// Parse a SPARQL query to a JSON object
const QueryEngine = require('@comunica/query-sparql').QueryEngine;
const myEngine = new QueryEngine();

exports.test = async (req, res, next) => {
    
    const result = [];

    const bindingsStream = await myEngine.queryBindings(`
        SELECT ?o WHERE {
            <http://dbpedia.org/resource/Alfa_Romeo_1900> <http://www.w3.org/2002/07/owl#sameAs> ?o.
        } LIMIT 3`, {
        sources: ['https://fragments.dbpedia.org/2015/en'],
    });

    bindingsStream.on('data', (binding) => {
        
        // Obtaining values
        result.push(binding.get('o').value);
        
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