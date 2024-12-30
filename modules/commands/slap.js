module.exports.config = {
  name: "slap",
  version: "1.0.0",
  permission: 0,
  credits: "Tanvir143",
  prefix: true,
  description: "laga thappor",
  category: "user",
  usages: "slap",
  cooldowns: 2,
};


module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
    var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);
  if (!args.join("")) return out("কারে থাপ্পর দিবা ট্যাগ করো😂\n\n [🤍] .slap @mention");
  else
  return axios.get('https://api.waifu.pics/sfw/slap').then(res => {
        let getURL = res.data.url;
        let ext = getURL.substring(getURL.lastIndexOf(".") + 1);
        var mention = Object.keys(event.mentions)[0];
                  let tag = event.mentions[mention].replace("@", "");    
        
 let callback = function () {
            api.setMessageReaction("🤡", event.messageID, (err) => {}, true);
        api.sendMessage({
						        body: "👋 " + tag + "😾👂👋\n\n_থাপ্পর দিয়ে কান গরম করে ফেলবো😒",
                                          mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
						attachment: fs.createReadStream(__dirname + `/cache/slap.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/slap.${ext}`), event.messageID)
				};
 //   }
        request(getURL).pipe(fs.createWriteStream(__dirname + `/cache/slap.${ext}`)).on("close", callback);
			})
    .catch(err => {
                     api.sendMessage("error", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
                  })     
}
