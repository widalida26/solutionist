require('dotenv').config();
const { sign, verify, Secret } = require('jsonwebtoken');

module.exports = {
  accessToken: (data: string) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '10m' });
  },
  refreshToken: (data: string) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });
  },
};
