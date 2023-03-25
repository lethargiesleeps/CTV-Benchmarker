import axios from "axios";
import {parseString} from "react-native-xml2js";
let counter = 0;
export function hocFetch(intensity) {
    counter = 0;
    let returnValue = `[ ${new Date(Date.now()).toString()} ][ FETCH IN PROGRESS ]`;
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

    return returnValue + `[ FETCH SUCCESSFUL ] ${counter} RESULTS RETRIEVED`;
}


function lowIntensity() {
    callApi('https://www.ourcommons.ca/members/en/scott-aitchison(105340)/xml', 'mp');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-212/xml', 'bill');

}

function medIntensity() {
    callApi('https://www.ourcommons.ca/members/en/scott-aitchison(105340)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/john-aldag(89258)/xml', 'mp');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-212/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-220/xml', 'bill');
}

function highIntensity() {
    callApi('https://www.ourcommons.ca/members/en/scott-aitchison(105340)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/john-aldag(89258)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/gary-anandasangaree(89449)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/tony-baldinelli(30330)/xml','mp')
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-212/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-220/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-225/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-232/xml', 'bill');
}

function extremeIntensity() {
    callApi('https://www.ourcommons.ca/members/en/scott-aitchison(105340)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/john-aldag(89258)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/gary-anandasangaree(89449)/xml', 'mp');
    callApi('https://www.ourcommons.ca/members/en/tony-baldinelli(30330)/xml','mp');
    callApi('https://www.ourcommons.ca/members/en/mario-beaulieu(376)/xml','mp');
    callApi('https://www.ourcommons.ca/members/en/james-bezan(25475)/xml','mp');
    callApi('https://www.ourcommons.ca/members/en/alexandre-boulerice(58775)/xml','mp');
    callApi('https://www.ourcommons.ca/members/en/richard-cannings(89327)/xml','mp');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-212/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-220/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-225/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-232/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/s-253/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/c-2/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/c-5/xml', 'bill');
    callApi('https://www.parl.ca/legisinfo/en/bill/44-1/c-6/xml', 'bill');
}

export function callApi(url, billOrMp) {

    switch(billOrMp) {
        case 'mp':
            axios.get(url)
                .then( response => {
                    const xmlString = response.data;
                    const parseString = require('react-native-xml2js').parseString;
                    parseString(xmlString, function (err, result) {
                        const data = JSON.parse(JSON.stringify(result));
                        const mp = data['Profile']['MemberOfParliamentRole'][0];

                        console.log(`[MP FIRST NAME] ${mp['PersonOfficialFirstName'][0]}`);
                        console.log(`[MP LAST NAME] ${mp['PersonOfficialLastName'][0]}`);
                    });

                })
                .catch( error => {
                    console.log('ERROR: ' + error );
                });
            counter++;
            break;
        case 'bill':
            axios.get(url)
                .then( response => {
                    const xmlString = response.data;
                    const parseString = require('react-native-xml2js').parseString;
                    parseString(xmlString, function (err, result) {
                        const data = JSON.parse(JSON.stringify(result));
                        const bill = data['Bills']['Bill'][0];
                        console.log(`[BILL ID] ${bill['Id']}`);
                        console.log(`[BILL CODE] ${bill['NumberCode']}`);
                    })
                })
                .catch( error => {
                    console.log('ERROR: ' + error);
                });
            counter++;
            break;
        default:
            console.log('[ ERROR ] INVALID PARAMETER (billOrMp). Must be either "bill" or "mp".');
    }



}