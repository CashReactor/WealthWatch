//var  ursaLib  =  require('ursa');//
var fs = require('fs')

function encrypt(data) {
	publicKeyVal = "";
	var fileContent = fs.readFileSync('publickey.txt', 'utf8');
	// keyAliasConstant = "keyAlias";
	keyPEMConstant = "keyAsPemString";
	publicKeyVal = fileContent.substring((fileContent.indexOf(keyPEMConstant)+keyPEMConstant.length+3), (fileContent.indexOf('"}')));
	publicKeyVal = publicKeyVal.replace(/\\n/g, '\n');
	//Setting the public key
	//pubKey = ursaLib.createPublicKey(publicKeyVal);
	//Encrypting the data
	//msg = pubKey.encrypt(data, 'utf8', 'hex', ursaLib.RSA_PKCS1_PADDING);
	return msg;
}
exports.encrypt = encrypt