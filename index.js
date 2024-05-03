/* 
Advanced Boost Announce System in Discord.js V14
Hope you Enjoy, Made with 🤍 by Masih#0258
Github: https://github.com/Masihdeveloper | Don't forget to star the repositories.
Website: https://masihdev.ir/
Copyright Masih 2024 All Right Reserved!
*/
require("./errorHandlers");
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const chalk = require("chalk");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
}); // Required intents, Don't remove any of them
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  // All Definitions
  const boostAnnounceLogChannel = client.channels.cache.get(
    config.boostLogsChannelId
  );
  const boostAnnounceChannel = client.channels.cache.get(
    config.boostAnnounceChannelId
  );
  const format = {
    0: "No Level",
    1: "Level 1",
    2: "Level 2",
    3: "Level 3",
  };
  const boostLevel = format[newMember.guild.premiumTier];
  const totalBoosterRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("Total Boosters")
      .setLabel("Total Boosters")
      .setEmoji("988797857907769374")
      .setStyle(ButtonStyle.Primary)
  );
  // Executes when member boost the server and received the "Nitro Boost" role.
  if (
    !oldMember.roles.cache.has(
      newMember.guild.roles.premiumSubscriberRole?.id
    ) &&
    newMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole?.id)
  ) {
    const boostAnnounceEmbed = new EmbedBuilder()
      .setAuthor({
        name: `Congratulations we have new booster!`,
        iconURL: newMember.guild.iconURL({ size: 1024 }),
      })
      .setDescription(
        `>>> Dear ${newMember}, You are really awesome and amazing.\nThanks for boosting our server, Enjoy your ${newMember.guild.roles.premiumSubscriberRole} role and other exclusive perks.`
      )
      .addFields({
        name: "💎 Total Boost:",
        value: `${newMember.guild.premiumSubscriptionCount} Boost | Community (${boostLevel})`,
        inline: false,
      })
      .setImage(
        "https://cdn.discordapp.com/attachments/997473822787780669/1235649668978053181/p1_3187142_731753fb_LE_auto_x2_result.png?ex=663523ee&is=6633d26e&hm=7d7f3b33acb09f05a277802035cf84b79f8982eb1d01c73d0e8e60a85c23af78&"
      )
      .setColor("F47FFF")
      .setFooter({
        text: `${newMember.guild.name} Boost Detection System`,
        iconURL: newMember.user.displayAvatarURL({ size: 1024 }),
      })
      .setTimestamp();
    const boostAnnounceRow = new ActionRowBuilder().addComponents(
      totalBoosterRow.components[0],
      new ButtonBuilder()
        .setLabel(`${newMember.user.username}`)
        .setEmoji("899583101796253706")
        .setCustomId("Disabled")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true)
    );
    const msg = await boostAnnounceChannel.send({
      content: `${newMember} \`${newMember}\``,
      embeds: [boostAnnounceEmbed],
      components: [boostAnnounceRow],
    });
    // Adds a reaction emoji to the above sent message
    msg.react("🥳");

    // Sends DM with button to the NEW nitro booster
    await newMember
      .send({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `- Hello dear ${newMember}, You are really awesome. Thanks for boosting the **__${newMember.guild.name}__** server!\n- Please consider to enjoy your new **${newMember.guild.roles.premiumSubscriberRole?.name}** role and other massive perks 🎉`
            )
            .setColor(newMember.guild.members.me.displayHexColor)
            .setFooter({
              text: "Don't forget to click on the link button below for more info",
              iconURL: newMember.user.displayAvatarURL({ size: 1024 }),
            })
            .setTimestamp(),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel("Jump to boost message")
              .setStyle(ButtonStyle.Link)
              .setURL(msg.url)
          ),
        ],
      })
      .catch((err) => {
        console.error(
          `An error ocurred while sending DM to new booster:\n-> ${chalk.red(
            err
          )}`
        );
      });

    // Boost Announce Log System
    const boostLogEmbed = new EmbedBuilder()
      .setAuthor({
        name: `NEW Boost Detection System`,
        iconURL: client.user.displayAvatarURL(),
      })
      .addFields(
        {
          name: "💎 Nitro Booster",
          value: `${newMember.user} (${newMember.user.username})`,
        },
        {
          name: "🎉 Server Boost at",
          value: `<t:${Math.round(
            newMember.premiumSinceTimestamp / 1000
          )}:D> (<t:${Math.round(newMember.premiumSinceTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "⏰ Account Created at",
          value: `<t:${Math.round(
            newMember.user.createdTimestamp / 1000
          )}:D> (<t:${Math.round(newMember.user.createdTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "📆 Joined Server at",
          value: `<t:${Math.round(
            newMember.joinedTimestamp / 1000
          )}:D> (<t:${Math.round(newMember.joinedTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "💜 Total Boost",
          value: `${newMember.guild.premiumSubscriptionCount} Boost | Community (${boostLevel})`,
          inline: false,
        },
        {
          name: "✅ Assigned Role",
          value: `${newMember.guild.roles.premiumSubscriberRole} (${newMember.guild.roles.premiumSubscriberRole?.id})`,
          inline: false,
        }
      )
      .setThumbnail(newMember.user.displayAvatarURL({ size: 1024 }))
      .setColor(newMember.guild.members.me.displayHexColor)
      .setFooter({
        text: `Member ID: ${newMember.user.id}`,
        iconURL: newMember.guild.iconURL({ size: 1024 }),
      })
      .setTimestamp();
    boostAnnounceLogChannel.send({
      embeds: [boostLogEmbed],
    });
  }

  // Executes when member unboost the server and "Nitro Booster" was taken from him
  if (
    oldMember.roles.cache.has(
      newMember.guild.roles.premiumSubscriberRole?.id
    ) &&
    !newMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole?.id)
  ) {
    // Sends DM with button to the NEW UnBooster
    await oldMember
      .send({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Hello dear ${oldMember}, Unfortunately your nitro boost for **__${oldMember.guild.name}__** server has been expired and you lost your special and cool perks such as an exclusive **${oldMember.guild.roles.premiumSubscriberRole?.name}** role :'(`
            )
            .setColor(oldMember.guild.members.me.displayHexColor)
            .setFooter({
              text: "You can get all these perks back by boosting again 💫",
              iconURL: oldMember.user.displayAvatarURL({ size: 1024 }),
            })
            .setTimestamp(),
        ],
      })
      .catch((err) => {
        console.error(
          `An error ocurred while sending DM to the member who has unboost the server:\n-> ${chalk.red(
            err
          )}`
        );
      });
    // Unboost Log System
    const unboostEmbedLog = new EmbedBuilder()
      .setAuthor({
        name: `NEW UnBoost or Expired Detection System`,
        iconURL: client.user.displayAvatarURL(),
      })
      .addFields(
        {
          name: "📌 UnBooster",
          value: `${oldMember.user} (${oldMember.user.username})`,
        },
        {
          name: "⏰ Account Created at",
          value: `<t:${Math.round(
            oldMember.user.createdTimestamp / 1000
          )}:D> (<t:${Math.round(oldMember.user.createdTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: "📆 Joined Server at",
          value: `<t:${Math.round(
            oldMember.joinedTimestamp / 1000
          )}:D> (<t:${Math.round(oldMember.joinedTimestamp / 1000)}:R>)`,
          inline: true,
        },

        {
          name: "💜 Total Boost",
          value: oldMember.guild.premiumSubscriptionCount
            ? `${oldMember.guild.premiumSubscriptionCount} Boost | Community (${boostLevel})`
            : "No one has boosted this server.",
          inline: false,
        },

        {
          name: "❌ Removed Role",
          value: `${oldMember.guild.roles.premiumSubscriberRole}  (${oldMember.guild.roles.premiumSubscriberRole?.id})`,
          inline: false,
        }
      )
      .setThumbnail(oldMember.user.displayAvatarURL({ size: 1024 }))
      .setColor(oldMember.guild.members.me.displayHexColor)
      .setFooter({
        text: `Member ID: ${oldMember.user.id}`,
        iconURL: oldMember.guild.iconURL({ size: 1024 }),
      })
      .setTimestamp();
    const unboostLogMessage = await boostAnnounceLogChannel.send({
      embeds: [unboostEmbedLog],
      components: oldMember.guild.premiumSubscriptionCount
        ? [totalBoosterRow]
        : [],
    });
    // Pins the embed message which has send to the log channel
    unboostLogMessage.pin();
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "Total Boosters") {
    await interaction.deferReply({ ephemeral: true });
    // Calculates the number of members who has boost this server
    const totalBoosters =
      (await interaction.guild.members.fetch()) // Waiting for fetching all members at first
        .filter((member) =>
          member.roles.cache.has(
            interaction.guild.roles.premiumSubscriberRole?.id
          )
        )
        .map(
          (member) =>
            `- ${member} | ${
              member.user.username
            } | Last boost at: <t:${Math.round(
              member.premiumSinceTimestamp / 1000
            )}:D>`
        )
        .join("\n") || "❌ No booster was found for this server!";

    const totalBoosterEmbed = new EmbedBuilder()
      .setAuthor({
        name: `All of the ${interaction.guild.name} boosters [${
          interaction.guild.roles.premiumSubscriberRole?.members.size ?? 0
        }]`, // Because all the members of this server are fetched first, This property returns a completely correct number regardless of how large it is.
        iconURL: interaction.guild.iconURL({ size: 1024 }),
      })

      .setDescription(
        totalBoosters.length > 4096
          ? totalBoosters.slice(0, 4093) + "..."
          : totalBoosters
      ) // Ensures that the output always is equal or less than 4096 characters for prevent Discord limits
      .setColor(interaction.guild.members.me.displayHexColor)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
      })
      .setTimestamp();
    interaction.editReply({
      embeds: [totalBoosterEmbed],
    });
  }
});
// Emitted when the client/bot become to online
client.on("ready", () => {
  console.log(
    chalk.green(`Successfully logged in as ${chalk.bold(client.user.tag)}`),
    chalk.bold("\nGitHub Repository:"),
    chalk.blueBright(
      "https://github.com/Masihdeveloper/Boost-Unboost-Announcer"
    ),
    "- If is useful please don't forget to",
    chalk.yellowBright("star⭐"),
    chalk.bold("\nWebsite:"),
    chalk.blueBright("https://masihdev.ir")
  );
});
// Logs in to your client by it's token
client.login(config.botToken);

/*
❓ Don't forget to filled out "config.json" file by your information and check the "README.md" file!
All of the methods have been carefully tested and without any bugs.
If you have any issues while using this source, feel free to contact me thorough my social media which is @Masihdeveloper
*/
