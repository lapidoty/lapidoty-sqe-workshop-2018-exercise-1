import $ from 'jquery';
import { parseCode } from './code-analyzer';
import {traverse} from './code-analyzer';
import {data} from './code-analyzer';
function getCells(data, type) {
    return data.map(cell => `<${type} style="padding: 2px 5px 2px 5px;">${cell}</${type}>`).join('');
}

function createBody(data) {
    return data.map(row => `<tr style="border: 1px solid #dfdfdf;">${getCells(row, 'td')}</tr>`).join('');
}

function createTable() {
    function createTable(data) {
        const [headings, ...rows] = data;
        return `
      <table style="border-collapse: collapse;">
        <thead>${getCells(headings, 'th')}</thead>
        <tbody>${createBody(rows)}</tbody>
      </table>
    `;
    }
    document.body.insertAdjacentHTML('beforeend', createTable(data));
}


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        traverse(parsedCode);
        createTable();
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
}

);
