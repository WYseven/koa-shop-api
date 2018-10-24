let bcrypt = require('bcrypt');

//生成salt的迭代次数
const saltRounds = 10;
exports.createHash = (password) => {
  //随机生成salt
  const salt = bcrypt.genSaltSync(saltRounds);
  //获取hash值
  var hash = bcrypt.hashSync(password, salt);
  return hash
}
exports.compare = (password, hash) => {
  return bcrypt.compareSync(password, hash)
};