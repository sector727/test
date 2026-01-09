module.exports = {
    isValidID(id) {
        return /^\d{17,20}$/.test(id);
    }
};
