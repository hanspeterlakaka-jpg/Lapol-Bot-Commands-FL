module.exports = (member, roles) => {
    return roles.some(roleId => member.roles.cache.has(roleId));
};
