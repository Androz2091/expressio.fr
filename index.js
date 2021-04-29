const randomUseragent = require('random-useragent');
const fetch = require('node-fetch');
const jsdom = require('jsdom');

module.exports.random = async () => {

    const res = await fetch('https://www.expressio.fr/expression-au-hasard', {
        headers: {
            'User-Agent': randomUseragent.getRandom()
        }
    });
    const text = await res.text();

    const dom = new jsdom.JSDOM(text);

    return {
        expression: dom.window.document.querySelector('#search-expressions').value,
        definition: dom.window.document.querySelectorAll('.subtitle')[1].textContent
    }

};
