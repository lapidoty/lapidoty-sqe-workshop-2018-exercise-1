import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {traverse} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('Declaration_TEST1', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function Declaration_TEST1(X, V, n){
                let low, high, mid;
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1\"'
        );
    });

    it('AssignmentExpression_TEST2', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function AssignmentExpression_TEST2(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1\"'
        );
    });

    it('WhileStatement_TEST3', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function WhileStatement_TEST3(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                while (low <= high) {
                }
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1\"'
        );
    });

    it('ForStatement_TEST4', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function ForStatement_TEST4(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                for (i=0; low <= high ;i++) {
                    high = n - 1;
                }
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1\"'
        );
    });

    it('IfStatement_TEST5', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function IfStatement_TEST5(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                while (low <= high) {
                    mid = (low + high)/2;
                    if (X < V[mid])
                        high = mid - 1;
                    else if (X > V[mid])
                        low = mid + 1;
                    else
                        return mid;
                }
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST5,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,6,AssignmentExpression,mid,,low + high / 2,7,IfStatement,,X < V[mid],,8,AssignmentExpression,high,,mid - 1,9,IfStatement,,X > V[mid],,10,AssignmentExpression,low,,mid + 1,12,ReturnStatement,,,mid,14,ReturnStatement,,,-1\"'
        );
    });

    it('IfStatement_TEST6', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function IfStatement_TEST6(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                if (low < 5)
                    high = mid - 1;
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST5,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,6,AssignmentExpression,mid,,low + high / 2,7,IfStatement,,X < V[mid],,8,AssignmentExpression,high,,mid - 1,9,IfStatement,,X > V[mid],,10,AssignmentExpression,low,,mid + 1,12,ReturnStatement,,,mid,14,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST6,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,IfStatement,,low < 5,,6,AssignmentExpression,high,,mid - 1,7,ReturnStatement,,,-1\"'
        );
    });

    it('IfStatement_TEST7', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function General_TEST7(X, V, n){
                let low, high, mid;
                low = 0;
                high = n - 1;
                return -1;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST5,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,6,AssignmentExpression,mid,,low + high / 2,7,IfStatement,,X < V[mid],,8,AssignmentExpression,high,,mid - 1,9,IfStatement,,X > V[mid],,10,AssignmentExpression,low,,mid + 1,12,ReturnStatement,,,mid,14,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST6,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,IfStatement,,low < 5,,6,AssignmentExpression,high,,mid - 1,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST7,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1\"'
        );
    });

    it('IfStatement_TEST8', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function General_TEST8(X, V, n){
                return 5+6;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST5,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,6,AssignmentExpression,mid,,low + high / 2,7,IfStatement,,X < V[mid],,8,AssignmentExpression,high,,mid - 1,9,IfStatement,,X > V[mid],,10,AssignmentExpression,low,,mid + 1,12,ReturnStatement,,,mid,14,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST6,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,IfStatement,,low < 5,,6,AssignmentExpression,high,,mid - 1,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST7,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST8,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,ReturnStatement,,,5 + 6\"'
        );
    });

    it('IfStatement_TEST9', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function General_TEST9(X, V, n){
                let low, high, mid;
                low = 8;
                high = 9;
                if(8 < 9)
                return true;
                else
                return false;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST5,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,6,AssignmentExpression,mid,,low + high / 2,7,IfStatement,,X < V[mid],,8,AssignmentExpression,high,,mid - 1,9,IfStatement,,X > V[mid],,10,AssignmentExpression,low,,mid + 1,12,ReturnStatement,,,mid,14,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST6,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,IfStatement,,low < 5,,6,AssignmentExpression,high,,mid - 1,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST7,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST8,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,ReturnStatement,,,5 + 6,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST9,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,8,4,AssignmentExpression,high,,9,5,IfStatement,,8 < 9,,6,ReturnStatement,,,true,8,ReturnStatement,,,false\"'
        );
    });

    it('IfStatement_TEST10', () => {
        assert.equal(
            JSON.stringify(traverse(parseCode(`function General_TEST10(X, V, n){
                let low, high, mid;
                low = 8;
                high = 9;
                while(low < high){
                    low++;
                }
                return low+high;
            }`))),
            '"\Line,Type,Name,Condition,Value,1,FunctionDeclaration,Declaration_TEST1,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,AssignmentExpression_TEST2,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,WhileStatement_TEST3,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,ForStatement_TEST4,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,AssignmentExpression,i,,0,5,ForStatement,,low <= high;i ++,,6,AssignmentExpression,high,,n - 1,8,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST5,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,WhileStatement,,low <= high,,6,AssignmentExpression,mid,,low + high / 2,7,IfStatement,,X < V[mid],,8,AssignmentExpression,high,,mid - 1,9,IfStatement,,X > V[mid],,10,AssignmentExpression,low,,mid + 1,12,ReturnStatement,,,mid,14,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,IfStatement_TEST6,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,IfStatement,,low < 5,,6,AssignmentExpression,high,,mid - 1,7,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST7,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,0,4,AssignmentExpression,high,,n - 1,5,ReturnStatement,,,-1,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST8,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,ReturnStatement,,,5 + 6,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST9,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,8,4,AssignmentExpression,high,,9,5,IfStatement,,8 < 9,,6,ReturnStatement,,,true,8,ReturnStatement,,,false,Line,Type,Name,Condition,Value,1,FunctionDeclaration,General_TEST10,,,1,VariableDeclaration,X,,,1,VariableDeclaration,V,,,1,VariableDeclaration,n,,,2,VariableDeclaration,low,,,2,VariableDeclaration,high,,,2,VariableDeclaration,mid,,,3,AssignmentExpression,low,,8,4,AssignmentExpression,high,,9,5,WhileStatement,,low < high,,8,ReturnStatement,,,low + high\"'
        );
    });



});
