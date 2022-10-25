const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");
const helpemoji = require("../../botconfig/help.json");
const { clientname, clientavatar } = require("../../botconfig/main.json");
const client = require("../../index");
const prefix = client.config.prefix;
module.exports = {
  name: 'help',
  description: "Help Command!",
  aliases: ["h"],
  category: "developers",
  cooldown: 10,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  botPerms: ["ViewChannel", "SendMessages"],
  userPerms: "ViewChannel",
  run: async (client, message, args) => {
    const roleColor = "#ff0000"

    let ignored = 'developers'

    const directories = [
      ...new Set(client.commands.filter((cmd) => cmd.directory != 'developers').map((cmd) => cmd.directory))
    ];

    const formatString = (str) => {
      return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    };

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.directory === dir)
        .map((cmd) => {
          return {
            name: cmd.name ? cmd.name : "No command name!",
            description: cmd.description
              ? cmd.description
              : "No command description!",
          };
        });


      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });


    const embed = new EmbedBuilder()
      .setTitle(`${clientname || "Bot"}'s Commands`)
      .setDescription(
        `Type \`${prefix}cmdhelp <cmd>\` to get information about particular command.\n\nChoose a Category from dropdown list to find commands.`
      )
      .setColor(roleColor)
      .setFooter(`${clientname}`, `${clientavatar}`)
      .setTimestamp();

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Please select a category!")
          .setDisabled(state)
          .addOptions([
            categories.map((cmd) => {
              return {
                label: `${cmd.directory}`,
                value: `${cmd.directory.toLowerCase()}`,
                emoji: `${helpemoji[cmd.directory.toLowerCase()]}`,
                description:
                  `Commands from ` + `${cmd.directory}` + " category",
              };
            }),
          ])
      ),
    ];

    const inMessage = await message.channel.send({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 60000,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const embed2 = new EmbedBuilder()
        .setTitle(`${directory.charAt(0).toUpperCase()}${directory.slice(1).toLowerCase()}`)
        .setDescription(
          "" + category.commands.map((cmd) => `✪ | \`${prefix}${cmd.name}\` (*${cmd.description}*)`).join("\n ")
        )
        .setColor(roleColor);

      interaction.update({ embeds: [embed2] });
    });

    collector.on("end", () => {
      inMessage.edit({ components: components(true) });
    });
  },
};