import sequelize from "../config/connection.js";
import User from "./User.js";
import Community from "./Community.js";
import CommunityMember from "./CommunityMember.js";
import CommunityChannel from "./CommunityChannel.js";
import CommunityPost from "./CommunityPost.js";
import ChannelMember from "./ChannelMember.js";
import InviteToken from "./InviteToken.js";

// Associations
User.belongsToMany(Community, {
  through: CommunityMember,
  as: "memberOf",
});
Community.belongsToMany(User, {
  through: CommunityMember,
  as: "members",
});
Community.belongsTo(User, {
  as: "owner",
  foreignKey: "community_owner",
});
User.hasMany(Community, {
  as: "ownedCommunities",
  foreignKey: "community_owner",
});
Community.hasMany(CommunityChannel, {
  foreignKey: "communityId",
  as: "channels",
});
// CommunityPost.hasOne(User, { foreignKey: "userId" });
CommunityChannel.belongsTo(Community, { foreignKey: "communityId" });
Community.hasMany(CommunityPost, { foreignKey: "communityId" });
CommunityPost.belongsTo(Community, { foreignKey: "communityId" });
User.hasMany(CommunityPost, { foreignKey: "userId", as: "Posts" });
// CommunityPost.belongsTo(User, { foreignKey: "userId", as: "author" });
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

Community.hasMany(CommunityMember, { foreignKey: "communityId" });
CommunityMember.belongsTo(Community, { foreignKey: "communityId" });
User.hasMany(CommunityMember, { foreignKey: "userId" });
CommunityMember.belongsTo(User, { foreignKey: "userId" });

// Sync all models with the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced and tables created");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

export {
  User,
  Community,
  CommunityMember,
  CommunityChannel,
  CommunityPost,
  ChannelMember,
  InviteToken,
};
