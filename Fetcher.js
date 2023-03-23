import axios from "axios";

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
    callApi('scott');
}

function medIntensity() {
    callApi('scott');
    callApi('john');
}

function highIntensity() {
    callApi('scott');
    callApi('john');
    callApi('michael');
}

function extremeIntensity() {
    callApi('scott');
    callApi('john');
    callApi('michael');
    callApi('bill');
}

export function callApi(name) {
    axios.get(`https://www.ourcommons.ca/Members/en/search/xml?searchText=${name}&parliament=all`)
        .then( response => {
            const xmlString = response.data;
            const parseString = require('react-native-xml2js').parseString;
            parseString(xmlString, function (err, result) {
                const data = JSON.parse(JSON.stringify(result));
                const mps = data['ArrayOfMemberOfParliament']['MemberOfParliament'];
                for(let i = 0; i < mps.length; i++) {
                    console.log('=============================================================')
                    console.log(`[ MP FIRST NAME ]: ${mps[i]['PersonOfficialFirstName']}`)
                    console.log(`[ MP LAST NAME ]: ${mps[i]['PersonOfficialLastName']}`)
                }

            });
        })
        .catch( error => {
            console.log('ERROR: ' + error );
        })

}