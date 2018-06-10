const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const superagent = require("superagent");
const client = new Discord.Client();
const format = require("node.date-time");
const economy = require('discord-eco');
const ms = require("ms");
const prettyMs = require('pretty-ms');
const ifunny = require("ifunny");
const randomPuppy = require('random-puppy');
const randomCat = require('random-cat');
const db = require('quick.db');
const meme = require('memejs');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

let coins = require("./coins.json");
var fs = require("fs");
let items = require("./items.json");
let help = require("./ComHelp.json");
let talkedRecently = [];
  let helps = {
    "ping" : {
    usage : "",
    description : "Donne le ping du bot"
    },
    "8ball": {
    usage : "<question>",
    description : "Pose une question au fameux 8ball :o"
    },
    "sayd": {
    usage : "<texte>",
    description : "Permet de répeter un texte"
    },
    "help": {
    usage : "[commande]",
    description : "Ce que tu viens tout juste de lancer..."
    }

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}



var servers = {};


client.on('warn', console.warn);
client.on('error', console.error);
client.on("ready", () => {
  console.log("Darkybot a bien démarrer !");
  console.log(`${client.user.username} est en ligne sur ${client.guilds.size} serveurs !`);
  
     client.user.setStatus('Online')
     //client.user.setActivity(`Maintenance | Modif. bot.`)
     client.user.setActivity(`db!help  ■  ${client.guilds.size} serveurs !`)
});

//PREFIX
var prefix = 'db!'


client.on('message', async (message) => {
 //var args = message.content.substring(prefix.length).split(" ");
 
let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);

     if(message.author.bot) return;

if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}
  

//coins.json 
let coinAmt = Math.floor(Math.random() * 30) + 1;
let baseAmt = Math.floor(Math.random() * 30) + 1;

  
if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});
} 
  
 let xpAdd = Math.floor(Math.random() * 7) + 8; 
  
const xp = require("./xp.json");
 
  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
   };
 }
  
 let curxp = xp[message.author.id].xp;
 let curlvl = xp[message.author.id].level;
 let nxtLvl = xp[message.author.id].level * 500;
 xp[message.author.id].xp = curxp + xpAdd;
 if(nxtLvl <= xp[message.author.id].xp){
   xp[message.author.id].level = curlvl++;
   //let lvlup = new Discord.RichEmbed()
   //.setTitle("**LEVEL UP POUR " + (message.author.tag) + " !**")
   //.setThumbnail("https://cdn4.iconfinder.com/data/icons/arrows-2-9/32/double_arrow_up-256.png")
   //.setColor("RANDOM")
   //.addField("Tu est maintenant:", "niveau " + curlvl + 1 + " !");
   
   //message.channel.send(lvlup).then(msg => {msg.delete(3000)})
}
   fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
   if(err) console.log(err)
});


///////
  if (message.content.toLowerCase().includes("countstp")){
client.channels.get('453658360475025436').fetchMessage('453660627802521630').then(m => {
let newarg = m.content.split(" ").slice(1)
let num = parseInt(newarg[0]) + 1
m.edit("Maths_Compteur: " + num)
}
)
    }
  //Mention bot --> donne prefix
  if (message.content.includes('<@441409139294601216>')) {
  
  message.channel.send("Bonjour ! Mon préfix est `db!` !")
  } 
  
  if (!message.content.startsWith(prefix)) return;
    if (talkedRecently.indexOf(message.author.id) !== -1) {
            message.channel.send(":clock10: **HÉ HO !** Patiente deux secondes entres chaques commandes " + message.author + " !");
       return;
    }
//db!ping
if (message.content.startsWith(prefix + 'ping')) {

  var pingembed = new Discord.RichEmbed()
     
     .setColor("RANDOM")
     .addField("Pong ! :ping_pong:", "Mon ping est de " + client.ping + " ms")
     .setTimestamp();

message.channel.send(pingembed);

}
  
//db!8ball <question>
if (message.content.startsWith(prefix + "8ball")) {

var botmessage = args.slice(1).join(" ");
 if(!args[2]) return message.channel.send("**UNE QUESTION DOIT COMMENCER PAR UNE LETTRE ET FINIR PAR UN POINT D'INTERROGATION !** Alors fait un effort stp.");

/// rep positives: 6 | négative: 6 | mitigé: 6
var replies = ["Ouais !","Nan...","Peut-être.","Chais pas, demande a ta mère. :/","Compte la dessus !","Nan, oublie", "Re-demande moi plus tard. :sweat_smile:", "Euh... Tu n'as pas une meilleur question ?", "Je demanderais a mon cheval ! *PS: il a répondu oui.  :smirk:*","Alors là... Aucune idée frère","Je demanderais a mon cheval ! *PS: Il a répondu non cbatar...*", "Mouais...", "Je pense que ouais.", "OUAIS, OUAIS, OUAIS, OUAIIIS !", "Hahaha ! Non.", "Peut-être que oui, peut-être que non.", "C'est sûr et certaint !", "Même pas en rêve",];
var question = args.join(" ")
var result = Math.floor((Math.random() * replies.length));

   var ballembed = new Discord.RichEmbed()
     .setAuthor(message.author.tag)
     .setColor("RANDOM")
     .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/2000px-8-Ball_Pool.svg.png")
     .addField("Question:", question)
     .addField("Réponse à la question:", replies[result]);

message.channel.send(ballembed);
};


//db!infoserveur
if (message.content.startsWith(prefix + "infoserveur")){

	let sicon = message.guild.displayIconURL;
	let serverembed = new Discord.RichEmbed()
	.setDescription("Informations sur le serveur !")
	.setColor("#E82142")
	.setThumbnail(message.guild.iconURL)
	.addField("Nom du serveur:", message.guild.name)
	.addField("Rejoin le:", message.member.joinedAt.format("dd-MM-Y à HH:mm:SS"))
  .addField("Crée le:", message.guild.createdAt.format("dd-MM-Y à HH:mm:SS"))
  .addField("Membres total:", message.guild.memberCount)

	return message.channel.send(serverembed);
}

//db!help
if (message.content.startsWith(prefix + "help")){
  
 //var botmessage = args.slice(1).join(" ");
 //if(!args[2].join(' ')){
    
  //let commande = '';
  //let desc = '';
    
    
   // var helppEmbed = new Discord.RichEmbed()
     //   .setTitle("Aide commande")
       // .setColor("RANDOM")
        //.addField(commande, desc)
        
   // message.channel.send(helppEmbed);
 
 //   }

	let botembed = new Discord.RichEmbed()
	.setTitle("Bonjour, je suis l'aide ! Et voici mes commandes ! :smiley:")
	.setColor("#00C1FF")
	.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Emoji_u1f4dd.svg/1000px-Emoji_u1f4dd.svg.png")
  .addField("Fun: ", "`8ball`, `sayd`, `avatar`, `doggo`, `cat`, `oazo`, `poasson`, `pileouface`, `rps`, `rmemes`")
  .addField("jeux d'argent: ", "**[+ bientôt]** mais en attendant, jouez avec `$rps`")
  .addField("Action/RP: ", "`hug`, `slap`, `kiss`, `bite`")
  .addField("Administration: ", "`report`, pour + de commandes, faites db!adminhelp")
  .addField("Musique: **[not working atm]**", "`play`, `skip`, `stop`")
  .addField("Argent: ", "`coins`, `pay`")
  .addField("Utilisateur: ", "`ui`, `level`")
  .addField("Autre:", "`ping`, `infoserveur`, `help`")
  .addField("Owner bot seul.:", "`setgame`, `setstream`, `setwatch`, `eval`, `guildlist`")
  .addField("Liens utile: ", "[Website](https://darkybot-site.glitch.me) ● [Serveur support](https://discord.gg/Y97BY7k) ● [Invite moi !](https://discordapp.com/api/oauth2/authorize?client_id=441409139294601216&permissions=8&scope=bot)");
 

return message.channel.send(botembed);

    
  }

