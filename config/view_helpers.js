const env = require('./environment');
const fs = require('fs');
const path = require('path');

//helper to set the path of static files
module.exports = (app) => {
    // set the path of assets/static files in locals object of node.js app
    app.locals.assetPath = function(filePath){
        // if environment is development
        if (env.name === 'development'){
            return filePath;
        }

        // if environment is production
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}