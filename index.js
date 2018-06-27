#!/usr/bin/env node

const jade = require('jade')
const path = require('path')
const mv = require('mv');
const fs = require('fs')
const html2jade = require('html2jade')

const jadeToHtmlOptions = {
    pretty: true,
    basedir: process.cwd()
}

const htmlToJadeOptions = {
    double: true,
    nspaces: 2,
    bodyless: true,
    donotencode: true,
    noemptypipe: true
}

const pathToFile = process.argv[2]
const fullPath = path.join(process.cwd(), pathToFile)

const html = jade.renderFile(fullPath, jadeToHtmlOptions)

mv(fullPath, fullPath.replace('.jade', '_bak.jade'), function(err) {
    if (err) { console.err(err); return; }
    html2jade.convertHtml(html, htmlToJadeOptions, function(err, pugData) {
        if (err) { console.err(err); return; }
        fs.writeFile(fullPath, pugData, function(err) {
            if (err) { console.err(err); return; }
            console.log('Done!')
        })
    });
});