//db!adminhelp
if (message.content.startsWith(prefix + "adminhelp")){
  
let botembed = new Discord.RichEmbed()
	.setTitle("Bonjour, je suis l'aide pour les administrateurs ! Et voici mes commandes ! :smiley:")
	.setColor("#00C1FF")
	.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Emoji_u1f4dd.svg/1000px-Emoji_u1f4dd.svg.png")
	.addField("kick <membre> <raison>","Pour l'exclure du serveur !")
  .addField("ban <membre> <raison>", "Pour le frapper avec le marteau du ban ! èwé")
  .addField("giverole <membre> <role>", "Pour donner a un membre le rôle choisi.")
  .addField("removerole <membre> <role>", "Pour retirer a un membre le rôle choisi.")
  .addField("mute <membre> <temps en ms>", "Pour pouvoir mute un membre trop dissident.")

return message.channel.send(botembed);
}

  

//db!setgame
if (message.content.startsWith(prefix + "setgame")){
  if (message.author.id != 191272823170269184) return message.reply("**BINGO !** Tu as trouver une commande réservé a l'owner du bot, bravo ! Mais tu ne peux pas t'en servir. *setgame run away.*")
  message.reply("C'est fait ! :thumbsup::skin-tone-2:")
  var game = args.join(" ");
        client.user.setActivity(game, {
        'type': 'PLAYING'

})};
  
//db!setstream
if (message.content.startsWith(prefix + "setstream")){
  if (message.author.id != 191272823170269184) return message.reply("**BINGO !** Tu as trouver une commande réservé a l'owner du bot, bravo ! Mais tu ne peux pas t'en servir. *setstream run away.*")
  message.reply("C'est fait ! :thumbsup::skin-tone-2:")
  var stream = args.join(" ");
        client.user.setActivity(stream, {
        'type': 'STREAMING',
        'url': "https://www.twitch.tv/thedarknightshoww"

})};
  
//db!setwatch  
if (message.content.startsWith(prefix + "setwatch")){
  if (message.author.id != 191272823170269184) return message.reply("**BINGO !** Tu as trouver une commande réservé a l'owner du bot, bravo ! Mais tu ne peux pas t'en servir. *setwatch run away.*")
  message.reply("C'est fait ! :thumbsup::skin-tone-2:")
  var watch = args.join(" ");
        client.user.setActivity(watch, {
        'type': 'WATCHING',

})};
  
//db!sayd <message>
if (message.content.startsWith(prefix + "sayd")){
var botmessage = args.join(" ");
if (!botmessage) return message.channel.send("Envoye un truc stp")
message.delete();
message.channel.send(botmessage);
}

//db!report <utilisateur> <raison>
if (message.content.startsWith(prefix + "report")){

	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Je n'ai pas trouver l'utilisateur :sweat:")
    if (rUser.id == message.author.id) return message.reply('Euh... Pourquoi tu veux te report toi même ? :thinking: ');
    if (rUser.id == client.user.id) return message.reply('Héhéhé... Tu as cru pouvoir me report ?! **IDIOT !**');
    if (rUser.id == 191272823170269184) return message.reply("Nop, tu peux pas le report. C'est l'owner du bot, c'est un peu bête, non ?");
    if (rUser.id == 334095574674571264) return message.reply("C'est Eni quand même, tu ne peut pas le report...")

      var reason = args.slice(1).join(" ")

    var reportEmbed = new Discord.RichEmbed()
    .setDescription("Caftage")
    .setColor("#DAF116")
    .setThumbnail("https://www.emojibase.com/resources/img/emojis/apple/x26a0.png.pagespeed.ic.DB5SxsN5FU.png")
    .addField("Membre rapporté: ", `${rUser} avec l'ID: ${rUser.id}`)
    .addField("Rapporté par: ", `${message.author} avec l'ID: ${message.author.id}`)
    .addField("Dans le salon: ", message.channel)
    .addField("Le :", message.createdAt)
    .addField("Raison: ", reason);

    let reportschannel = message.guild.channels.find(`name`, "rapports");
    if(!reportschannel) return message.channel.send("Je n'arrive pas a trouver le salon #rapports, demandez a votre administrateur d'en crée un !")

    message.delete();
    reportschannel.send(reportEmbed);

}

//db!kick <utilisateur> <raison>
if (message.content.startsWith(prefix + "kick")){

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if (!args[0]) return message.channel.send("Va falloir choisir quelqu'un, je suis pas devin, et je ne vais pas deviner la personne pour toi.");
if(!kUser) return message.channel.send("Je n'ai pas trouver l'utilisateur :sweat:")
if (kUser.id == message.author.id) return message.reply('Tu veux te kick toi même ?! Étrange... :thinking: ');
if (kUser.id == client.user.id) return message.reply('Tu veux me kick ? :disappointed_relieved:')
if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Non, tu ne peux pas ! *kick run away*");
if (kUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Nan, il a des privililèges qui m'empêche de faire sa. *kick run away*");
   var kReason = args.join(" ").slice(23);
  if (!kReason) return message.reply("il faut mettre un motif !")

let kickEmbed = new Discord.RichEmbed()
   .setDescription("**~|kick|~**")
   .setColor("#ff7700")
   .setThumbnail("http://www.emoji.co.uk/files/twitter-emojis/symbols-twitter/11144-double-exclamation-mark.png")
   .addField("Utilisateur kick: ", `${kUser} avec l'ID ${kUser.id}`)
   .addField("Kick par: ", `<@${message.author.id}> avec l'ID ${message.author.id}`)
   .addField("Kick a partir du salon: ", message.channel)
   .addField("Le: ", message.createdAt.format("dd-MM-Y à HH:mm:SS"))
   .addField("Raison: ", kReason);

   let kickChannel = message.guild.channels.find(`name`, "rapports");
   if(!kickChannel) return message.channel.send("Je ne peux pas le kick car le salon #rapports est inexistant, merci de le crée.");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);

}

//db!ban <utilisateur> <raison>
if (message.content.startsWith(prefix + "ban")){

let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!args[0]) return message.channel.send("Va falloir choisir quelqu'un, je suis pas devin, et je ne vais pas deviner la personne pour toi.");
    if(!bUser) return message.channel.send("Je n'ai pas trouver l'utilisateur :sweat:");
    if (bUser.id == message.author.id) return message.reply('Tu veux te bannir toi même ?! Tu est **vraiment** étrange... :cold_sweat: ');
    if (bUser.id == client.user.id) return message.reply('TU VEUX ME BANNIR !? :sob:')
    let bReason = args.join(" ").slice(23);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Non, tu ne peux pas ! *ban run away*");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nan, il a des privililèges qui m'empêche de faire sa. *ban run away*");
    if(!bReason) return message.reply("il faut mettre un motif !")
  
    let banEmbed = new Discord.RichEmbed()
    .setDescription("**~|Bannissement|~**")
    .setColor("#bc0000")
    .setThumbnail("https://pbs.twimg.com/media/C9kEEmbXUAEX3r6.png")
    .addField("Utilisateur banni: ", `${bUser} avec l'ID ${bUser.id}`)
    .addField("Banni par: ", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Banni a partir du salon: ", message.channel)
    .addField("Le: ", message.createdAt.format("dd-MM-Y à HH:mm:SS"))
    .addField("Raison: ", bReason);

    let banChannel = message.guild.channels.find(`name`, "rapports");
    if(!banChannel) return message.channel.send("Je ne peux pas le bannir car le salon #rapports est inexistant, merci de le crée.");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

}


