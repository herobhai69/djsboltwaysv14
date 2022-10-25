const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'buttons',
  description: "",
  aliases: [""],
  category: "",
  cooldown: 10,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  botPerms: "ViewChannel",
  userPerms: "ViewChannel",
  run: async (client, message, args) => {
    try {
      const embed = new EmbedBuilder()
        .setDescription(`${client.emotes.MESSAGE.y} All Buttons`)
        .setColor(client.embed.color)
        .setTimestamp()
        .setFooter({ text: client.user.tag })

      const actionRow = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder() // Blue 
            .setLabel('Style 1')
            .setDisabled(true)
            .setCustomId(`1`)
            .setStyle(1),
          new ButtonBuilder() // Gray
            .setLabel('Style 2')
            .setDisabled(true)
            .setCustomId(`2`)
            .setStyle(2),
          new ButtonBuilder() // Green
            .setLabel('Style 3')
            .setDisabled(true)
            .setCustomId(`3`)
            .setStyle(3),
          new ButtonBuilder() // Red
            .setLabel('Style 4')
            .setDisabled(true)
            .setCustomId(`4`)
            .setStyle(4),
          new ButtonBuilder() // Link
            .setLabel('Style 5')
            .setDisabled(true)
            .setStyle(5)
            .setURL(`https://discord.gg`)
        ])
      message.reply({ embeds: [embed], components: [actionRow] })
    } catch (error) {
      client.msg_err(client, message, error);
    }
  }
};
