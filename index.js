#!/usr/bin/env node


// This was coded in a hurry so STFU and GTFO, thanks <3
// Also there is no error handling
//  ¯\_(ツ)_/¯


var program = require('commander');

program
  .version('1.0.0')
  .option('-u, --user <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The password of the user')
  .option('-s, --site <siteurl>', 'The site url where you want to upload the file, must be HTTPS')
  .option('-d, --destiny <path>', 'The path to the folder where you want to upload the file')
  .option('-f, --file <file>', 'The file name')
  .parse(process.argv);

function kill(str) {
    console.log(str);
    process.exit();
}

if(!program.user) kill("You must specify an username");
if(!program.password) kill("You must specify a password");
if(!program.site) kill("You must specify a site");
if(!program.destiny) kill("You must specify a destiny");
if(!program.file) kill("You must specify a file");

console.log('Initializing...')

require('es6-promise/auto');
require('isomorphic-fetch');

var fs = require('fs');
var spauth = require('node-sp-auth');
var pnp = require('sp-pnp-js');
var request = require('request');

var fileName = program.file;
var webUrl = program.site;
var username = program.user;
var password = program.password;
var path = program.destiny;

console.log("Reading File...")
var appFile = fs.readFileSync(fileName);
appFile = appFile.toString();


console.log("Authenticating with Sharepoint, user:", username)
spauth
    .getAuth(webUrl, {
        username: username,
        password: password
    })
    .then(function(options){
        console.log("Loading digest value...")
        var cookie = options.headers.Cookie
        request.post(webUrl + "/_api/contextinfo", {
            headers: {
                "Accept": "application/json;odata=verbose",
                "Cookie": cookie
            }
        }, function(err, res, body) {
            body = JSON.parse(body);
            // console.log(body.d.GetContextWebInformation.FormDigestValue);
            pnp.setup({
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Cookie": cookie,
                    "X-RequestDigest": body.d.GetContextWebInformation.FormDigestValue
                }
            });
            var web = new pnp.Web(webUrl);
            console.log("Uploading file "+ fileName + "...");
            web.getFolderByServerRelativeUrl(path).files.add(fileName, appFile, true).then(data => {
                console.log("File uploaded correctly!")
            });
        });
    });