//db!hug <membre>
if (message.content.startsWith(prefix + "hug")){

let toHug = message.mentions.users.first() || client.users.get(args[0]);
 if (!toHug) return message.channel.send("Alors, euh... Je ne sait pas si caliner l'air est la meilleur chose.");
 if (toHug.id == message.author.id) return message.channel.send("Te faire un calin toi même ? Pourquoi pas, c'est toi qui voit.");
 if (toHug.id == client.user.id) return message.reply("me faire a calin a moi et comme faire un calin a quelqu'un qui n'éxiste pas, enfaite...");
var replies = ["https://media1.tenor.com/images/b77fd0cfd95f89f967be0a5ebb3b6c6a/tenor.gif?itemid=7864716", "https://media1.tenor.com/images/b87f8b1e2732c534a00937ffb24baa79/tenor.gif?itemid=9136391", "https://media1.tenor.com/images/40aed63f5bc795ed7a980d0ad5c387f2/tenor.gif?itemid=11098589", "https://media1.tenor.com/images/a2b621c6c769eee24e03b97990c15699/tenor.gif?itemid=4631839", "https://media1.tenor.com/images/bb841fad2c0e549c38d8ae15f4ef1209/tenor.gif?itemid=10307432", "https://media1.tenor.com/images/b0de026a12e20137a654b5e2e65e2aed/tenor.gif?itemid=7552093"]
var result = Math.floor((Math.random() * replies.length));

 let botembed = new Discord.RichEmbed()
 .setDescription(`**${toHug.username}**, tu reçois un gros calin de la part de **${message.author.username}** ! :wink: `)
 .setColor("#ff30ce")
 .setImage(replies[result]);


 return message.channel.send(botembed);

}

//db!avatar
if (message.content.startsWith(prefix + "avatar")){

let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
let avatared = message.mentions.users.first();
if(!avatared) return message.channel.send("Je n'ai pas trouver l'utilisateur :sweat:");
if (user.id == message.author.id) return message.reply("Et bien... voici ton avatar. On va juste dire que tu as perdu l'image sur ton système et que tu souhaite la récup'. Okay ? " + message.author.avatarURL);
	message.channel.send("Ceci est l'avatar de " + avatared + ", magnifique n'est-ce pas ? Ci-dessous un lien pour le lui voler. *Tu vas pas faire ça quand même ?*" + avatared.avatarURL);

}

//db!giverole
if (message.content.startsWith(prefix + "giverole")){

    if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("Nop, tu n'as pas les droits pour cette commande ! *giverole run away* ")
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Je n'ai pas trouver l'utilisateur :sweat:");
    let role = args.slice(1).join(" ");
    if(!role) return message.reply("Il faut préciser le nom d'un rôle, je suis pas devin moi ! :sweat_smile:");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Je n'ai pas trouver le rôle.");

   if(rMember.roles.has(gRole)) return message.channel.send("Il possède déja ce rôle.")
  

  try{

     var giveEmbed = new Discord.RichEmbed()
      .setColor("#00ff00")
      .addField("SUCCÈS !", `Le rôle "${gRole.name}" a bien été donner a **${rMember}**.`);
      rMember.addRole(gRole)

    }catch(e){}
    message.delete();
    return message.channel.send(giveEmbed);

  }


//db!removerole
if (message.content.startsWith(prefix + "removerole")){

    if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("Nop, tu n'as pas les droits pour cette commande ! *removerole run away* ")
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Je n'ai pas trouver l'utilisateur :sweat:");
    let role = args.slice(1).join(" ");
    if(!role) return message.reply("Il faut préciser le nom d'un rôle, je suis pas devin moi ! :sweat_smile:");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Je n'ai pas trouver le rôle.");

if(!rMember.roles.has(gRole.id)) return message.reply("Je ne peux pas retirer un rôle qu'il n'a pas !");
  

 try{
   rMember.removeRole(gRole.id);
   var removeEmbed = new Discord.RichEmbed()
   .setColor("#ff0000")
   .addField("SUCCÈS !", (`Le rôle "${gRole.name}" a bien été retiré a **${rMember}**.`))

 }catch(e){}
  message.delete();
  return message.channel.send(removeEmbed);

}

//db!doggo
if (message.content.startsWith(prefix + "doggo")){
  
 randomPuppy()
.then(url => {

var dogembed = new Discord.RichEmbed()
   .setColor("#ffbb68")
   .setTitle("Ouaf ! :dog:")
   .setImage(url);

  message.channel.send(dogembed)
})
}

