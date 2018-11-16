import $ from 'jquery';
import {parseCode} from './code-analyzer';


var data = [];
function traverse(jsonObj) {
    data.push(['Line', 'Type', 'Name', 'Condition' , 'Value'])
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
    let type = "VariableDeclaration";
    let name = param.name;
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
        case "ForStatement": ForStatement (statement) 
            break;
    }
}

function VariableDeclaration(declaration) {
    declaration.declarations.forEach((declarator) => {
        createAttribute(declarator.loc.start.line , "VariableDeclaration" , declarator.id.name , "" , declarator.init)
        }
    );
}



function IfStatement(statement) {
    let line = statement.loc.start.line;
    let type = statement.type;
    let name = "";
    let condition = Expression(statement.test);
    let value = "";
    createAttribute(line , type , name , condition , value)
    Statement(statement.consequent);
    if(statement.alternate!== undefined || statement.alternate!== null)
        Statement(statement.alternate);
}

function WhileStatement(whileStatement) {
    let line = whileStatement.loc.start.line;
    let type = whileStatement.type;
    let name = "";
    let condition = Expression(whileStatement.test);
    let value = "";
    createAttribute(line , type , name , condition , value)
    whileStatement.body.body.forEach((statement) => {
        Statement(statement);
        }
    );
}

function ForStatement(whileStatement) {
    let line = whileStatement.loc.start.line;
    let type = whileStatement.type;
    let name = "";
    Expression(whileStatement.init)
    let condition =  Expression(whileStatement.test) + ";" + Expression(whileStatement.update.argument) + " " + whileStatement.update.operator;
    Expression(whileStatement.update)
    let value = "";
    createAttribute(line , type , name , condition , value)
    whileStatement.body.body.forEach((statement) => {
        Statement(statement);
        }
    );
}

function ReturnStatement(returnStatement) {
    let line = returnStatement.loc.start.line;
    let type = returnStatement.type;
    let name = "";
    let condition = "";
    let value = Expression(returnStatement.argument);
    createAttribute(line , type , name , condition , value)
}

function Expression (expression) {
    switch(expression.type){
        case "Identifier": return Identifier (expression) 
        case "Literal": return Literal (expression) 
        case "BinaryExpression": return BinaryExpression (expression) 
        case "AssignmentExpression": return AssignmentExpression (expression) 
        case "MemberExpression": return MemberExpression (expression) 
        case "UnaryExpression": return UnaryExpression (expression) 
        case "UpdateExpression": return UpdateExpression  (expression) 
        default:
            console.log("Expression Error")
    }
}


function Identifier(expression) {
  return expression.name;
}

function Literal(expression) {
    return expression.value;
}

function BinaryExpression(expression) {
    return Expression(expression.left) + " " + expression.operator + " " + Expression(expression.right)
}

function UpdateExpression (expression) {
    return 
}

function AssignmentExpression(expression) {
    let line = expression.loc.start.line;
    let type = expression.type;
    let name = Expression(expression.left);
    let condition = "";
    let value = Expression(expression.right);
    createAttribute(line , type , name , condition , value)
}

function MemberExpression(expression) {
    return expression.object.name + "["+  expression.property.name + "]" ;
  }

function UnaryExpression (expression) {
    return expression.operator + expression.argument.value;
  }

function createAttribute(line , type , name , condition , value){
    return data.push([line , type , name , condition , value]);
}


function createTable(){
  
  function getCells(data, type) {
    return data.map(cell => `<${type} style="padding: 2px 5px 2px 5px;">${cell}</${type}>`).join('');
  }
  
  function createBody(data) {
    return data.map(row => `<tr style="border: 1px solid #dfdfdf;">${getCells(row, 'td')}</tr>`).join('');
  }
  
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
        console.log(parsedCode)
        traverse(parsedCode)
        createTable();
        console.log(data)
        
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
}

);
