import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse , { loc: true });
};

export var data = [];
export function traverse(jsonObj) {
    data.push(['Line', 'Type', 'Name', 'Condition', 'Value']);
    Program(jsonObj);

    return data.join(',');
   

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
    let condition = '';
    let value = '';
    createAttribute(line, type, name, condition, value);

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
    let type = 'VariableDeclaration';
    let name = param.name;
    let condition = '';
    let value = '';
    createAttribute(line, type, name, condition, value);
}

function Statement(statement) {
    switch (statement.type) {
    case 'VariableDeclaration': VariableDeclaration(statement);
        break;
    case 'ExpressionStatement': Expression(statement.expression);
        break;
    case 'ReturnStatement': ReturnStatement(statement);
        break;
    default:
        ConditionStatement(statement);
    }
}

function ConditionStatement(statement) {
    switch (statement.type) {
    case 'IfStatement': IfStatement(statement);
        break;
    case 'WhileStatement': WhileStatement(statement);
        break;
    case 'ForStatement': ForStatement(statement);
        break;
    }
}

function VariableDeclaration(declaration) {
    declaration.declarations.forEach((declarator) => {
        createAttribute(declarator.loc.start.line, 'VariableDeclaration', declarator.id.name, '', declarator.init);
    }
    );
}



function IfStatement(statement) {
    let line = statement.loc.start.line;
    let type = statement.type;
    let name = '';
    let condition = Expression(statement.test);
    let value = '';
    createAttribute(line, type, name, condition, value);
    Statement(statement.consequent);
    if (statement.alternate !== null)
        Statement(statement.alternate);
}

function WhileStatement(whileStatement) {
    let line = whileStatement.loc.start.line;
    let type = whileStatement.type;
    let name = '';
    let condition = Expression(whileStatement.test);
    let value = '';
    createAttribute(line, type, name, condition, value);
    whileStatement.body.body.forEach((statement) => {
        Statement(statement);
    }
    );
}

function ForStatement(forStatement) {
    let line = forStatement.loc.start.line;
    let type = forStatement.type;
    let name = '';
    Expression(forStatement.init);
    let condition = Expression(forStatement.test) + ';' + Expression(forStatement.update.argument) + ' ' + forStatement.update.operator;
    Expression(forStatement.update);
    let value = '';
    createAttribute(line, type, name, condition, value);
    forStatement.body.body.forEach((statement) => {
        Statement(statement);
    }
    );
}

function ReturnStatement(returnStatement) {
    let line = returnStatement.loc.start.line;
    let type = returnStatement.type;
    let name = '';
    let condition = '';
    let value = Expression(returnStatement.argument);
    createAttribute(line, type, name, condition, value);
}

function Expression(expression) {
    switch (expression.type) {
    case 'Identifier': return Identifier(expression);
    case 'Literal': return Literal(expression);
    case 'AssignmentExpression': return AssignmentExpression(expression);
    default:
        return RecurseiveExpression(expression);
    }
}

function RecurseiveExpression(expression) {
    switch (expression.type) {
    case 'BinaryExpression': return BinaryExpression(expression);
    case 'MemberExpression': return MemberExpression(expression);
    case 'UnaryExpression': return UnaryExpression(expression);
    }
}


function Identifier(expression) {
    return expression.name;
}

function Literal(expression) {
    return expression.value;
}

function BinaryExpression(expression) {
    return Expression(expression.left) + ' ' + expression.operator + ' ' + Expression(expression.right);
}


function AssignmentExpression(expression) {
    let line = expression.loc.start.line;
    let type = expression.type;
    let name = Expression(expression.left);
    let condition = '';
    let value = Expression(expression.right);
    createAttribute(line, type, name, condition, value);
}

function MemberExpression(expression) {
    return expression.object.name + '[' + expression.property.name + ']';
}

function UnaryExpression(expression) {
    return expression.operator + expression.argument.value;
}

function createAttribute(line, type, name, condition, value) {
    return data.push([line, type, name, condition, value]);
}
export {parseCode};
