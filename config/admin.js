const ADMIN_ROLE_ID = "1438923793073438733";

module.exports = (member) => {
    if (!member) return false;
    return member.roles.cache.has(ADMIN_ROLE_ID);
};
