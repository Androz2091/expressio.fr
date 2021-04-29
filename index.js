const randomUseragent = require('random-useragent');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { writeFileSync } = require('fs');

module.exports.random = async () => {

    const res = await fetch('https://www.expressio.fr/expression-au-hasard', {
        headers: {
            'User-Agent': randomUseragent.getRandom()
        }
    });
    const text = await res.text();

    const dom = new jsdom.JSDOM(text);

    return {
        content: dom.window.document.querySelector('#search-expressions').value,
        def: dom.window.document.querySelectorAll('.subtitle')[1].textContent
    }

};