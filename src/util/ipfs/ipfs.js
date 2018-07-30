//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
//run with local daemon
// const ipfsApi = require(‘ipfs-api’);
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});
export default ipfs;

//   https://ipfs.infura.io/ipfs/QmeowkxqBSkvwRyYMeFdjqNX8ZWC3E8anmd6SBMErTmCax
//json data https://ipfs.infura.io/ipfs/QmUeiTdEPJ87WsqrrDLbJ6sbu1w9hyXALE6KZzA3tpd6pj
//https://ipfs.infura.io/ipfs/
//https://ipfs.infura.io:5001/api/QmeowkxqBSkvwRyYMeFdjqNX8ZWC3E8anmd6SBMErTmCax