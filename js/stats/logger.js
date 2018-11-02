/// write to file
var txtFile = "c:/test.txt";
var file = new File(txtFile);
var str = "My string of text";

file.open("w"); // open file with write access
file.writeln("First line of text");
file.writeln("Second line of text " + str);
file.write(str);
file.close();

/// read from file

var txtFile = "c:/test.txt"
var file = new File(txtFile);

file.open("r"); // open file with read access
var str = "";
while (!file.eof) {
	// read each line of text
	str += file.readln() + "\n";
}
file.close();
alert(str);

////////////////////////////////////////////////////
/**
 * writeTextFile write data to file on hard drive
 * @param  string  filepath   Path to file on hard drive
 * @param  sring   output     Data to be written
 */
function writeTextFile(filepath, output) {
	var txtFile = new File(filepath);
	txtFile.open("w"); //
	txtFile.writeln(output);
	txtFile.close();
}

////////////////////////////////////////////////////
/**
 * readTextFile read data from file
 * @param  string   filepath   Path to file on hard drive
 * @return string              String with file data
 */
function readTextFile(filepath) {
	var str = "";
	var txtFile = new File(filepath);
	txtFile.open("r");
	while (!txtFile.eof) {
		// read each line of text
		str += txtFile.readln() + "\n";
	}
	return str;
}

////////////////////////////////////////////////////

// Great parse examples with result to process file
// http://www.w3schools.com/jsref/jsref_parseint.asp
// var a = parseInt("10");           // 10
// var b = parseInt("10.00");        // 10
// var c = parseInt("10.33");        // 10
// var d = parseInt("34 45 66");     // 34
// var e = parseInt(" 60 ");         // 60
// var f = parseInt("40 years");     // 40
// var g = parseInt("He was 40");    // NaN
//
// var h = parseInt("10",10);        // 10
// var i = parseInt("010");          // 10
// var j = parseInt("10",8);         // 8
// var k = parseInt("0x10");         // 16
// var l = parseInt("10",16);        // 16

// http://www.w3schools.com/jsref/jsref_parsefloat.asp
// var a = parseFloat("10");         // 10
// var b = parseFloat("10.00");      // 10
// var c = parseFloat("10.33");      // 10.33
// var d = parseFloat("34 45 66");   // 34
// var e = parseFloat(" 60 ");       // 60
// var f = parseFloat("40 years");   // 40
// var g = parseFloat("He was 40");  // NaN