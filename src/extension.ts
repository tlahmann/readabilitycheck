'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {
    window,
    workspace,
    commands,
    Disposable,
    ExtensionContext,
    StatusBarAlignment,
    StatusBarItem,
} from 'vscode';
import {
    automatedReadability,
    colemanLiau,
    daleChall,
    flesch,
    fleschKincaid,
    smog,
    spache
} from './procedures'

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error).
    // This line of code will only be executed once when your extension is activated.
    console.log('Congratulations, your extension "Readability" is now active!');

    // Create the readability check
    let readabilityCheck = new ReadabilityCheck();
    let controller = new ReadabilityCheckController(readabilityCheck);

    let disposable = commands.registerCommand('extension.checkReadability', () => {
        readabilityCheck.updateReadability();
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(readabilityCheck);
    context.subscriptions.push(controller);
    context.subscriptions.push(disposable);
}

class ReadabilityCheck {

    private _statusBarItem: StatusBarItem;

    public updateReadability() {

        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        let doc = editor.document;

        // Only update status if a Markdown or plaintext file
        if ((doc.languageId === 'markdown') || (doc.languageId === 'plaintext')) {
            // FIXME: change to take configured value
            const configuredFormula = 'flesch' as string; // workspace.getConfiguration().get('readabilityCheck.formula');

            let formula = 'Readability';
            let readability = 0;

            let removeMd = require('remove-markdown');
            let docContent = removeMd(doc.getText());

            switch (configuredFormula) {
                case 'flesch':
                    formula = 'Flesch Reading Ease';
                    readability = flesch(docContent);
                    break;
                case 'flesch-kincaid':
                    formula = 'Flesch-Kincaid Grade Level';
                    readability = fleschKincaid(docContent);
                    break;
                case 'coleman-liau':
                    formula = 'Coleman-Liau Index';
                    readability = colemanLiau(docContent);
                    break;
                case 'dale-chall':
                    formula = 'Dale-Chall Readability';
                    readability = daleChall(docContent);
                    break;
                case 'smog':
                    formula = 'SMOG Formula';
                    readability = smog(docContent);
                    break;
                case 'spache':
                    formula = 'Spache Readability';
                    readability = spache(docContent);
                    break;
                default:
                    formula = 'Automated Readability';
                    readability = automatedReadability(docContent);
                    break;
            }

            // window.showInformationMessage(`${ formula } score: ${ readability }`);
            // Update the status bar
            this._statusBarItem.text = `${ formula } score: ${ readability }`;
            this._statusBarItem.show();
        } else {
            this._statusBarItem.hide();
        }
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}

class ReadabilityCheckController {

    private _readabilityCheck: ReadabilityCheck;
    private _disposable: Disposable;

    constructor (readabilityCheck: ReadabilityCheck) {
        this._readabilityCheck = readabilityCheck;

        // Update the readability counter when the file is opened or saved
        let subscriptions: Disposable[] = [];
        workspace.onDidOpenTextDocument(this._onEvent, this, subscriptions);
        workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);

        // Update the counter for the current file
        this._readabilityCheck.updateReadability();

        // Create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this._readabilityCheck.updateReadability();
    }
}

