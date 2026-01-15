const { ADMIN_ROLE } = require("../config/admin");

module.exports = (member) => {
    return member.roles.cache.has(ADMIN_ROLE);
};