//db!eval
if (message.content.startsWith(prefix + "eval")){  
  if (message.author.id == 191272823170269184 || message.author.id == 361225964417449985) {
   
  try {
        const code = args.join(" ");
    if(code.match("process.env.TOKEN")) return message.channel.send(":no_entry_sign: Besoin d'un coup de main ? Tu te crois chez ta maman a tenter de prendre mon token ? :smirk:");
 
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), {code:"xl"});
    
      } catch (err) {
        message.channel.send(`\`ERREUR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }  else {
message.reply("**BINGO !** Tu as trouver une commande réservé a l'owner du bot, bravo ! Mais tu ne peux pas t'en servir. *eval run away.*");
}
}
//db!coins
if (message.content.startsWith(prefix + "coins")){  
  
let ment = message.mentions.users.first();
  if(!ment) {
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }
  
  let uCoins = coins[message.author.id].coins;
  
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor("Porte monnaie de " + message.author.username)
  .setThumbnail("http://www.pngmart.com/files/3/Money-Bag-PNG-File.png")
  .setColor("#2f7c2e")
  .addField("Tu possède: ", uCoins + " pièces ! <:coins:443940640103858176>")
  
message.channel.send(coinEmbed)
  }  

    
  if(!coins[ment.id]){
    coins[ment.id] = {
      coins: 0
    };
  }
  
  let mentuCoins = coins[ment.id].coins;
  
  let mentcoinEmbed = new Discord.RichEmbed()
  .setAuthor("Porte monnaie de " + ment.username)
  .setThumbnail("http://www.pngmart.com/files/3/Money-Bag-PNG-File.png")
  .setColor("#2f7c2e")
  .addField("Tu possède: ", mentuCoins + " pièces ! <:coins:443940640103858176>")
  
message.channel.send(mentcoinEmbed)  

}
  
//db!pay
if (message.content.startsWith(prefix + "pay")) {
 
if(!coins[message.author.id]){
  return message.reply("Tu n'a pas de pièces !")
}
  
  let pUser = message.mentions.users.first() || message.guild.members.get(args[0])
  if (isNaN(args[1])) return message.channel.send("Veuillez mettre un numéro.")
  if (args[1].startsWith("-")) return message.channel.send("Un nombre négatif, Carrement ?")
  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;
    if(sCoins < args[1]) return message.reply("tu n'as pas assez de pièces !");
    if (args[1] <= 0) return message.reply("tu ne peux pas donner aucune pièce :sweat_smile:")
    if (message.author === pUser) return message.reply("tu ne peux pas te donner des pièces a toi même...")
  
  coins[message.author.id]= {
    coins: sCoins - parseInt(args[1])
  
  }; 

       coins[pUser.id] = { 
    coins: pCoins + parseInt(args[1])
  };
  
  message.channel.send(`${pUser} a reçu ${args[1]} pièces par ${message.author} !`)
  
fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if(err) console.log(err)
});
}

//db!rps
  if (message.content.startsWith(prefix + "rps")){
    
    function rand(low, high) {
      return Math.random() * (high + 1 - low) + low | 0;
    }
  const rpsargs = message.content.split(" ").slice(1).join(" ");
    
      //choix
      let computer_choice = rand(0,2);
let user_choice;
if (args[0].toLowerCase() == "pierre") { 
user_choice = 0 

} else
 if (args[0].toLowerCase() == "feuille") {
user_choice = 1

} else 
if (args[0].toLowerCase() == "ciseaux") {
user_choice = 2
} else {
message.channel.send("Alors, il faut choisir entre `feuille`, `ciseaux` ou `pierre` et rien d'autres.")
return;
}
      if (computer_choice == user_choice) {
       message.channel.send("**Égalité !** <:doggy:435146226527240213>")
        
      }
      if (computer_choice == 0 && user_choice == 2) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as perdu !**")
        .setColor("#e22500")
        .addField("Tu as choisi: ", ":scissors: | Ciseaux !")
        .addField("J'ai choisi: ", ":punch: | Pierre !")
        
    message.channel.send(rpsEmbed);
        
      }
      if (computer_choice == 2 && user_choice == 0) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as gagné(e) !**")
        .setColor("#60c435")
        .addField("Tu as choisi: ", ":punch: | Pierre !")
        .addField("J'ai choisi: ", ":scissors: | Ciseaux !")
        
    message.channel.send(rpsEmbed);
      }
      if (computer_choice == 1 && user_choice == 0) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as perdu !**")
        .setColor("#e22500")
        .addField("Tu as choisi: ", ":punch: | Pierre !")
        .addField("J'ai choisi: ", ":page_facing_up: | Feuille !")
        
    message.channel.send(rpsEmbed);
      }
      if (computer_choice == 0 && user_choice == 1) {
          var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as gagné(e)!**")
        .setColor("#60c435")
        .addField("Tu as choisi: ", ":page_facing_up: | Feuille !")
        .addField("J'ai choisi: ", ":punch: | Pierre !")
        
    message.channel.send(rpsEmbed);
        
      }
      if (computer_choice == 1 && user_choice == 2) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as gagné(e)!**")
        .setColor("#60c435")
        .addField("Tu as choisi: ", ":scissors: | Ciseaux !")
        .addField("J'ai choisi: ", ":page_facing_up: | Feuille !")
        
    message.channel.send(rpsEmbed);
        
      }
      if (computer_choice == 2 && user_choice == 1) {
       var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as perdu !**")
        .setColor("#e22500")
        .addField("Tu as choisi: ", ":page_facing_up: | Feuille !")
        .addField("J'ai choisi: ", ":scissors: | Ciseaux !")
        
    message.channel.send(rpsEmbed);
        
      }
  
}

//db!slap
  if (message.content.startsWith(prefix + "slap")){

let toSlap = message.mentions.users.first() || client.users.get(args[0]);
 if (!toSlap) return message.channel.send("**NE FRAPPE PAS L'AIR !! ELLE NE T'A RIEN FAIT !** :angry: ");
 if (toSlap.id == message.author.id) return message.reply("le masochisme est la recherche du plaisir dans la douleur. Cette douleur peut être psychologique (humiliation) ou physique. Le terme Masochisme dérive du nom de l'écrivain allemand Leopold von Sacher-Masoch. *Source: Wikipedia*");
 if (toSlap.id == client.user.id) return message.reply("pourquoi tu veux me taper ? ;-;");
var replies = ["https://media1.tenor.com/images/919b344fbd2afd7dd248174856fb04be/tenor.gif?itemid=5737764",  "https://media1.tenor.com/images/39217af96b95eb7d4e2df39b53b6597f/tenor.gif?itemid=5392081", "https://media1.tenor.com/images/aca6a67d2e00f8ca5a8a5b3083ea8982/tenor.gif?itemid=11586452", "https://media1.tenor.com/images/8de30b9881d46b6750cbd0ef7e0ed546/tenor.gif?itemid=5305087", "https://media1.tenor.com/images/b5e01b67aa9f5f499573f7d6ebe75c18/tenor.gif?itemid=5646326", "https://media1.tenor.com/images/9ea4fb41d066737c0e3f2d626c13f230/tenor.gif?itemid=7355956", "https://media1.tenor.com/images/fb17a25b86d80e55ceb5153f08e79385/tenor.gif?itemid=7919028", "https://media1.tenor.com/images/fb2a19c9b689123e6254ad9ac6719e96/tenor.gif?itemid=4922649", "https://media.tenor.com/images/74b79a7dc96b93b0e47adab94adcf25c/tenor.gif"]
var result = Math.floor((Math.random() * replies.length));

 let botembed = new Discord.RichEmbed()
 .setDescription(`**${toSlap.username}**, tu reçois une claque de la part de **${message.author.username}** !`)
 .setColor("#ff0000")
 .setImage(replies[result]);


 return message.channel.send(botembed);

}  
  
//db!kiss
  if (message.content.startsWith(prefix + "kiss")){

let toKiss = message.mentions.users.first() || client.users.get(args[0]);
 if (!toKiss) return message.channel.send("Embrasser le vent, pourquoi pas...");
 if (toKiss.id == message.author.id) return message.channel.send("Toi. Tu est sûrement célibataire.");
 if (toKiss.id == client.user.id) return message.channel.send("**0w0**");
var replies = ["https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865", "https://media1.tenor.com/images/a1f7d43752168b3c1dbdfb925bda8a33/tenor.gif?itemid=10356314", "https://media1.tenor.com/images/896519dafbd82b9b924b575e3076708d/tenor.gif?itemid=8811697", "https://media1.tenor.com/images/632a3db90c6ecd87f1242605f92120c7/tenor.gif?itemid=5608449", "https://media1.tenor.com/images/0f2aac2ac7d18ee23c82890e617f3ae1/tenor.gif?itemid=7905645", "https://media1.tenor.com/images/356f5b06ce6bdb2c46a8c9c2685e18eb/tenor.gif?itemid=4797281", "https://media1.tenor.com/images/6bf4432cf7abbcce4896275b83b7135c/tenor.gif?itemid=10081644"]
var result = Math.floor((Math.random() * replies.length));

 let botembed = new Discord.RichEmbed()
 .setDescription(`**${toKiss.username}**, tu reçois un bisous de la part de **${message.author.username}** !`)
 .setColor("#ffb5f0")
 .setImage(replies[result]);


 return message.channel.send(botembed);

}   
    
//db!bite
  if (message.content.startsWith(prefix + "bite")){

let toBite = message.mentions.users.first() || client.users.get(args[0]);
 if (!toBite) return message.channel.send("Tu veux mordre l'air ? Je te souhaite bonne chance.");
 if (toBite.id == message.author.id) return message.channel.send("Avec toi, l'expression mange ta main et garde l'autre pour demain prend tout son sens...");
 if (toBite.id == client.user.id) return message.channel.send("Euh... Ouais, nan.");
var replies = ["https://media1.tenor.com/images/c22a247affcf4cd02c7d17f5a432cd95/tenor.gif?itemid=8259627", "https://media1.tenor.com/images/2440ac6ca623910a258b8616704850f0/tenor.gif?itemid=7922565", "https://media1.tenor.com/images/8a853337af58ee7c16d05d6e7c5ce31d/tenor.gif?itemid=4966068", "https://media1.tenor.com/images/83271613ed73fd70f6c513995d7d6cfa/tenor.gif?itemid=4915753", "https://media1.tenor.com/images/959e4c3712933367c0a553d7a124c925/tenor.gif?itemid=11546989", "https://media1.tenor.com/images/6b42070f19e228d7a4ed76d4b35672cd/tenor.gif?itemid=9051585", "https://media1.tenor.com/images/3922be70bacbd804ee95792a4bd6bd61/tenor.gif?itemid=7748718"]
var result = Math.floor((Math.random() * replies.length));

 let botembed = new Discord.RichEmbed()
 .setDescription(`**${toBite.username}**, tu te fait mordre part **${message.author.username}** !`)
 .setColor("#ff7070")
 .setImage(replies[result]);


 return message.channel.send(botembed);

}   

//db!pileouface
  if (message.content.startsWith(prefix + "pileouface")) {
let p = "Et c'est pile !",
    f = "Et c'est face !" 
    var x = getRandomInt(0, 8)
    if (x < 4) {
message.reply(p)
} else {
message.reply(f)
}
}
 
//db!ui  
  if (message.content.startsWith(prefix + "ui")) {
    let ment = message.mentions.members.first();
    let userrrrrrr = message.mentions.users.first()
    let status;
    let mentstatus;

    if(message.author.presence.status === "online") {
       status = "<:online:313956277808005120>En ligne"
     } else
     if(message.author.presence.status === "idle") {
       status = "<:away:313956277220802560>Absent"
     } else
     if(message.author.presence.status === "dnd") {
       status = "<:dnd:313956276893646850>Ne pas déranger"
     } else
     if(message.author.presence.status === "offline") {
       status = "<:offline:313956277237710868>Hors ligne"
     } else
     if(message.author.presence.status === "streaming") {
       status = "<:streaming:313956277132853248>En streaming<:invisible:313956277107556352>"
     } else
     if(message.author.presence.status === "invisible") {
       status = "<:invisible:313956277107556352>Invisible 👀"
     }
    
    if(!ment) {
    let nomentembed = new Discord.RichEmbed()
    .addField("Ton Tag:", message.author.tag, true)
		.addField("Ton ID", message.author.id, true)
		.addField("Statut ", status, true)
		.addField("Sur Discord depuis", `${message.author.createdAt.format("dd-MM-Y à HH:mm:SS")}`, true)
    .addField("Jeu en cours:", `${message.author.presence.game ? message.author.presence.game.name : 'Aucun'}`, true)
    .addField("Ton meilleur role", message.member.highestRole.name, true)
    .setThumbnail(message.author.avatarURL)
    .setColor('RANDOM')
		message.channel.send(nomentembed)
  }
    if(ment) {
     if(ment.presence.status === "online") {                          
       mentstatus = "<:online:313956277808005120>En ligne"
     } else
     if(ment.presence.status === "idle") {
       mentstatus = "<:away:313956277220802560>Absent"
     } else
     if(ment.presence.status === "dnd") {
       mentstatus = "<:dnd:313956276893646850>Ne pas déranger"
     } else
     if(ment.presence.status === "offline") {
       mentstatus = "<:offline:313956277237710868>Hors ligne"
     } else
     if(ment.presence.status === "streaming") {
       status = "<:streaming:313956277132853248> En streaming<:invisible:313956277107556352>"
     } else
     if(ment.presence.status === "invisible") {
       status = "<:invisible:313956277107556352> Invisible 👀"
     }
    }
          
		let embed = new Discord.RichEmbed()
		.addField("Tag:", userrrrrrr.tag, true)
		.addField("ID:", ment.id, true)
		.addField("Statut :", mentstatus, true)
		.addField("Sur discord depuis le:", `${userrrrrrr.createdAt.format("dd-MM-Y à HH:mm:SS")}`, true)
    .addField("Jeu en cours:", `${ment.presence.game ? ment.presence.game.name : 'Aucun'}`, true)
    .addField("Son meilleur role:", ment.highestRole.name, true)
    .setThumbnail(userrrrrrr.avatarURL)
    .setColor('RANDOM')
		message.channel.send(embed)
    }

//db!$rps
   if (message.content.startsWith(prefix + "$rps")){
    
    function rand(low, high) {
      return Math.random() * (high + 1 - low) + low | 0;
    }
  const rpsargs = message.content.split(" ").slice(1).join(" ");
     
     if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }
  
  let uCoins = coins[message.author.id].coins;
    
      let computer_choice = rand(0,2);
let user_choice;
if (args[0] == "pierre") {
user_choice = 0 

} else
 if (args[0] == "feuille") {
user_choice = 1

} else 
if (args[0] == "ciseaux") {
user_choice = 2
} else {
message.channel.send("Alors, il faut choisir entre `feuille`, `ciseaux` ou `pierre` et rien d'autres.")
return;
}
      if (computer_choice == user_choice) {
       message.channel.send("**Égalité !** <:doggy:435146226527240213>")
        
      }
      if (computer_choice == 0 && user_choice == 2) {
         var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as perdu 10 pièces!**")
        .setColor("#e22500")
        .addField("Tu as choisi: ", ":scissors: | Ciseaux !")
        .addField("J'ai choisi: ", ":punch: | Pierre !")
        .addField("Ton porte monnaie actuel: ", uCoins - 10 + " pièces ! <:coins:443940640103858176>")
        
    message.channel.send(rpsEmbed);
    
        coins[message.author.id] = {
    coins: coins[message.author.id].coins - 10
      
        }}
      if (computer_choice == 2 && user_choice == 0) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as gagné(e) 10 pièces !**")
        .setColor("#60c435")
        .addField("Tu as choisi: ", ":punch: | Pierre !")
        .addField("J'ai choisi: ", ":scissors: | Ciseaux !")
        .addField("Ton porte monnaie actuel: ", uCoins + 10 + " pièces ! <:coins:443940640103858176>")
        
    message.channel.send(rpsEmbed);
        coins[message.author.id] = {
    coins: coins[message.author.id].coins + 10
          
      }}
      if (computer_choice == 1 && user_choice == 0) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as perdu 10 pièces !**")
        .setColor("#e22500")
        .addField("Tu as choisi: ", ":punch: | Pierre !")
        .addField("J'ai choisi: ", ":page_facing_up: | Feuille !")
        .addField("Ton porte monnaie actuel: ", uCoins - 10 + " pièces ! <:coins:443940640103858176>")
        
    message.channel.send(rpsEmbed);
        coins[message.author.id] = {
    coins: coins[message.author.id].coins - 10
        
      }}
      if (computer_choice == 0 && user_choice == 1) {
          var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as gagné(e) 10 pièces !**")
        .setColor("#60c435")
        .addField("Tu as choisi: ", ":page_facing_up: | Feuille !")
        .addField("J'ai choisi: ", ":punch: | Pierre !")
        .addField("Ton porte monnaie actuel: ", uCoins + 10 + " pièces ! <:coins:443940640103858176>")
        
    message.channel.send(rpsEmbed);
        coins[message.author.id] = {
    coins: coins[message.author.id].coins + 10
      }}
      if (computer_choice == 1 && user_choice == 2) {
        var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as gagné(e) 10 pièces !**")
        .setColor("#60c435")
        .addField("Tu as choisi: ", ":scissors: | Ciseaux !")
        .addField("J'ai choisi: ", ":page_facing_up: | Feuille !")
        .addField("Ton porte monnaie actuel: ", uCoins + 10 + " pièces ! <:coins:443940640103858176>")
        
    message.channel.send(rpsEmbed);
        coins[message.author.id] = {
    coins: coins[message.author.id].coins + 10
        
      }}
      if (computer_choice == 2 && user_choice == 1) {
       var rpsEmbed = new Discord.RichEmbed()
        .setTitle("**Tu as perdu 10 pièces !**")
        .setColor("#e22500")
        .addField("Tu as choisi: ", ":page_facing_up: | Feuille !")
        .addField("J'ai choisi: ", ":scissors: | Ciseaux !")
        .addField("Ton porte monnaie actuel: ", uCoins - 10 + " pièces ! <:coins:443940640103858176>")
        
    message.channel.send(rpsEmbed);
        coins[message.author.id] = {
    coins: coins[message.author.id].coins - 10
        
        }}
  
}

//db!cat
  
if (message.content.startsWith(prefix + "cat")){

  var replies = ["https://purr.objects-us-west-1.dream.io/i/c9pLd.jpg","https://purr.objects-us-west-1.dream.io/i/YGb6f.jpg","https://purr.objects-us-west-1.dream.io/i/4VewR.jpg","https://purr.objects-us-west-1.dream.io/i/CnCkq.jpg","https://purr.objects-us-west-1.dream.io/i/unnamed-1.jpg","https://purr.objects-us-west-1.dream.io/i/IekT6.jpg","http://random.cat/view/1394","https://purr.objects-us-west-1.dream.io/i/dLIZu.jpg","https://purr.objects-us-west-1.dream.io/i/NaJaQ.jpg","https://purr.objects-us-west-1.dream.io/i/44jtgl.jpg","https://purr.objects-us-west-1.dream.io/i/img_20140920_145408.jpg","http://img-comment-fun.9cache.com/media/c81c59c9145641080812687141_700wa_0.gif", "https://reseauinternational.net/wp-content/uploads/2015/10/gifa-cat-surprised.gif", "http://img4.hostingpics.net/pics/113686catmousetabletpounce.gif", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vslRfH69TDhw9to9dtiBi9fwtiOwjHJ7HRSvi7wYSCvqP6rl","https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Ny85NTkvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzYzOTcxNjY1LmpwZw=="," http://www.ordanburdansurdan.com/wp-content/uploads/2017/06/oxgkvrvnd5o-1.jpg", "https://ichef.bbci.co.uk/news/660/cpsprodpb/71E1/production/_99735192_gettyimages-459467912.jpg", "https://cms.kienthuc.net.vn/zoom/500/Uploaded/ctvkhoahoc/2017_10_20/10_NMHD.jpg", "http://i0.kym-cdn.com/photos/images/facebook/000/012/445/lime-cat.jpg", "https://i2-prod.mirror.co.uk/incoming/article11812659.ece/ALTERNATES/s1200/The-Feline-World-Gathers-For-The-Supreme-Cat-Show-2017.jpg", "https://mymodernmet.com/wp/wp-content/uploads/2017/11/minimalist-cat-art-subreddit-10.jpg", "https://metrouk2.files.wordpress.com/2017/11/capture16.png?w=748&h=706&crop=1"]

var result = Math.floor((Math.random() * replies.length));
  
  let botembed = new Discord.RichEmbed()
 .setDescription(`Miaou ! :cat:`)
 .setColor("#ff7070")
 .setImage(replies[result]);


 return message.channel.send(botembed);

}
  
//db!oazo
  if (message.content.startsWith(prefix + "oazo")){

  var replies = ["https://pcenerelli.files.wordpress.com/2012/09/red-winged_blackbird-male_2-12-05-12-web.jpg","http://4.bp.blogspot.com/-SFSXd_pW6Ws/TfqLE45M5WI/AAAAAAAABLk/NwUN9qYMn7c/s400/birds_with_arms5.jpg","https://4.bp.blogspot.com/-nJEMY6QveKA/V6Ebd7DfHLI/AAAAAAAAFHk/wWLcWeo0ILw9xawqhwy3728djyhgFutzwCLcB/s1600/American%2BPygmy%2BKingfisher.jpg","https://i.pinimg.com/736x/b5/eb/86/b5eb863e6d0adcfbc047d8e771387b56.jpg","https://i1.wp.com/www.windycityparrot.com/images/assets/images/products/graphics/00000001/custom_budgies_many_stick_549w.jpg?w=840","https://i.ytimg.com/vi/KwORJU3Czws/maxresdefault.jpg","http://www.newhdwallpaper.in/wp-content/uploads/2014/09/Flying-bird-beautiful-wallpaper.jpg","http://feedinspiration.com/wp-content/uploads/2015/04/Some-Random-Bird.jpg","https://randomfunnypicture.com/wp-content/uploads/2011/06/bread-one-pigeon-zero.png",]

var result = Math.floor((Math.random() * replies.length));
  
  let oazoEmbed = new Discord.RichEmbed()
 .setDescription(`Cui cui ! :bird:`)
 .setColor("#38c600")
 .setImage(replies[result]);


 return message.channel.send(oazoEmbed);
  
  }
  
//db!level
  if (message.content.startsWith(prefix + "level")){
    
    if(!xp[message.author.id]){
     xp[message.author.id] = {
       xp: 0,
       level: 1
    };
  }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = curlvl * 500;
    let difference = nxtLvlXp - curxp;
    
    
    let ment = message.mentions.users.first();
  if(!ment) {
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Niveau:", curlvl, true)
    .addField("XP:", curxp, true)
    .setFooter(`Il te reste ${difference} XP avant de passer au niveau ${curlvl + 1} !`, "https://cdn4.iconfinder.com/data/icons/arrows-2-9/32/double_arrow_up-256.png");
    
    message.channel.send(lvlEmbed)
  }
    let mentcurxp = xp[ment.id].xp;
    let mentcurlvl = xp[ment.id].level;
    let mentnxtLvlXp = curlvl * 500;
    let mentdifference = nxtLvlXp - curxp;
    
    let lvlEmbed = new Discord.RichEmbed()
    
    .setAuthor(ment.username)
    .setColor("RANDOM")
    .setThumbnail(ment.avatarURL)
    .addField("Niveau:", mentcurlvl, true)
    .addField("XP:", mentcurxp, true)
    
    message.channel.send(lvlEmbed)
  }
  
  //db!poasson
  
  if (message.content.startsWith(prefix + "poasson")){

  var replies = ["https://thumbs-prod.si-cdn.com/c86on9yeBmn5_G7b4ng_ZQWjiII=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/d6/93/d6939718-4e41-44a8-a8f3-d13648d2bcd0/c3npbx.jpg","https://d2kwjcq8j5htsz.cloudfront.net/1970/01/30153329/clownfish.jpg","https://blog.auntybinnaz.com/wp-content/uploads/fish.jpg","https://pbs.twimg.com/profile_images/448238813773430784/w4lr82sW.jpeg","http://a57.foxnews.com/images.foxnews.com/content/fox-news/us/2017/10/23/berkeley-city-council-bans-use-fish-as-prizes-at-carnivals/_jcr_content/par/featured_image/media-0.img.jpg/931/524/1508750077165.jpg?ve=1&tl=1&text=big-top-image","https://www.worldofbanter.com/wp-content/uploads/2017/06/funny-fish-photo-1.jpg","http://www.funnyjunksite.com/pictures/wp-content/uploads/2015/04/Funny-Man-Fish-Image.jpg","https://farm1.staticflickr.com/151/430446668_6ee8c2dc17_b.jpg"]

var result = Math.floor((Math.random() * replies.length));
  
  let botembed = new Discord.RichEmbed()
 .setDescription(`Bl bl bl ! :fish: `)
 .setColor("#0095c6")
 .setImage(replies[result]);


 return message.channel.send(botembed);

}
  
//db!buy
  ///embed liste
  if (message.content.startsWith(prefix + "buy")){
     let categories = []; 
     if (!args.join(" ")) { 

        for (var i in items) { 
        if (!categories.includes(items[i].type)) {
           categories.push(items[i].type)
         }
        }
              const embed = new Discord.RichEmbed()
                .setDescription(`Items disponible à l'achat`)
                .setColor("RANDOM")

              for (var i = 0; i < categories.length; i++) { 
              var tempDesc = '';
              for (var c in items) { 
              if (categories[i] === items[c].type) {

                 tempDesc += `**${items[c].name}** - ${items[c].price} pieces - ${items[c].desc}\n`;

         }
        }
            embed.addField(categories[i], tempDesc);

        }

            return message.channel.send({
                embed
        }); 
       }

         

        
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';

        for (var i in items) { 
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) {
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;
            }
        }

        ///réponses
        if (itemName === '') {
            return message.channel.send(`L'item **${args.join(" ").trim()}** n'a pas été trouver.`)
        }

        
        economy.fetchBalance(message.author.id + message.guild.id).then((i) => { 
            if (i.coins <= itemPrice) { 
                
                return message.channel.send(`Tu n'as pas assez de pièces pour acheter cela.`);
            }
        
          
          
            economy.updateBalance(message.author.id + message.guild.id, parseInt(`-${itemPrice}`)).then((i) => {

                message.channel.send('**Tu as acheter ' + itemName + '!**');
              
              fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)

            ///items en vente    
                let memberrole = message.member;
                if (itemName === 'rouge') {
                  let role = message.guild.roles.find("name", "rouge");
                  
                  if (!role){

                  message.guild.createRole({
                     name: "rouge",
                     color: "#ff0000",
                     permissions:[]
                     })
                  }
                  memberrole.addRole(role).catch(console.error);
                }
              if (itemName === 'bleu') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "bleu"));
                  if (!itemName){
                  try{
                   itemName = message.guild.createRole({
                     name: "bleu",
                     color: "#0099ff",
                     permissions:[]
                     })                
                      message.guild.channels.ea()
                  }catch(e){
                     console.log(e.stack);
                  }
                }}
            if (itemName === 'blurple') {
                    message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", "blurple"));
                  if (!itemName){
                  try{
                   itemName = message.guild.createRole({
                     name: "blurple",
                     color: "#7289DA",
                     permissions:[]
                     })                                  
                      message.guild.channels
                  }catch(e){
                     console.log(e.stack);
                  }
                }}
            
            })
          })});
           }
       
