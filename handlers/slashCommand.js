const fs = require('fs');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
module.exports = (client) => {
  const TOKEN = process.env.TOKEN;
  const CLIENT_ID = process.env.CLIENT_ID || client.config.CLIENT.ID;
  const GUILD_ID = client.config.SERVER.OFFICIAL.Guild_ID_1 || process.env.GUILD_ID;
  const rest = new REST({ version: '9' }).setToken(TOKEN);
  const slashCommands = []; 
  let x = 0;
	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`../slashCommands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
      x++;
				if(slashCommand.name) {
						client.slashCommands.set(slashCommand.name, slashCommand)
				} else {
          client.logger(`Command Error: ${slashCommand.name || file.split('.js')[0] || "Missing Name"}`.brightRed)
        }
		}
	});
	(async () => {
			try {
				await rest.put(
					GUILD_ID ?
					Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) :
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
				).catch((e) => {console.log((e.message).bold.red)});
        setTimeout(() => { 
				client.logger(`Loaded ${x} Slash Commands`.bold)
        }, 1500)
			} catch (error) {
				console.log(error);
			}
	})();
};
