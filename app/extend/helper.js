const crypto = require('crypto');

module.exports = {
  encrypt(str){
    let result = crypto.createHmac('sha256', this.config.salt)
      .update(str)
      .digest('hex');
    return result;
  }
}