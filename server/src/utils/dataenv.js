const fs = require("fs");
const os = require("os");
const crypto = require('crypto')

function setEnvValue(key, value) {

    // read file from hdd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync("../../.env", "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));

    ENV_VARS.splice(target, 0, `SESSION_KEY=${session}`);

    // write everything back to the file system
    fs.writeFileSync("../../.env", ENV_VARS.join(os.EOL));
    //console.log(ENV_VARS.join(os.EOL))

}

const salt = crypto.randomBytes(32).toString('hex')
const session = crypto.randomBytes(16).toString('hex')

//setEnvValue("SESSION_KEY", session)
setTimeout(() => setEnvValue("SALT_KEY", salt), 1000)
;

