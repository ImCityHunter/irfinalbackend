const fs = require('fs');
const path = require('path');
const measurement_path = path.join(__dirname, '../stopwords/measurement.txt');


const Global_Variables = require('../Variables/Global_Variables');


function readMeasurementWords(){
    console.log("Read All Measurement Words")
    try {
        // read contents of the file
        const data = fs.readFileSync(measurement_path, 'UTF-8');

        // split the contents by new line
        const lines = data.split(/\r?\n/);

        // print all lines
        lines.forEach((line) => {
            Global_Variables.measurementWords.push(line);
        });
    } catch (err) {
        console.error(err);
    }
    console.log("Final number of measurement words: "+Global_Variables.measurementWords.length);
}

module.exports =  {
    readMeasurementWords
}