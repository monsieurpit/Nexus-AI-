import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('discordjs', slug, title, keywords, content);

export const CODE_DISCORDJS = [
  c('setup-client', 'discord.js v14 bot setup: client, intents, login, events, message commands', ['discord js bot', 'discord.js setup', 'discord bot intents', 'discord js client', 'messagecreate', 'discord bot token', 'message content intent', 'discord js ready event'],
    `npm i discord.js (v14, Node 18+). Create the app at discord.com/developers → Bot → token (keep it in .env, never commit; reset it if leaked); enable privileged intents (Message Content, Server Members, Presence) there if you use them; invite with OAuth2 URL Generator scopes bot + applications.commands.
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel], // needed for DMs
});
client.once(Events.ClientReady, (c) => console.log(\`Logged in as \${c.user.tag}\`));
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;                     // ignore bots (and yourself)
  if (message.content === '!ping') await message.reply(\`Pong! \${client.ws.ping}ms\`);
});
client.login(process.env.DISCORD_TOKEN);
Without the MessageContent intent message.content is empty (except for mentions/DMs). Slash commands are preferred over prefix commands.
Key objects: message.guild, message.channel, message.member (GuildMember), message.author (User), message.mentions.users.first(), message.attachments, client.guilds.cache, guild.members.fetch(id), guild.channels.cache.get(id), guild.roles.cache.find((r) => r.name === 'Mod').
Other events: GuildMemberAdd (welcome: member.guild.systemChannel?.send(\`Welcome \${member}!\`) — needs GuildMembers intent), GuildMemberRemove, MessageReactionAdd (needs reactions intent + partials), MessageDelete, VoiceStateUpdate, InteractionCreate.
Sending: channel.send({ content: 'hi', embeds: [embed], components: [row], files: ['./img.png'], allowedMentions: { parse: [] } }); message.react('🔥'); message.delete(); channel.bulkDelete(50) (messages < 14 days); DMs: user.send().
Cache vs fetch: cache holds what the bot has seen; fetch to get the rest (await channel.messages.fetch({ limit: 10 })).
Common errors: "Used disallowed intents" (enable it in the portal), "Missing Access"/"Missing Permissions" (code 50001/50013 — role permissions/channel overwrites/role hierarchy), "Invalid token", "Unknown interaction" (didn't reply within 3 s), "DiscordAPIError[50035] Invalid Form Body" (too long content > 2000 chars, embed limits, bad field).`),

  c('slash-commands', 'discord.js slash commands: SlashCommandBuilder, options, registering, handling interactions, command handler', ['discord js slash commands', 'slashcommandbuilder', 'register slash commands', 'interactioncreate', 'deferreply', 'discord command handler', 'command options discord js', 'ephemeral reply', 'autocomplete discord'],
    `Define:
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('ban').setDescription('Ban a member')
  .addUserOption((o) => o.setName('target').setDescription('Who').setRequired(true))
  .addStringOption((o) => o.setName('reason').setDescription('Why').setMaxLength(200))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
Names: lowercase, no spaces, ≤ 32 chars; descriptions required; option types: String (setChoices / setAutocomplete), Integer/Number (setMinValue), Boolean, User, Channel (addChannelTypes), Role, Mentionable, Attachment; subcommands .addSubcommand(...).
Register once (deploy script, not on every start): import { REST, Routes } from 'discord.js'; const rest = new REST().setToken(token); await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands.map((c) => c.data.toJSON()) }); (guild = instant, for testing) / Routes.applicationCommands(clientId) (global).
Handle:
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.get(interaction.commandName);
  try { await command.execute(interaction); }
  catch (err) { console.error(err); const msg = { content: 'Something broke.', ephemeral: true };
    interaction.replied || interaction.deferred ? await interaction.followUp(msg) : await interaction.reply(msg); }
});
Reading options: interaction.options.getUser('target', true), getMember('target'), getString('reason') ?? 'No reason', getInteger, getSubcommand(). interaction.user, interaction.member, interaction.guild, interaction.channel.
Replies: must respond within 3 seconds: await interaction.reply('hi') / reply({ content, ephemeral: true }) (flags: MessageFlags.Ephemeral in newer versions); slow work: await interaction.deferReply(); ... await interaction.editReply('done'); then followUp for more.
Command handler: one file per command exporting { data, execute }; load with fs.readdirSync('./commands') into a Collection keyed by data.name.
Autocomplete: if (interaction.isAutocomplete()) { const focused = interaction.options.getFocused(); await interaction.respond(choices.filter((c) => c.startsWith(focused)).slice(0, 25).map((c) => ({ name: c, value: c }))); }
Context menus: ContextMenuCommandBuilder with ApplicationCommandType.User / Message.
Moderation inside execute: const member = await interaction.guild.members.fetch(target.id); if (!member.bannable) return interaction.reply({ content: "I can't ban them (role hierarchy).", ephemeral: true }); await member.ban({ reason }); also member.kick(), member.timeout(10 * 60_000, reason), member.roles.add(roleId).`),

  c('embeds-components', 'discord.js embeds, buttons, select menus, modals, collectors', ['discord js embed', 'embedbuilder', 'discord buttons', 'actionrowbuilder', 'select menu discord js', 'discord modal', 'button collector', 'discord embed color'],
    `Embed:
import { EmbedBuilder } from 'discord.js';
const embed = new EmbedBuilder().setColor(0x5865f2).setTitle('Server stats').setURL('https://x.com').setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
  .setDescription('Up to 4096 chars').addFields({ name: 'Members', value: \`\${guild.memberCount}\`, inline: true }, { name: 'Owner', value: \`<@\${guild.ownerId}>\`, inline: true })
  .setThumbnail(guild.iconURL()).setImage(url).setFooter({ text: 'Nexus' }).setTimestamp();
await interaction.reply({ embeds: [embed] });
Limits: title 256, description 4096, 25 fields (name 256, value 1024), footer 2048, total 6000 chars, 10 embeds per message. Field values can't be empty.
Buttons:
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from 'discord.js';
const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder().setCustomId('confirm').setLabel('Confirm').setStyle(ButtonStyle.Success),
  new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Secondary),
  new ButtonBuilder().setLabel('Website').setURL('https://x.com').setStyle(ButtonStyle.Link));
const msg = await interaction.reply({ content: 'Sure?', components: [row], fetchReply: true });
Collector: const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60_000, filter: (i) => i.user.id === interaction.user.id });
collector.on('collect', async (i) => { await i.update({ content: i.customId === 'confirm' ? 'Done' : 'Cancelled', components: [] }); });
Or globally in InteractionCreate: if (interaction.isButton()) switch on interaction.customId (store data in the id: \`role:\${roleId}\`). Max 5 rows, 5 buttons per row; customId ≤ 100 chars. Respond to every component interaction (update / reply / deferUpdate) or users see "This interaction failed".
Select menus: new StringSelectMenuBuilder().setCustomId('pick').setPlaceholder('Choose').addOptions({ label: 'Red', value: 'red', emoji: '🔴' }) (max 25 options); UserSelectMenuBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder; interaction.values.
Modals (forms): const modal = new ModalBuilder().setCustomId('apply').setTitle('Staff application').addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('why').setLabel('Why do you want staff?').setStyle(TextInputStyle.Paragraph).setRequired(true))); await interaction.showModal(modal); then if (interaction.isModalSubmit()) interaction.fields.getTextInputValue('why'). Max 5 inputs; showModal must be the first response.
Mentions: <@userId>, <@&roleId>, <#channelId>, timestamps <t:unix:R>. Components V2 (newer API) allow richer layouts (containers, sections, text displays).`),

  c('advanced', 'discord.js advanced: permissions, roles, voice, sharding, databases, deployment, rate limits', ['discord js permissions', 'discord role add', 'discord js voice', 'discord js database', 'discord bot hosting', 'discord sharding', 'discord rate limit', 'discord js reaction roles', 'ticket system discord js'],
    `Permissions: member.permissions.has(PermissionFlagsBits.ManageMessages); channel.permissionsFor(member).has(...); the bot can only manage roles below its highest role (role hierarchy) and never the server owner. Edit overwrites: channel.permissionOverwrites.edit(roleId, { SendMessages: false }).
Roles: await member.roles.add(role, 'reason'); roles.remove; member.roles.cache.has(id); guild.roles.create({ name: 'VIP', color: 0xffd700 }).
Ticket system: button → guild.channels.create({ name: \`ticket-\${user.username}\`, type: ChannelType.GuildText, parent: categoryId, permissionOverwrites: [{ id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }, { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }, { id: staffRoleId, allow: [PermissionFlagsBits.ViewChannel] }] }).
Reaction/button roles: button customId role:<id> → toggle the role in the handler (buttons are more reliable than reactions).
Threads: channel.threads.create({ name, autoArchiveDuration: 60 }); forum posts: forum.threads.create({ name, message: { content } }).
Voice/music: @discordjs/voice (joinVoiceChannel, createAudioPlayer, createAudioResource) + GuildVoiceStates intent + ffmpeg/opus; YouTube streaming breaks often and is against YouTube ToS — prefer Lavalink-based libraries or other sources.
Data: per-guild settings/XP/economy in a database (SQLite via better-sqlite3, PostgreSQL, MongoDB, Redis), not JSON files written concurrently. Cooldowns with a Collection<userId, timestamp>.
Scheduling: setInterval / node-cron for reminders; persist them so restarts don't lose them.
Rate limits: discord.js queues requests automatically; avoid spamming (mass DMs, editing a message every second); 429s mean slow down.
Sharding: needed at 2,500+ servers (ShardingManager or discord-hybrid-sharding).
Hosting: always-on process (Railway, a VPS, Fly.io, a home server); not serverless (except HTTP-interaction bots). Handle crashes: process.on('unhandledRejection', console.error); client.on('error', ...); restart with pm2/the platform. Keep the token in env vars.
Rules: follow Discord's Developer ToS (no self-bots, no scraping user data, respect privacy), use intents you need only.
Types in TS: ChatInputCommandInteraction, GuildMember, TextChannel (check channel.isTextBased() / isSendable() before sending).`),
];
