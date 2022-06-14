const API_KEY =
  '27924155dd9a9f5f262ff465927ba4216b4fae875f20a9efce26acd219935352';
const USER_NAME = 'nandini.d';
const csvtojson = require('csvtojson');
const axios = require('axios');
const csvURI = 'C://Users/Admin/Downloads/data.csv';
let resultArray;
let no_entries = 1;
csvtojson()
  .fromFile(csvURI)
  .then((json) => shorten(json));

function shorten(json) {
  resultArray = json.map((element) => {
    return { title: element.title, raw: element.details, category: 6 };
  });
  resultArray = resultArray.slice(0, no_entries);
  post_topics_discourse();
}

function post_topics_discourse() {
  if (resultArray.length === no_entries) {
    resultArray.forEach((element) => {
      post_info('https://kissflow.trydiscourse.com/posts.json', element);
    });
  }
}

function post_info(uri = '', dat = {}) {
  axios
    .post(uri, JSON.stringify(dat), {
      headers: {
        'Api-Key': API_KEY,
        'Api-Username': USER_NAME,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => console.log('import success!'))
    .catch((err) => console.log(err));
}
