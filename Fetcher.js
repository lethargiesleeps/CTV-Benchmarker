import axios from "axios";

export function hocFetch(intensity) {
    let returnValue = `[ ${new Date(Date.now()).toString()} ][ FETCH IN PROGRESS ]`;
    let results;
    switch (intensity.toLowerCase()) {
        case 'low':
            results = lowIntensity();
            break;
        case 'medium':
            results = medIntensity();
            break;
        case 'high':
            results = highIntensity();
            break;
        case 'xtreme':
            results = extremeIntensity();
            break;
        default:
            results = lowIntensity();
            break;
    }
    return returnValue + `${results} INDIVIDUAL RESULTS FETCHED`;
}


function lowIntensity() {
    return callApi('scott');

}

function medIntensity() {
    return callApi('scott') + callApi('john');
}

function highIntensity() {
    return callApi('scott') + callApi('john') + callApi('michael');
}

function extremeIntensity() {
    return callApi('scott') + callApi('john') + callApi('michael') + callApi('bill');
}

export function callApi(name) {
    let results;
    axios.get(`https://www.ourcommons.ca/Members/en/search/xml?searchText=${name}&parliament=all`)
        .then( response => {
            const xmlString = response.data;
            const parseString = require('react-native-xml2js').parseString;
            parseString(xmlString, function (err, result) {
                const data = JSON.parse(JSON.stringify(result));
                const mps = data['ArrayOfMemberOfParliament']['MemberOfParliament'];
                results = mps.length;

            });
        })
        .catch( error => {
            console.log('ERROR: ' + error );
        })
    return results;

}