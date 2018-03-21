
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
};


function MakeHash() {

var data1 = $("#data1").val();
var hash = web3.sha3(data1);
console.log(hash);
document.getElementById("hashdisplay").innerHTML = "Hash: " + hash;
}

function StoreHash() {

var toAddress = '0xe00fa90157caEAD9D6808E1123F9Ea922Be1a26D';
var data1 = $("#data1").val();
var hash = web3.sha3(data1);
console.log(data1);
console.log(hash);
console.log("sending now");

web3.eth.sendTransaction({to:toAddress, data: hash}, function(err, transactionHash) {
  if (err) {
  	console.log(err)
}  else {
    console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
    document.getElementById("txdisplay").innerHTML = "TX Id: " + transactionHash;
};
});

} 

function RetrieveHash() {

var txs = $("#tx").val();
var tx = txs.replace(/\s+/g, '');
console.log(tx);
console.log("retrieving now");	
web3.eth.getTransaction(tx, function(err, hashreturn) {
   if (err) {
  	console.log(err)
}  else {
    console.log(hashreturn); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
    var obj = hashreturn
    console.log(obj.input)
    console.log(obj.blockNumber)
    var block = obj.blockNumber
    web3.eth.getBlock(block, function(err, blockinfo) {
    if(err){
    		console.log(err)
    	} else {
    		console.log(blockinfo.timestamp);
    		var unix = blockinfo.timestamp
    		var d = new Date(unix * 1000);
    		console.log(d);
    		document.getElementById("datadisplay").innerHTML = "Hash stored: " + obj.input;
    		document.getElementById("datadisplay2").innerHTML = "Date " + d;
    		var userinput2 = $("#data4").val();
    		var hash2 = web3.sha3(userinput2);
            var data5 = obj.input;
if (hash2 == data5) {
	document.getElementById("datadisplay3").innerHTML = "Input matches Tx data"
}

else {
	document.getElementById("datadisplay3").innerHTML = "Input doesn't match Tx data"
}

    	};
    	
    });
};
});

}

function CheckHash() {



}