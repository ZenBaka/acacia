const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { randnum } = require('../../utilities/randnum');

module.exports = {
  category: 'General',
  args: '<@user>',
  data: new SlashCommandBuilder()
    .setName('wave')
    .setDescription('Wave at another user')
    .addUserOption(o => o.setName('user').setDescription('Select a user').setRequired(true)),
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const user = interaction.options.getMember('user');
    const result = await axios.get('https://api.otakugifs.xyz/gif?reaction=wave&format=gif');

    const embed = new EmbedBuilder()
      .setColor([randnum(0, 255), randnum(0, 255), randnum(0, 255)])
      .setImage(result.data.url)
      .setDescription(`${interaction.member} waves at ${user}!`);

    await interaction.reply({ content: `${user}`, embeds: [embed] });
  },
};