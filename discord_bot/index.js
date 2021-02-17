require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);



client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.channel.send("pong");
  }
});

client.on("message", (msg) => {
    if (msg.content === "björn") {
      msg.channel.send("<3 <3 <3 <3 <3 <3 <3");
    }
  });

client.on("message", (message) => {
    const prefix = 'gif';
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === prefix) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
});

