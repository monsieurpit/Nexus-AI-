import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('discordpy', slug, title, keywords, content);

export const CODE_DISCORDPY = [
  c('setup-commands', 'discord.py bot: setup, intents, events, prefix commands, slash commands (app_commands), cogs', ['discord py bot', 'discord.py setup', 'discord py intents', 'discord py slash commands', 'app_commands', 'discord py cogs', 'commands bot python', 'on_message', 'tree sync'],
    `pip install -U discord.py (python-dotenv for the token). Enable Message Content / Members intents in the developer portal if used.
import os, discord
from discord import app_commands
from discord.ext import commands
intents = discord.Intents.default()
intents.message_content = True
intents.members = True
bot = commands.Bot(command_prefix="!", intents=intents)
@bot.event
async def on_ready():
    synced = await bot.tree.sync()          # better: sync once via an owner command, or to one guild while testing
    print(f"Logged in as {bot.user} ({len(synced)} slash commands)")
@bot.command()                               # !hello
async def hello(ctx: commands.Context, member: discord.Member | None = None):
    await ctx.reply(f"Hi {(member or ctx.author).mention}")
@bot.tree.command(name="ping", description="Latency")
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message(f"Pong {round(bot.latency * 1000)}ms", ephemeral=True)
@bot.tree.command(description="Ban someone")
@app_commands.describe(target="Who", reason="Why")
@app_commands.default_permissions(ban_members=True)
async def ban(interaction: discord.Interaction, target: discord.Member, reason: str = "No reason"):
    await target.ban(reason=reason)
    await interaction.response.send_message(f"Banned {target}.")
bot.run(os.environ["DISCORD_TOKEN"])
If you override on_message, call await bot.process_commands(message) at the end or prefix commands stop working. Ignore bots: if message.author.bot: return.
Slow work: await interaction.response.defer(thinking=True) then await interaction.followup.send(...) (respond within 3 s; only one response — then followups). Choices: @app_commands.choices(color=[app_commands.Choice(name="Red", value="red")]); autocomplete with @cmd.autocomplete("name"). Guild sync for fast testing: bot.tree.copy_global_to(guild=g); await bot.tree.sync(guild=g).
Cogs (organise commands, load as extensions):
class Fun(commands.Cog):
    def __init__(self, bot): self.bot = bot
    @commands.Cog.listener()
    async def on_member_join(self, member): await member.guild.system_channel.send(f"Welcome {member.mention}!")
    @app_commands.command()
    async def coin(self, interaction: discord.Interaction): await interaction.response.send_message(random.choice(["Heads", "Tails"]))
async def setup(bot): await bot.add_cog(Fun(bot))
Load in setup_hook: class MyBot(commands.Bot): async def setup_hook(self): await self.load_extension("cogs.fun").
Errors: @bot.event async def on_command_error(ctx, error) / tree.on_error; commands.MissingPermissions, commands.CommandOnCooldown (@commands.cooldown(1, 10, commands.BucketType.user)).
Never use blocking libraries (requests, time.sleep) in async handlers — use aiohttp / asyncio.sleep, or await asyncio.to_thread(fn).
Forks: py-cord, nextcord, disnake have similar but not identical APIs.`),

  c('embeds-views', 'discord.py embeds, buttons, select menus, modals (discord.ui Views), tasks, databases', ['discord py embed', 'discord py buttons', 'discord ui view', 'discord py modal', 'discord py select menu', 'discord py tasks loop', 'persistent view', 'aiosqlite discord bot'],
    `Embed: embed = discord.Embed(title="Stats", description="...", color=discord.Color.blurple()); embed.add_field(name="Members", value=str(guild.member_count), inline=True); embed.set_thumbnail(url=guild.icon.url if guild.icon else None); embed.set_footer(text="Nexus"); embed.timestamp = discord.utils.utcnow(); await ctx.send(embed=embed).
Buttons:
class Confirm(discord.ui.View):
    def __init__(self, author_id: int):
        super().__init__(timeout=60); self.author_id = author_id; self.value = None
    async def interaction_check(self, interaction: discord.Interaction) -> bool:
        return interaction.user.id == self.author_id
    @discord.ui.button(label="Confirm", style=discord.ButtonStyle.green)
    async def confirm(self, interaction: discord.Interaction, button: discord.ui.Button):
        self.value = True; await interaction.response.edit_message(content="Done", view=None); self.stop()
    @discord.ui.button(label="Cancel", style=discord.ButtonStyle.grey)
    async def cancel(self, interaction, button):
        self.value = False; await interaction.response.edit_message(content="Cancelled", view=None); self.stop()
view = Confirm(interaction.user.id); await interaction.response.send_message("Sure?", view=view); await view.wait().
Link buttons: discord.ui.Button(label="Site", url="https://x.com"). Persistent views (survive restarts): timeout=None, every item has a custom_id, and bot.add_view(MyView()) in setup_hook.
Select: @discord.ui.select(placeholder="Pick", options=[discord.SelectOption(label="Red", value="red", emoji="🔴")]) async def pick(self, interaction, select): select.values[0]. discord.ui.UserSelect / RoleSelect / ChannelSelect.
Modal:
class Apply(discord.ui.Modal, title="Staff application"):
    why = discord.ui.TextInput(label="Why do you want staff?", style=discord.TextStyle.paragraph, max_length=1000)
    async def on_submit(self, interaction: discord.Interaction):
        await interaction.response.send_message(f"Thanks! You said: {self.why.value}", ephemeral=True)
await interaction.response.send_modal(Apply())
Background tasks: from discord.ext import tasks; @tasks.loop(minutes=5) async def update_status(): ...; start in setup_hook / on_ready with update_status.start(); @update_status.before_loop async def before(): await bot.wait_until_ready().
Data: aiosqlite / asyncpg / motor (async drivers) — not sqlite3 directly in handlers if queries are slow. Moderation helpers: await member.timeout(datetime.timedelta(minutes=10), reason=r); member.add_roles(role); channel.purge(limit=50); channel.set_permissions(role, send_messages=False).
Common errors: "Forbidden 403 Missing Permissions" (role hierarchy/channel perms), "Interaction has already been acknowledged" (responded twice — use followup), "Unknown interaction 10062" (took > 3 s — defer), "This interaction failed" (view callback didn't respond or the bot restarted with a non-persistent view), "PrivilegedIntentsRequired".`),
];
