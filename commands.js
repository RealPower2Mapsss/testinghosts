require('dotenv').config()
const { REST, Routes } = require('discord.js');

const { SlashCommandBuilder } = require('discord.js');
const checkcmd = new SlashCommandBuilder()
	.setName('check')
	.setDescription('Check db value')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to check')
            .setRequired(true));

const setcmd = new SlashCommandBuilder()
	.setName('set')
	.setDescription('Set db value')
	.addStringOption(option =>
		option.setName('key')
			.setDescription('The key')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('value')
            .setDescription('The value')
            .setRequired(true));

const commands = {
    name: 'slashcommand',
    description: 'Test slash command.',
  }


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands("706770283411013672"), { body: [commands, checkcmd, setcmd] });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
