module.exports = function isAdmin(member) {
    if (!member || !member.roles) return false;
    return member.roles.cache.has("1438923793073438733");
};
