// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认未登录时的显示
    name: "尚未登陆",
    avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",
    talk: "这个人很懒，还没有写介绍┑(￣Д ￣)┍.....................",
    essayNumber: "111",
    praiseNumber: "222",
    imgBase: app.globalData.imgBase
  },

  //事件处理函数
  infoBindTap: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo;
    if(userInfo != null){
      this.setData({
        name: userInfo.nickName,
        avatar: userInfo.avatarUrl,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.openId)
    console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindGetUserInfo: function (e) {
    if (app.globalData.loginSuccess) {
      wx.showToast({
        title: '您已登录',
        icon: 'success'
      })
    } else {
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        console.log("用户的信息如下：");
        console.log(e.detail.userInfo);
        app.globalData.loginSuccess = true;
        this.setData({
          name: e.detail.userInfo.nickName,
          avatar: e.detail.userInfo.avatarUrl,
        })
        wx.showToast({
          title: '登录成功',
        })
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，小程序无法为您提供进一步服务，请重新授权！',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    }
  },
})