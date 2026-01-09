module.exports = {
    hasRole(member, roleID) {
        return member.roles.cache.has(roleID);
    }
};
