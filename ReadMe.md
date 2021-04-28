


# Instruction

1. start elastic search <br/>
`brew tap elastic/tap` <br/>
`brew install elastic/tap/elasticsearch-full` <br/>
`cd elasticsearch-7.11.1/bin` <br/>
`./elasticsearch` <br/>

2. start mongod
- Create a 'Data' folder on desktop <br />

- Due to Mac Catalina security issue, it is possible `mongod` will not start the db <br/>

- hence type: `sudo mongod --dbpath=/System/Volumes/Data/data/db` <br />


3. start node <br />
`node index.js`