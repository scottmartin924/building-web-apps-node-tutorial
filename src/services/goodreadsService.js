const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const url = 'https://www.goodreads.com/book/isbn/0441172717?key=4IXZtTZWZ0BPwPPkOg';
const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  // Node converts promises to things that use await...so can return a promise here
  function getBookById() {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
    });
  }

  return {
    getBookById
  };
}

module.exports = goodreadsService();
