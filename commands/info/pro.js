const prefix = process.env.PREFIX;
module.exports = {
  name: 'pro',
  description: "Checks if user has ⚡ in username and gives role",
  aliases: [""],
  category: "",
  cooldown: 10,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  botPerms: "Administrator",
  userPerms: "ViewChannel",
  run: async (client, message, args) => {
    const guild = client.guilds.cache.get("1006539343625723986");
    const role = guild.roles.cache.get("1006539343982235726");
    const cmduser = message.author;
    const member = await guild.members.fetch(cmduser.id);
    const btag = "⚡";

    if (member.roles.cache.has(role.id)) {
      return message.channel.send(`<@${message.author.id}>, ah you alredy have role. Why you using command 😂?`)
    }

    if (cmduser.username.includes(btag)) {
      return member.roles.add(role), message.channel.send(`<@${message.author.id}>, You have Sucessfully got Pro role`)
    } else {
      message.channel.send(`<@${message.author.id}>, Please add \`⚡\` in Username to get Pro role.`)
      if (member.roles.cache.get(role)) {
        return member.roles.remove(role)
      }
    }

  }
};