//db!mute <membre> s/m/h/d
if (message.content.startsWith(prefix + "mute")){
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Non, tu ne peux pas ! *mute run away*");
  
  if (isNaN(args[1])){
    return message.channel.send("Non, il faut des chiffres et uniquement des chiffres.")
  }
  //vvvv Création role vvvvv
     let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
     if(!tomute) return message.reply("Je n'ai pas trouver l'utilisateur :sweat:");
     if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("je ne peux pas le mute, il a la permission de **gérer les messages**, m'interdisant donc de le mute !");
     let muterole = message.guild.roles.find(`name`, "mute");
     if(!muterole){
   try{
     message.channel.send('**Rôle "mute" inexistant. Création du rôle...**')
     muterole = await message.guild.createRole({
      name: "mute",
      color: "#464646",
      permissions: []
      })
   message.guild.channels.forEach(async (channel, id) => {
    await channel.overwritePermissions(muterole, {
       SEND_MESSAGES: false,
       ADD_REACTIONS: false
      });
     });
     message.channel.send('**Rôle "mute" crée avec succès !**')
    }catch(e){
   console.log(e.stack);
   }
  }
  
  
//^^^^ Création role ^^^^
 
 let mutetime = args[1];
 mutetime = mutetime.replace('s', 1000)
 if(!mutetime) return message.reply("il faut que tu donne un temps ! *1000ms = 1s; 60000 = 1min; 600000 = 10min; 3600000 = 1h*");
  
   
   await(tomute.addRole(muterole.id));
   message.channel.send(`<@${tomute.id}> a été mute pendant ${ms(ms(mutetime))}`);
   
   setTimeout(function(){
     tomute.removeRole(muterole.id);
     message.channel.send(`<@${tomute.id}> n'est plus mute !`);
   }, ms(mutetime));
  
  
 
 }
  
 //db!memes
