const bcrypt = require("bcrypt");

module.exports = {
  create: async (data, saltRounds = 10) => {
      const hashedData = await bcrypt.hash(data, saltRounds);
      return hashedData;
  },

  verify: async (unhashed, hashed) => {
      const match = await bcrypt.compare(unhashed, hashed);
      return match;
  },
};
