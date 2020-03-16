import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
import { flesch } from '../../procedures';

suite('Flesch Test Suite', () => {

    test('Null test', () => {
        assert.equal(flesch(null), 0);
    });

    test('Basic test', () => {
        assert.equal(flesch('This is a test sentence.'), 101);
    });
    test('Empty test', () => {
        assert.equal(flesch(''), 206);
    });

});
