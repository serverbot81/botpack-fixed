module.exports.config = {
    name: "filter",
    version: "2.0.0",
    permission: 2,
    credits: "𝖬𝖺𝗋𝗃𝗁𝗎𝗇 𝖡𝖺𝗒𝗅𝗈𝗇 & 𝖬𝗂𝗄𝗈 𝖬𝖾𝗆𝗉𝗂𝗇",
    description: "𝗙𝗶𝗹𝘁𝗲𝗿 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖬𝖺𝗋𝗃𝗁𝗎𝗇 𝖡𝖺𝗒𝗅𝗈𝗇 𝖺𝗇𝖽 𝖬𝗂𝗄𝗈 𝖬𝖾𝗆𝗉𝗂𝗇 𝗂𝗌 𝗎𝗌𝖾 𝗍𝗈 𝗋𝖾𝗆𝗈𝗏𝖾 𝗈𝗋 𝖿𝗂𝗅𝗍𝖾𝗋 𝗍𝗁𝖾 𝗂𝗇𝖺𝖼𝗍𝗂𝗏𝖾 𝗈𝗋 𝖻𝖺𝗇𝗇𝖾𝖽 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗌𝖾𝗋 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉.",
    prefix: false,
    category: "𝗦𝗬𝗦𝗧𝗘𝗠",
    usages: "filter",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
    const { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);
    let successCount = 0;
    let failCount = 0;
    const filteredUsers = [];

    for (const user of userInfo) {
        if (user.gender === undefined) {
            filteredUsers.push(user.id);
        }
    }

    const isBotAdmin = adminIDs.map(a => a.id).includes(api.getCurrentUserID());

    if (filteredUsers.length === 0) {
        api.sendMessage("❎ | No more death account.", event.threadID);
    } else {
        api.sendMessage(`♻️| 𝖥𝗂𝗅𝗍𝖾𝗋𝗂𝗇𝗀 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖬𝖾𝗆𝖻𝖾𝗋𝗌 𝖨𝗇 𝖳𝗁𝗂𝗌 𝖦𝗋𝗈𝗎𝗉, ${filteredUsers.length} 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗌𝖾𝗋𝗌.`, event.threadID, () => {
            if (isBotAdmin) {
                api.sendMessage("🔰 | 𝖥𝗂𝗅𝗍𝖾𝗋 𝗂𝗌 𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...\n\n", event.threadID, async () => {
                    for (const userID of filteredUsers) {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(userID), event.threadID);
                            successCount++;
                        } catch (error) {
                            failCount++;
                        }
                    }

                    api.sendMessage(`🟢 | 𝖲𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗇 ${successCount} 𝗉𝖾𝗈𝗉𝗅𝖾.`, event.threadID, () => {
                        if (failCount !== 0) {
                            api.sendMessage(`🔴 | 𝖥𝖺𝗂𝗅𝖾𝖽 𝖿𝗂𝗅𝗍𝖾𝗋 ${failCount} 𝗉𝖾𝗈𝗉𝗅𝖾.`, event.threadID);
                        }
                    });
                });
            } else {
                api.sendMessage("ℹ️ | 𝖡𝗈𝗍 𝗇𝖾𝖾𝖽𝗌 𝖺𝖽𝗆𝗂𝗇 𝗉𝗋𝖾𝗏𝗂𝗅𝖾𝗀𝖾 𝗍𝗈 𝖿𝗂𝗅𝗍𝖾𝗋 𝗈𝗋 𝗄𝗂𝖼𝗄 𝗍𝗁𝖾 𝗎𝗇𝖺𝖼𝗍𝗂𝗏𝖾 𝗆𝖾𝗆𝖻𝖾𝗋, 𝖥𝖺𝗂𝗅𝖾𝖽 𝗍𝗈 𝗉𝗋𝗈𝖼𝖾𝖾𝖽.", event.threadID);
            }
        });
    }
};