if (message.content.startsWith(prefix + "rmemes")){

  /*let{body} = await superagent
  .get(`https://api-to.get-a.life/meme`);

  let me = new Discord.RichEmbed()
  .setTitle('"' + body.text + '"')
  .setColor("RANDOM")
  .setImage(body.url)
  .setFooter("Certaines images peuvent ne pas s'afficher, désolé.");

  message.channel.send(me);
  
  }*/
  
  meme(function(data) {
  const embed = new Discord.RichEmbed()
  .setTitle(data.title[0])
  .setColor("RANDOM")
  .setImage(data.url[0])
  message.channel.send({embed});
  })
};

  
  //db!guildlist
if (message.content.startsWith(prefix + "guildlist")){

if (message.author.id == 191272823170269184) {
   
  let guildslist= ""
client.guilds.forEach(g => guildslist =  guildslist + "-> " + g.name +" : " +  g.members.size  + " membres  (" + g.id + ") | Rejoin le " + g.joinedAt.format("dd-MM-Y à HH:mm:SS") + "\n")
message.channel.send(guildslist)
}else
  message.channel.send("Non tu ne peux pas ! Owner seulement !")
} 
  
 
 //db!
  
  ////TEMPORAIRE
// db!maths
if (message.content.startsWith(prefix + "maths")) {
if (message.channel.id != '452960073367552001') return message.channel.send("Cette fonction est uniquement disponible dans ma classe :(")
let first = getRandomInt(1, 200);
let second = getRandomInt(1, 200);
let toWin = getRandomInt(10, 20);
let mathValue = getRandomInt(0,150);
let answer;
let operation;
if (mathValue < 50) {
   answer = first + second
  operation = "+"
} else 
if (mathValue < 100) {
first -= 50
second -= 50
   answer = first * second
  operation = "x"
} else {
    answer = first - second
  operation = "-"
}
let emit = client.channels.get('452961741605699594')
message.reply(`faisons un petit calcul de maths ! Réponds a cette question **-->** ${first} ${operation} ${second} ❓`)
.then(() => {
  message.channel.awaitMessages(response => response.author.id === message.author.id, {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
if (collected.first().content == answer) {
      message.channel.send(`C'est exact :)`);
emit.send("ziwin aBr5eOsM " + message.author.id + " " + answer )
message.channel.send("<:Baldiconten:452980705761296385> | Tu gagne " + toWin + " pieces avec moi ! **HERE A SHINY QUARTER !!**")
      coins[message.author.id].coins += toWin

} else {
  message.channel.send("...")
  message.channel.send("<:Baldipaconten:452980706100903937> | Tu perd " + toWin + " pieces... c'est bien merité. **DETENTION FOR YOU !**")
  emit.send("ziwin rTsOiSuF " + message.author.id + " " + answer )
      coins[message.author.id].coins -= toWin


}
    })
    .catch(() => {
      message.reply('aucune reponse...?');

  emit.send("ziwin rTsOiSuF " + message.author.id + " " + answer )
      coins[message.author.id].coins -= toWin
    });
});
fs.writeFile("./coins.json", JSON.stringify(coins))
}


