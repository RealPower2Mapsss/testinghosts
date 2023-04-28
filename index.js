require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const { QuickDB } = require("quick.db");
const db = new QuickDB(); // will make a json.sqlite in the root folder

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'slashcommand') {
    await interaction.reply('It works!');
  }
  if (interaction.commandName === 'set') {
    var key = interaction.options.getString('key')
    var value = interaction.options.getString('value')
    try {
        await db.set(key, value)
    } catch (error) {
        return await interaction.reply("An error occurred: "+error)
    } finally {
        return await interaction.reply("Successfully set **"+key+"** to **"+value+"**. :white_check_mark:")
    }
  }
  if (interaction.commandName === 'check') {
    var input = interaction.options.getString('input')
    var result = await db.get(input)
    if(!result) result = "Not found :x:"
    await interaction.reply('Result: '+ result);
  }
});

client.login(process.env.TOKEN);


app.get('/', (req, res) => {
  res.send('Hello World! <br /> <a href="/db">Go to database</a>')
})

app.get('/db', async (req, res) => {
    var data = await db.all()
    res.send(data)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

