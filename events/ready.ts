import { REST, Routes, SlashCommandBuilder, InteractionContextType } from "discord.js";
import type { Client } from "discord.js";
import { logInfo } from "../utils/botLogger.js";
import { readJSON } from "../utils/storage.js";

const ALL_TAGS = ["rixa", "fawn", "ghoul", "shy", "sorrow", "ryuk", "bunni", "no tag"];

const commands = [
  new SlashCommandBuilder()
    .setName("role")
    .setDescription("assign a roblox tag to a user")
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption((o) => o.setName("roblox").setDescription("roblox username").setRequired(true))
    .addStringOption((o) =>
      o.setName("tag").setDescription("tag to assign").setRequired(true)
        .addChoices(...ALL_TAGS.map((t) => ({ name: t, value: t }))),
    ),

  new SlashCommandBuilder()
    .setName("cookie")
    .setDescription("set the roblox cookie used for role assignment")
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
    .addStringOption((o) =>
      o.setName("cookie").setDescription("your .ROBLOSECURITY cookie value").setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("shows all commands")
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),
].map((c) => c.toJSON());

export function registerReady(client: Client) {
  client.once("clientReady", async (c) => {
    console.log(`logged in as ${c.user.tag}`);

    const rest = new REST().setToken(process.env["DISCORD_BOT_TOKEN"]!);
    try {
      await rest.put(Routes.applicationCommands(c.user.id), { body: commands });
      console.log(`registered ${commands.length} slash commands`);
    } catch (err) {
      console.error("slash command registration failed:", err);
    }

    const guilds = readJSON<Record<string, { botLogChannel?: string }>>("guilds.json");
    const startTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    for (const [guildId, s] of Object.entries(guilds)) {
      if (!s.botLogChannel) continue;
      await logInfo(guildId, "Bot Online", `**${c.user.username}** just came online`, [
        { name: "Tag",        value: c.user.tag,                   inline: true },
        { name: "Servers",    value: String(c.guilds.cache.size),   inline: true },
        { name: "Started At", value: startTime,                    inline: true },
      ]);
    }
  });
}
