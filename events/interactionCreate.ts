import type { Client, Interaction } from "discord.js";
import { handleButton } from "../handlers/buttonHandler.js";

export function registerInteractionCreate(client: Client) {
  client.on("interactionCreate", async (interaction: Interaction) => {
    try {
      await handleButton(interaction);
    } catch (err) {
      console.error("[interaction]", err);
      if ("reply" in interaction && typeof interaction.reply === "function") {
        await (interaction as import("discord.js").CommandInteraction)
          .reply({ content: "something went wrong, try again", ephemeral: true })
          .catch(() => {});
      }
    }
  });
}
