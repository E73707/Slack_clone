import sequelize from "../config/connection.js";
import User from "./User.js";
import Community from "./Community.js";
import CommunityMember from "./CommunityMember.js";
import CommunityChannel from "./CommunityChannel.js";
import CommunityPost from "./CommunityPost.js";

// Associations

// Many-to-Many relationship between Users and Communities through CommunityMember
User.belongsToMany(Community, { through: CommunityMember });
Community.belongsToMany(User, { through: CommunityMember });

// A Community has one owner (a User)
Community.belongsTo(User, { as: "owner", foreignKey: "community_owner" });

// One-to-Many relationship between Community and CommunityChannel
Community.hasMany(CommunityChannel, { foreignKey: "communityId" });
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

// Sync all models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

export { User, Community, CommunityMember, CommunityChannel, CommunityPost };
