import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { permabannedIds } from '../utils/permaban.js';

export const data = new SlashCommandBuilder()
  .setName('permaban')
  .setDescription('Permanently ban a user by ID')
  .addUserOption(option => option.setName('user').setDescription('User to permaban').setRequired(true));

export async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
    return interaction.reply({ content: '❌ You need Ban Members permission.', flags: 64 });
  }
  const user = interaction.options.getUser('user');
  permabannedIds.add(user.id);
  try {
    const member = await interaction.guild.members.fetch(user.id);
    await member.ban({ reason: 'Permanently banned by bot.' });
    await user.send('🚫 You are permanently banned from this server.');
  } catch {}
  await interaction.reply({ content: `🔨 Permanently banned <@${user.id}>.`, flags: 64 });
} 