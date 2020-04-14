// pages/collections/collections.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collects:[
      {
        title:"菜名",
        image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        timeNeeded:"10min",
        difficulty:"0基础",
      }, {
        title: "菜名",
        image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        timeNeeded: "10min",
        difficulty: "0基础",
      }
    ],
    openid: app.globalData.openid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取收藏列表
    wx.request({
      url: 'https://csquare.wang/favorite/user/'+that.openid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          collects: res.data.collects,
        })
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