let UserModel = require('../database/users');
let bcrypt = require(global.rootPath + '/utils/bcrypt')
class UserService {
  async register(userInfo) {
    // 缺少一些边界处理
    let passwordHash = bcrypt.createHash(userInfo.password)
    let userData = await UserModel.findOne({ name: userInfo.name });

    if (userData) {
      return {
        isNameExit: true,
        msg: '已存在',
        info: userData
      }
    }

    let user = new UserModel({ ...userInfo, password: passwordHash });
    await user.save();
    return {
      isNameExit: false,
      msg: '已保存',
      info: user
    }
  }

  // 登录
  async login(userInfo) {
    let data = await UserModel.findOne({name:userInfo.name});
    if(!data) {
      return {
        msg: '用户不存在',
        isExit: false,
        isCompare: true
      }
    }

    let isCompare = bcrypt.compare(userInfo.password,data.password);
    if (!isCompare) {
      return {
        msg: '密码出错',
        isExit: true,
        isCompare
      }
    }

    return {
      msg: '登录成功',
      isExit: true,
      isCompare: true
    }

  }
}

module.exports = new UserService;