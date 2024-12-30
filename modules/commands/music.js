const fs = require('fs');
const path = require('path');

const senderIDAdmin = "100032407831557";

module.exports.config = {
    name: "cmdPrefix",
    version: "1.0.0",
    hasPermission: 2,
    description: "Enable or disable the prefix for a command",
    prefix: true,
    credits: "Jonell Magallanes",
    cooldowns: 5,
    category: "System"
};

module.exports.run = async function ({ api, event, args }) {
    const { senderID } = event;

    if (senderID !== senderIDAdmin) {
        return api.sendMessage("Not Authorized to Use This Command", event.threadID);
    }

    const splitArgs = args.join(" ").split("|").map(arg => arg.trim());
    const commandName = splitArgs[0];
    const prefixValue = splitArgs[1];

    if (!commandName || (prefixValue !== "true" && prefixValue !== "false")) {
        return api.sendMessage("Usage: prefix [commandName] | [true/false]", event.threadID);
    }

    const commandFilePath = path.join(__dirname, `${commandName}.js`);

    try {
        if (!fs.existsSync(commandFilePath)) {
            return api.sendMessage(`Command "${commandName}" does not exist.`, event.threadID);
        }

        let fileContent = fs.readFileSync(commandFilePath, 'utf-8');
        const prefixRegex = /prefix\s*:\s*(true|false)/;
        const currentprefix = prefixRegex.exec(fileContent);

        if (currentprefix && currentprefix[1] === prefixValue) {
            return api.sendMessage(`The command "${commandName}" already has prefix set to ${prefixValue}.`, event.threadID);
        }

        if (prefixRegex.test(fileContent)) {
            fileContent = fileContent.replace(prefixRegex, `prefix: ${prefixValue}`);
        } else {
            const configRegex = /module\.exports\.config\s*=\s*{([^}]*)}/;
            const match = fileContent.match(configRegex);
            if (match) {
                const configBlock = match[1];
                const newConfigBlock = configBlock.trim().endsWith(',')
                    ? `${configBlock}\n    prefix: ${prefixValue},`
                    : `${configBlock},\n    prefix: ${prefixValue},`;
                fileContent = fileContent.replace(configRegex, `module.exports.config = {${newConfigBlock}}`);
            }
        }

        fs.writeFileSync(commandFilePath, fileContent, 'utf-8');
        api.sendMessage(`Successfully updated prefix for command "${commandName}" to ${prefixValue}.`, event.threadID);

    } catch (error) {
        console.error(error);
        api.sendMessage(`An error occurred while updating the prefix for command "${commandName}". Check logs for details.`, event.threadID);
    }
};