//db!ange

  if (message.content.startsWith(prefix + "ange")){
    console.log("commande")
      let angeid = message.member;
     
  let demonrole = ("451420902857375745");

  if(angeid.roles.has(demonrole)) {
     message.reply("tu est déjà un démon !")
    return;
  }else {
    if(!angeid.roles.has(demonrole)) {
    
     console.log("attribution role")
    let angerole = message.guild.roles.get("451463313302224916");
    console.log("attribution role2");       
    
    if(angeid.roles.has(angerole)) {
      message.reply("Tu as deja ce role !");
      return;
    } else {
      if (!angeid.roles.has(angerole)){
    
    
    console.log("role attribué")
   angeid.addRole(angerole).catch(error => message.channel.send(error))
   message.channel.send(`<@${angeid.id}> à rejoint les anges !`);
   
      }}}}
    
 }
  //db!leaveange
   if (message.content.startsWith(prefix + "leaveange")){
    console.log("commande")
      
   let angeid = message.member;
    
    
     console.log("attribution role")
    let angerole = message.guild.roles.get("451463313302224916");
    console.log("attribution role2");            
    
    if(angeid.roles.has(angerole)) {
      message.reply("tu n'as pas ce role !");
      return;
    } else {
      if (!angeid.roles.has(angerole)){
    
    
    console.log("role attribué")
   angeid.removeRole(angerole).catch(error => message.channel.send(error))
   message.channel.send(`<@${angeid.id}> à quitté les anges !`);
   
      }}
    
 }
  
  /////db!quiz
 if (message.content.startsWith(prefix + "quiz")) {
if (message.channel.id != '452960073367552001') return message.channel.send("Commande temporairement desactivée.")
let str =  message.guild.members.random(1)[0].user 
let randmem = str.username.substring(0, 2)
let ind = (str.bot ? "C'est un bot" : "ce n'est pas un bot");
let animals = [{animal : "Cat", trad : "Chat"}, {animal : "Dog", trad : "Chien"}, {animal : "Bird", trad : "Oiseau"}, {animal : "Lion", trad : "Lion"}]
let anilength = getRandomInt(0, animals.length)
let co = coins[message.author.id].coins
let caps = [{flag : "Maldives", cap : "Malé"},{flag : "Togo", cap: "Lomé"},{flag : "Guinée equatoriale", cap : "Malabo"},{flag : "Koweit", cap : "Koweït"},{flag : "Espagne", cap : "Madrid"}]
let capslength = getRandomInt(0, caps.length)
let own = client.users.get(message.guild.owner.id).username
let questions = [
  {
    question : "Tu t'appelle comment ?",
    answer : message.author.username,
    duration : 30000
  },
  {
    question : "Quel est le nom du createur du jeu Baldi's basic ?",
    answer : "Micah McGonigal",
    duration : 30000
  },
  {
    question : "Qui est le robot qui te vole tes données AkA le createur de FaceBook ?",
    answer : "Mark Zuckerberg",
    duration : 15000
  },
  {
    question : "Qui est mon createur ?",
    answer : "Darky",
    duration : 10000
  },
  {
    question : "Que veut dire " + animals[anilength].animal,
    answer : animals[anilength].trad,
    duration : 15000
  },
  {
    question : "Ta maman c'est un dinosaure ?",
    answer : "Ui",
    duration : 10000
  },
  {
    question : "J'ai un instrument très long que je tape souvent dans ma main. C'est quoi?",
    answer : "La règle",
    duration : 20000
  },
  {
    question : "Son nom commence avec " + randmem + " et " + ind,
    answer : str.username,
    duration : 20000
  },
  {
    question : "Je suis sur combien de serveur *(Ps : regarder mon statut = tapette)*",
    answer : `${client.guilds.size}`,
    duration : 15000
  },
  {
    question : "Qui est le createur de ce serveur ?",
    answer : own,
    duration : 15000
  },
  {
    question : "Tu possede combien de coins ?",
    answer : `${co}`,
    duration : 20000
  },
  {
    question : "Quelle est la capitale du " + caps[capslength].flag,
    answer : caps[capslength].cap,
    duration : 20000
  },
  {
    question : "Parmi les termes suivants, lequel est féminin ? \nEntête \nÉquivoque \nEntracte \nEmblème",
    answer : "Équivoque",
    duration : 15000
  },
  {
    question : "Qu'es qui est jaune, et qui attend ?",
    answer : "Jonathan",
    duration : 5000
  }, 
  {
    question : "Qui vit dans un ananas sous la mer ?",
    answer : "Ta merenculé",
    duration : 2000000
  }
]
let num = getRandomInt(0, questions.length)
let question = questions[num].question
let answer = questions[num].answer
let toWin = getRandomInt(1, 500)


let emit = client.channels.get('452961741605699594')

message.reply(`petite question H̺̏ͪȃ̷̚r͔͋̍d̛͊ͩc͈̙͢õ͖̒r҈̲͊e̡͗͂! Réponds a cette question **--> **${question} ❓`)
.then(() => {
  message.channel.awaitMessages(response => response.author.id === message.author.id, {
    max: 1,
    time: questions[num].duration,
    errors: ['time'],
  })
  .then((collected) => {
if (collected.first().content.toLowerCase() == answer.toLowerCase()) {
      message.channel.send(`C'est exact :)`);

emit.send("ziwin aBr5eOsM " + message.author.id + " " + answer )
message.channel.send("<:Baldiconten:452980705761296385> | Tu gagne " + toWin + " pieces avec moi ! **HERE A SHINY QUARTER !!**")
      coins[message.author.id].coins += toWin

} else {
  message.channel.send("...")
  message.channel.send("<:Baldipaconten:452980706100903937> | Tu perd " + toWin + " pieces... c'est bien merité. **DETENTION FOR YOU !**")
  emit.send("ziwin rTsOiSuF " + message.author.id + " " + answer )
      coins[message.author.id].coins -= toWin


}
    })
    .catch((err) => {
console.log(err)
      message.reply('aucune reponse...? Tu perds quand même ' + toWin + ' coins');
  emit.send("ziwin rTsOiSuF " + message.author.id + " " + answer )
      coins[message.author.id].coins -= toWin
    });
});
fs.writeFile("./coins.json", JSON.stringify(coins))
}
 


