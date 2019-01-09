const crypto = require('crypto');

module.exports = {
  encrypt(str){
    console.log(`this.config.salt=${this.config.salt}`);
    let result = crypto.createHmac('sha256', this.config.salt)
      .update(str)
      .digest('hex');
    console.log(`result=${result}`)
    return result;
  }
}