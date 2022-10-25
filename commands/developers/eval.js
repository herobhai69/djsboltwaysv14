const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'eval',
  description: "Evaluate a given code",
  aliases: ["e"],
  category: "developers",
  cooldown: 2,
  guildOnly: false,
  ownerOnly: true,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  botPerms: "ViewChannel",
  userPerms: "ViewChannel",
  run: async (client, message, args) => {
    try {
      const code = args.join(" ");
      if (!code) {
        return message.channel.send("Please Provide A code to eval!");
      }
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      let embed = new EmbedBuilder()
        .setAuthor({
          name: "Eval",
          icon_url: message.author.avatarURL()
        })
        .addFields({ name: "Input", value: `\`\`\`${code}\`\`\`` })
        .addFields({ name: "Output", value: `\`\`\`${evaled}\`\`\`` })
        .setColor("BLUE");

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
  },
};