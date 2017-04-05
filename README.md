# sp-upload
Upload files to a sharepoint folder using the terminal


### Install
```
npm install -g saissaken/sp-upload
```

### Usage
```
sp-upload -u john@mycorp.com 
          -p 123456 
          -s https://mycorp.sharepoint.com/sites/yoursite 
          -d path/to/your/folder 
          -f example.js
```

### WARNING
You are writing your credentials in the terminal, and they probably will be stored in some logs as plain text.

Bash will store every executed command in `~/.bash_history` and also the `history` that is kept in memory. You should clear that.

Right now, this is the only way to input your credentials, so deal with it or don't use it.
