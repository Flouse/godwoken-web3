import * as modules from './modules';

/**
 * get all methods. e.g., getBlockByNumber in eth module
 * @private
 * @param  {Object}   mod
 * @return {string[]}
 */
function getMethodNames(mod: any): string[] {
    return Object.getOwnPropertyNames(mod.prototype)
}

/**
 * return all the methods in all module
 */
function getMethods() {
    const methods: any = {};
    
    modules.list.forEach((modName: string) => {
      const mod = new (modules as any)[modName]();      
      getMethodNames((modules as any)[modName])
        .filter((methodName: string) => methodName !== 'constructor')
        .forEach((methodName: string) => {
          const concatedMethodName = `${modName.toLowerCase()}_${methodName}`
          methods[concatedMethodName] = mod[methodName].bind(mod);
        });
    })

    return methods;
}

const methods = getMethods();
console.log(methods);
module.exports = methods;


/**
module.exports = {

 
    web3_clientVersion : function (args: [], callback: Callback) {
        callback(null, getClientVersion()); // eg: "godwoken/v1.0/linux-amd64/rust1.47");
    },

    web3_sha3 : function (args: string[], callback: Callback) {
        try {
            const rawDigest = keccak(toBuffer(args[0]));
            const hexEncodedDigest = addHexPrefix(rawDigest.toString('hex'));
            callback(null, hexEncodedDigest);
          } catch (err) {
            console.log(err);
            callback(err);
        }
    },

    net_version : function (args: [], callback: Callback) {
       callback(null, Config.chain_id); 
    },

    net_peerCount : function (args: [], callback: Callback) {
        callback(null, 0);
    },

    net_listening : function (args: [], callback: Callback) {
        callback(null, server.isListening() );
    },

    eth_protocolVersion : function (args: [], callback: Callback) {
        callback(null, Config.eth_protocolVersion);
    },

    eth_syncing : function (args: [], callback: Callback) {

    },
    
    eth_coinbase : function (args: [], callback: Callback) {

    },
    eth_mining : function (args: [], callback: Callback) {

    },
    eth_hashrate : function (args: [], callback: Callback) {

    }, 
    eth_gasPrice :  function (args: [], callback: Callback) {

    },
    eth_accounts : function (args: [], callback: Callback) {

    },
    eth_blockNumber : function (args: [], callback: Callback) {

    },
    eth_getBalance : function (args: [], callback: Callback) {

    },
}
*/

