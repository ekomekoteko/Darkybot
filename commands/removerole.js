const Discord = require("discord.js");
let talkedRecently = [];


module.exports.run = async (client, message, args) => {
  
  if (talkedRecently.indexOf(message.author.id) !== -1) {
      message.delete();
            message.channel.send(":clock10: **HÉ HO !** Patiente deux secondes entres chaques commandes " + message.author + " !");
       
    }

let messageArray = message.content.split(" ")



    if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("Nop, tu n'as pas les droits pour cette commande ! *removerole run away* ")
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Je n'ai pas trouver l'utilisateur :sweat:");
    let role = args.slice(1).join(" ").toLowerCase();
    if(!role) return message.reply("Il faut préciser le nom d'un rôle, je suis pas devin moi ! :sweat_smile:");
    let gRole = message.guild.roles.find(r=>r.name.toLowerCase() == role);
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
  
  talkedRecently.push(message.author.id);
  setTimeout(() => {
    talkedRecently.splice(talkedRecently.indexOf(message.author.id), 1);
  }, 2000);

}



module.exports.help = {
    name: "removerole"
}