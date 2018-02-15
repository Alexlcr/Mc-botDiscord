const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Blague = require('./commands/blague')
const Role = require('./commands/role')
const Whatis = require('./commands/whatis')



bot.on('ready', function() {
	console.log('Bot connecté')
	bot.user.setGame('Gérer le serveur').catch(console.error)
})


//guildMemebrAdd
bot.on('guildMemberAdd', function(member) {

	member.guild.channels.find("name", "general").sendMessage(member.toString() + ' Bienvenue dans le serveur ' + '**' + member.guild.name + '**' + ' utilisez la commande d?all_roles pour les roles que vous souhaitez vous ajouter, *');

	member.addRole(member.guild.roles.find("name", "Joueur"));

})



//Message
bot.on('message', function(message) {

	Google.parse(message)

	Blague.parse(message)

	Role.parse(message)

	Whatis.parse(message)

	if(message.content === 'd?stats') {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField('Statistiques du serveur NSDAP', 'Il y a actuellement ' + '**' + message.guild.channels.size + '**' +' channels dans ce serveur \nIl y a exactement ' + '**' + message.guild.members.size + '**' + ' membres dans ce serveur\nLe serveur a été crée le: ' + '**' + message.guild.createdAt + '** \nJe suis present dans ' + '**' + bot.guilds.size + '**' + ' serveurs')
		message.channel.send(embed).catch(console.error)
	
	}  else if(message.content === 'd?all_roles') {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField("Tous les roles disponibles", "-Redstoner ->  d?role -RedS\n-Builder ->      d?role -Builder\n-Cultivateur ->           d?role -Cultivateur\n-Mineur ->     d?role -Mineur")
		message.channel.send(embed).catch(console.error)

	} else if(message.content.startsWith('d?game')) {

		let randnum_game = Math.floor(Math.random() * 2)

		if (randnum_game == 0) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription("Vrai :wink:")
			.setFooter('Jeu du vrai ou faux')
			message.channel.send(embed).catch(console.error)
		} else if(randnum_game == 1) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription("Faux :wink:")
			.setFooter('Jeu du vrai ou faux')
			message.channel.send(embed).catch(console.error)
		}
	} else if(message.content === 'd?gitdevbot') {
		message.reply('Voila le repos github du bot DevBot: https://github.com/MortyLeChef/DevBot/')
	}  else if(message.content === 'd?apropos') {

		var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription("Le développeur du bot: **MortyLeChef#7700**\nSite web: https://devhack.fr.nf\nHébergeur web: **Heroku**\nTwitter: https://twitter.com/karim_aoulad/nAdaptateur du bot pour le serveur: **Alex._.lcr#5546")
			.setFooter('A propos du bot')
			message.channel.send(embed).catch(console.error)
	} else if(message.content === 'd?setavatar') {
		bot.user.setAvatar('https://cdn.discordapp.com/attachments/375754450305941506/409382152099201025/devhack-logo.png')
	}
})


bot.login(process.env.TOKEN);