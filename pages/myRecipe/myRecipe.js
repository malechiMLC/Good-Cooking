// pages/myRecipe/myRecipe.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myRecipes: [],
    profile: '',
    nickName: '未登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      profile: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
    var that = this;
    wx.request({
      url: 'https://csquare.wang/recipe',
      method: 'GET',
      data: {
        openid: app.globalData.openId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          myRecipes: res.data
        })
      }
    })
  },

  clickCard(e){
    var index = e.currentTarget.dataset.index
    var that = this;
    wx.navigateTo({
      url: '/pages/recipe/recipe',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(that.data.myRecipes[index].id)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.myRecipes[index].id })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})