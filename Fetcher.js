import axios from "axios";
import parseString from 'react-native-xml2js';

export function hocFetch(intensity) {
    switch (intensity.toLowerCase()) {
        case 'low':
            lowIntensity();
            break;
        case 'medium':
            medIntensity();
            break;
        case 'high':
            highIntensity();
            break;
        case 'xtreme':
            extremeIntensity();
            break;
        default:
            lowIntensity();
            break;
    }
}





function lowIntensity() {

}

function medIntensity() {

}

function highIntensity() {

}

function extremeIntensity() {

}

export function callApi() {
    axios.get('https://www.ourcommons.ca/Members/en/search/xml?searchText=scott&parliament=all')
        .then( response => {
            const xmlString = response.data;
            const parseString = require('react-native-xml2js').parseString;
            parseString(xmlString, function (err, result) {
                const data = JSON.parse(JSON.stringify(result));
                const values = data.ArrayOfMemberOfParliament;

            });
        })
        .catch( error => {
            console.log('ERROR3: ' + error );
        })

}