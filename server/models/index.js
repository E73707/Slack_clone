import sequelize from "../config/connection.js";
import User from "./User.js";
import Community from "./Community.js";
import CommunityMember from "./CommunityMember.js";
import CommunityChannel from "./CommunityChannel.js";
import CommunityPost from "./CommunityPost.js";
import ChannelMember from "./ChannelMember.js";

// Associations

// Many-to-Many relationship between Users and Communities through CommunityMember
User.belongsToMany(Community, {
  through: CommunityMember,
  as: "memberOf", // Alias for communities the user is a member of
});
Community.belongsToMany(User, {
  through: CommunityMember,
  as: "members", // Alias for users who are members of a community
});
// A Community has one owner (a User)
Community.belongsTo(User, {
  as: "owner", // Alias for the owner of the community
  foreignKey: "community_owner",
});

User.hasMany(Community, {
  as: "ownedCommunities", // Alias for communities the user owns
  foreignKey: "community_owner",
});

// One-to-Many relationship between Community and CommunityChannel
Community.hasMany(CommunityChannel, {
  foreignKey: "communityId",
  as: "channels",
});
CommunityChannel.belongsTo(Community, { foreignKey: "communityId" });

// One-to-Many relationship between Community and CommunityPost
Community.hasMany(CommunityPost, { foreignKey: "communityId" });
CommunityPost.belongsTo(Community, { foreignKey: "communityId" });

// One-to-Many relationship between User and CommunityPost

User.hasMany(CommunityPost, { foreignKey: "userId" });
CommunityPost.belongsTo(User, { foreignKey: "userId" });

// One-to-Many relationship between CommunityChannel and CommunityPost
CommunityChannel.hasMany(CommunityPost, { foreignKey: "channelId" });
CommunityPost.belongsTo(CommunityChannel, { foreignKey: "channelId" });

User.belongsToMany(CommunityChannel, {
  through: ChannelMember,
  as: "channel_members",
});

CommunityChannel.hasMany(ChannelMember, {
  foreignKey: "channelId",
  as: "channel_members",
});

ChannelMember.belongsTo(CommunityChannel, {
  foreignKey: "channelId",
  as: "channel_members",
});

// Sync all models with the database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced and tables created");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export {
  User,
  Community,
  CommunityMember,
  CommunityChannel,
  CommunityPost,
  ChannelMember,
};
