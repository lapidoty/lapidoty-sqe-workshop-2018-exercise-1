import $ from 'jquery';
import {parseCode} from './code-analyzer';


var model = {};
function traverse(jsonObj) {
    if(typeof jsonObj !== undefined && jsonObj.type == "Program") 
                Program(jsonObj);
    else
        console.log("Not a json object")
}

function Program(program) {
    program.body.forEach((functionDeclaration) => {
        FunctionDeclaration(functionDeclaration);
            }
        );
}

function FunctionDeclaration(functionDeclaration) {
    let line = functionDeclaration.loc.start.line;
    let type = functionDeclaration.type;
    let name = functionDeclaration.id.name;
    let condition = "";
    let value = "";
    createAttribute(line , type , name , condition , value)

    functionDeclaration.params.forEach((param) => {
            Param(param);
            }
        );
    functionDeclaration.body.body.forEach((statement) => {
            Statement(statement);
            }
        );

}
function Param(param) {
    let line = param.loc.start.line;
    let type = param.type;
    let name = functionDeclaration.id.name;
    let condition = "";
    let value = "";
    createAttribute(line , type , name , condition , value)
}

function Statement(statement) {
    switch(statement.type){
        case "VariableDeclaration": VariableDeclaration(statement) 
            break;
        case "ExpressionStatement": Expression(statement.expression) 
            break;
        case "IfStatement": IfStatement(statement) 
            break;
        case "WhileStatement": WhileStatement(statement) 
            break;
        case "ReturnStatement": ReturnStatement(statement) 
            break;
    }
}

function VariableDeclaration(declaration) {
    declaration.declarations.forEach((declarator) => {
        createAttribute(declarator.loc.start.line , declarator.id.type , declarator.id.name , "" , declarator.init)
        }
    );
}



function IfStatement(statement) {

}

function WhileStatement(statement) {

}

function ReturnStatement(statement) {

}

function Expression (expression) {
    switch(expression.type){
        case "Identifier": Identifier (expression) 
            break;
        case "Literal": Literal (expression) 
            break;
        case "BinaryExpression": BinaryExpression (expression) 
            break;
        case "AssignmentExpression": AssignmentExpression(statement) 
            break;
        default:
            console.log("Expression Error")
    }
}

function AssignmentExpression(expression) {
    let line = expression.loc.start.line;
    let type = expression.type;
    let name = expression.left.name;
    let condition = "";
    let value = expression.right.value;
    createAttribute(line , type , name , condition , value)
}

function createAttribute(line , type , name , condition , value){
    return model.push(new Map ([["Line", line] , ["Type" , type]  , [ "Name" , name] , [ "Condition", condition] , [ "Value" , value]]));
}



function myFunction() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Line";
    cell2.innerHTML = "NEW CELL2";
}

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        traverse(parsedCode)
        myFunction();
        console.log(parsedCode)
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
}

);
