const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "interactionCreate",

  async execute(interaction) {
    if (interaction.isButton()) {
      if (interaction.customId === "Total Boosters") {
        const TotalBoosters = await interaction.guild.members.fetch().then(
          (members) =>
            members
              .filter((m) => m.premiumSinceTimestamp)
              .map(
                (member) =>
                  `${member} | ${member.user.username} | ${
                    member.user.id
                  } | Boost at: <t:${Math.round(
                    member.premiumSinceTimestamp / 1000
                  )}:f>`
              )
              .join("\n") || "❌Sorry, No Boosters Found from this server!"
        );

        const TotalBoosterEmbed = new EmbedBuilder()
          .setTitle(
            `All Server Boosters from ${
              interaction.guild.name
            } [${await interaction.guild.members
              .fetch()
              .then(
                (members) => members.filter((m) => m.premiumSinceTimestamp).size
              )}]`
          )
          .setDescription(TotalBoosters)
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setColor(interaction.guild.members.me.displayHexColor)
          .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();
        await interaction.reply({
          embeds: [TotalBoosterEmbed],
          ephemeral: true,
        });
      }
    }
  },
};
