import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const ALL_COMMANDS = [
  { name: ".setupticket [#channel] [type]",  desc: "sends the ticket panel. type can be verification, tag, or both (default: both)" },
  { name: ".tmr @role",                       desc: "sets the tag manager role — they can use .role" },
  { name: ".psr @role",                       desc: "sets the points support role — they can use .check, .lb, and .rankup" },
  { name: ".wlrole @role [command]",          desc: "lets a role use a specific command. leave command blank for tag manager access" },
  { name: ".wlp @role",                       desc: "gives a role full access to all raid points commands" },
  { name: ".vset @role",                      desc: "sets the role people get when they get verified" },
  { name: ".logset [#channel]",               desc: "sets where ticket close logs go" },
  { name: ".taglogset [#channel]",            desc: "sets where tag approval logs go" },
  { name: ".botlogset [#channel]",            desc: "sets where bot activity logs go — can change it anytime" },
  { name: ".gid <groupId>",                   desc: "sets the roblox group id for verification checks" },
  { name: ".flag <groupId>",                  desc: "flags a roblox group — flagged members get flagged in tickets" },
  { name: ".unflag <groupId>",               desc: "removes a group from the flagged list" },
  { name: ".flist",                           desc: "shows all currently flagged groups" },
  { name: ".gc <username>",                   desc: "runs a group check on a roblox user" },
  { name: ".verify @user [username]",         desc: "manually gives someone the verified role" },
  { name: ".unverify @user",                  desc: "removes the verified role from someone" },
  { name: "/role <roblox> <tag>",            desc: "assigns a roblox tag. options: rixa, fawn, ghoul, shy, sorrow, ryuk, bunni, no tag" },
  { name: ".wl bot @user",                    desc: "gives someone access to every single bot command" },
  { name: ".wl command <name> @user",         desc: "gives someone access to one specific command" },
  { name: ".whitelisted",                     desc: "shows who has been whitelisted" },
  { name: ".rankup [@user] or [5 @user]",     desc: "adds raid points to someone" },
  { name: ".remove [@user] or [5 @user]",     desc: "removes raid points from someone" },
  { name: ".resetall",                        desc: "wipes all raid points in the server — confirms first" },
  { name: ".check [@user]",                   desc: "shows yours or someone elses raid points" },
  { name: ".leaderboard or .lb",              desc: "shows the top 15 raid point holders" },
  { name: ".setavatar [url or attachment]",   desc: "changes the bot pfp — url or attached image both work" },
  { name: ".setbanner [url or attachment]",   desc: "changes the bot banner — url or attached image (needs nitro)" },
  { name: ".setusername <name>",              desc: "changes the bot username globally — discord limits this so dont spam it" },
  { name: ".setnickname [name]",              desc: "changes the bot nickname in this server — leave blank to reset" },
  { name: ".status <text>",                   desc: "sets the playing status. use 'clear' to remove it" },
  { name: ".presence <status>",              desc: "sets presence: online, idle, dnd, or invisible" },
  { name: ".prefix <new>",                    desc: "changes the prefix for this server" },
  { name: "/cookie",                          desc: "restricted — sets the roblox cookie for role assignment" },
  { name: ".backup",                          desc: "downloads all bot data as a json backup file" },
  { name: ".restore",                         desc: "restores data from a backup json file" },
  { name: "/help or .help",                   desc: "shows this" },
];

export const PER_PAGE = 6;

export function buildPage(page: number): { embeds: object[]; components: unknown[] } {
  const total = Math.ceil(ALL_COMMANDS.length / PER_PAGE);
  const slice = ALL_COMMANDS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return {
    embeds: [{
      color: 0xffffff,
      description: slice.map((c) => `\`${c.name}\`\n${c.desc}`).join("\n\n"),
      footer: { text: `page ${page + 1} of ${total} • prefix: .` },
      timestamp: new Date().toISOString(),
    }],
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(`help_nav::${page}::prev`)
          .setLabel("<")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(page === 0),
        new ButtonBuilder()
          .setCustomId(`help_nav::${page}::next`)
          .setLabel(">")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(page >= total - 1),
      ),
    ],
  };
}
