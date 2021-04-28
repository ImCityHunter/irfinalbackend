

// elastic search will need to start first before this to be started
// https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html
// https://www.elastic.co/guide/en/elasticsearch/reference/7.11/starting-elasticsearch.html
// https://www.compose.com/articles/getting-started-with-elasticsearch-and-node/

// brew tap elastic/tap
// brew install elastic/tap/elasticsearch-full
// cd elasticsearch-7.11.1/bin
// ./elasticsearch
const elasticsearch=require('elasticsearch');
const elasticClient = new elasticsearch.Client( {
    hosts: [
        'http://localhost:9200'
    ]
});

// https://github.com/elastic/elasticsearch-js

// const { Client } = require('@elastic/elasticsearch');
// const elasticClient = new Client({ node: 'http://localhost:9200' })


module.exports = elasticClient;