//db!demon
  if (message.content.startsWith(prefix + "demon")){
    console.log("commande")
      let demonid = message.member;

    let angerole = ("451463313302224916");
    
    
  if(demonid.roles.has(angerole)) {
     message.reply("tu est déjà un ange !")
    return;
  }else {
    if(!demonid.roles.has(angerole)) {
    
     console.log("attribution role")
    let demonrole = message.guild.roles.get("451420902857375745");
    console.log("attribution role2");
    
    if(demonid.roles.has(demonrole)) {
      message.reply("Tu as deja ce role !");
      return;
    } else {
      if (!demonid.roles.has(demonrole)){
    
    
    console.log("role attribué")
   demonid.addRole(demonrole).catch(error => message.channel.send(error))
   message.channel.send(`<@${demonid.id}> à rejoint les démons !`);
   
      }}}}
    
 }
 
  //db!leavedemon
 if (message.content.startsWith(prefix + "leavedemon")){
    console.log("commande")
      
   let demonid = message.member;
    
    
     console.log("attribution role")
    let demonrole = message.guild.roles.get("451420902857375745");
    console.log("attribution role2");
    
    if(demonid.roles.has(demonrole)) {
      message.reply("tu n'as pas ce role !");
      return;
    } else {
      if (!demonid.roles.has(demonrole)){
    
    
    console.log("role attribué")
   demonid.removeRole(demonrole).catch(error => message.channel.send(error))
   message.channel.send(`<@${demonid.id}> à quitté les démons !`);
   
      }}
    
 }


  
//////////////////////////////////////////////// 
  talkedRecently.push(message.author.id);
  setTimeout(() => {
    talkedRecently.splice(talkedRecently.indexOf(message.author.id), 1);
  }, 2000);
////////////////////////////////////////////////

  ///Partie bot musique
 const youtube = new YouTube(process.env.ytTOKEN);
 const queue = new Discord.RichEmbed();
  
  
  var searchString = args.slice(1).join(' ');
	var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	var serverQueue = queue.get(message.guild.id); /// Essayer de trouver la raison de l'erreur "UnhandledPromiseRejectionWarning: TypeError: queue.get is not a function" (Si quelqu'un passe part la, et trouve la soluce, putain de bordel... merci bcp)
    if (args[0].toLowerCase()) {
  
    
      //db!play
  if (message.content.startsWith(prefix + "play")){
    var voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('Tu doit te trouver dans un salon vocal !');
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('Je ne peux pas me connecter a ce salon, merci de vérifier les permissions !');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('Je ne peux pas parler dans ce salon, merci de vérifier les permissions !');
		}
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); 
				await handleVideo(video2, message, voiceChannel, true); 
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** a été ajouter a la file !`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					var index = 0;
					message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('Valeur non ou non valide entrée, annulation de la sélection vidéo.');
					}
					var videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 Je n\'ai rien trouver !');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
         }}
  
  //db!skip
      if (message.content.startsWith(prefix + "skip")){
		if (!message.member.voiceChannel) return message.channel.send('Tu ne te trouve pas dans un salon vocal.');
		if (!serverQueue) return message.channel.send('Il n\'y a rien a passer ¯\_(ツ)_/¯');
		serverQueue.connection.dispatcher.end(':track_next: La musique a bien été passer !');
		return undefined;
      }
  //db!stop
      if (message.content.startsWith(prefix + "stop")){
		if (!message.member.voiceChannel) return message.channel.send('Tu ne te trouve pas dans un salon vocal.');
		if (!serverQueue) return message.channel.send('Il n\'y a rien a arrêter !');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(':stop_button: Musique arrêter !');
		return undefined;
      }
  //db!volume
      if (message.content.startsWith(prefix + "volume")){
		if (!message.member.voiceChannel) return message.channel.send('Tu ne te trouve pas dans un salon vocal.');
		if (!serverQueue) return message.channel.send('Il n\'y a pas de musique actuellement. :thinking:');
		if (!args[1]) return message.channel.send(`Le volume actuel est: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return message.channel.send(`J'ai mis le volume a: **${args[1]}**`);
      }
  //db!song
      if (message.content.startsWith(prefix + "song")){
		if (!serverQueue) return message.channel.send('Il n\'y a pas de musique actuellement. :thinking:');
		return message.channel.send(`🎶 Joue en se moment: **${serverQueue.songs[0].title}**`);
      }
  //db!queue
      if (message.content.startsWith(prefix + "queue")){
		if (!serverQueue) return message.channel.send('Il n\'y a pas de musique actuellement. :thinking:');
		return message.channel.send(`
__**Playlist:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Joue en se moment:** ${serverQueue.songs[0].title}
		`);
      }
  //db!pause
      if (message.content.startsWith(prefix + "pause")){
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ C\'est en pause !');
		}
		return message.channel.send('TIl n\'y a pas de musique actuellement. :thinking:');
      }
  //db!resume
      if (message.content.startsWith(prefix + "resume")){
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Et c\'est reparti !');
		}
		return message.channel.send('Il n\'y a pas de musique actuellement. :thinking:');
	

	return undefined;
      }

async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Je n'arrive pas a rejoindre le salon: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Je n'arrive pas a rejoindre le salon: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** a été ajouter a la playlist !`);
	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
      message.channel.send('``La playlist est terminé !``');
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Joue actuellement: **${song.title}**`);
  }
                                 
  

  
///Fin partie bot musique
  
//////////////////////////////////////////////////////////////////////////////////////////////
});

client.login(process.env.TOKEN)
