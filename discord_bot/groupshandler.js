module.exports = function (client) {
	const memeGuild = client.guilds.cache.find(
		(guild) => guild.name === 'meme_bot_lair'
	);
	const memeGuildGeneral = memeGuild.channels.cache.find(
		(channel) => channel.name === 'general'
	);
	const gbgGuild = client.guilds.cache.find(
		(guild) => guild.name === 'Göteborg Hangout'
	);
	const gbgGuildGeneral = gbgGuild.channels.cache.find(
		(channel) => channel.name === 'general'
	);

	memeGuildGeneral.send('tjenna');
	gbgGuildGeneral.send('.');

	const channel = client.channels.cache.get('811337289858940952');
	const json = JSON.parse(localStorage.getItem('groups.json'));

	let response = 'Groups just got updated : \n**Groups**\n';
	json.groups.forEach((group) => {
		response += `Grupp ${group.groupId} - `;
		group.members.forEach((member) => (response += `${member}, `));
		response = response.slice(0, response.length - 2);
		response += `\n`;
	});
	memeGuildGeneral.send(`@everyone ${response}`);
	//gbgGuildGeneral.send('.');
};
