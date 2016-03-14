//DESCRIPTION: Selects all text objects that have to be translated and moves them on TEXT layer
// Create TEXT layer for translation
//
// Modified 2016-02-05
// Olimpiu Hulea
// (+31) 657976413

Main();
// app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script")

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
        // Do stuff here 
        unlockLayers ();
        addTextLayer("TEXT");
        selectText();
        alert("Finished!");
        }
    else {
		// No documents are open, so display an error message.
		alert("No InDesign documents are open. Please open a document and try again.")
	}
}

function selectText() {
    var textRefs = app.activeDocument.textFrames;
    $.writeln(textRefs.length)
    var num = 0;
    
    if ( textRefs.length >= 1 ) {
        for ( var i = 0; i < textRefs.length; i++ ) {
                var str = textRefs[i].contents;
                
                // if str is a string, contains more than 1 letter, is not a code and it's not on the layer "TITLE" or "RANGE"
                if ( isNaN(str) && moreLetters(str) && isNotCode(str)  && isNotEsmCode (str) && textRefs[i].parent.name != "TITLE" && textRefs[i].parent.name != "RANGE" )  {        
                    // $.writeln(str + " is a text.");
                    textRefs[i].moveToBeginning(app.activeDocument.layers[0]);
                    //app.activeDocument.textRefs[i].itemLayer = textLayer;
                    }
                else {
                    // $.writeln(str + " is a number.");
                    num = num + 1;
                    }         
            }
        $.writeln("Total only numbers: " + num);
        }
    }

function addTextLayer (layerName) {
    var textLayer = app.activeDocument.layers.add();
    textLayer.name = layerName;
    }

function moreLetters (str) {
    if ( str.length > 1 ) {
        //$.writeln("More than one letter");
        return true;
        }
    else {
        //$.writeln("One letter");
        return false;
        }
    }

function isNotCode (str) {  // check that str is not a code
        if ( (str.length <  5) && (( isNaN(str.slice(1)) == false ) || ( isNaN(str.substring(0, str.length-1)) == false )) ) {
            $.writeln("This is a code");
            return false;
            }
        else return true;
    }

function isNotEsmCode (str) {  // check that str is not an Esm code
    if ( str.slice(-2) == "GB" ) {
            $.writeln("ESM code");
            return false;
        }
    else return true;
    }

function unlockLayers () {
    doc = app.activeDocument;
    var len = doc.layers.length;
    $.writeln(len);
    
    for ( var i = 0; i < len; i++) {
            doc.layers[i].locked = false;
        }
    }