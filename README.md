# sp-upload  [![GitHub issues](https://img.shields.io/github/issues/Saissaken/sp-upload.svg)](https://github.com/Saissaken/sp-upload/issues) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Saissaken/sp-upload/pulls) [![Dependencies](https://david-dm.org/saissaken/sp-upload.svg)](https://github.com/Saissaken/sp-upload/blob/master/package.json)
Upload files to a sharepoint folder using the terminal

## Installation
```
npm install -g saissaken/sp-upload
```

## Usage
```
sp-upload -u john@mycorp.com 
          -p 123456 
          -s https://mycorp.sharepoint.com/sites/yoursite 
          -d path/to/your/folder 
          -f example.js
```

## Result
The local file `example.js` will be uploaded to `https://mycorp.sharepoint.com/sites/yoursite/path/to/your/folder/example.js`


It must be a valid path.


### WARNING
You are writing your credentials in the terminal, and they probably will be stored in some logs as plain text.

Bash will store every executed command in `~/.bash_history` and also the `history` that is kept in memory. You should clear that.

Right now, this is the only way to input your credentials, so deal with it or don't use it.
