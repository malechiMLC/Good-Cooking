// pages/today/today.js

const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brArray:[],
    luArray:[],
    diArray:[],
  },

  //事件处理函数
  bindViewTap: function (options){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var TIME = util.formatTime(new Date());
    var that = this
    //获取今日菜单
    wx.request({
      url: 'https://csquare.wang/recipe/today',
      method: 'GET',
      data: {
        openid:app.globalData.openid,
        //time:TIME
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          brArray:res.data.breakfastRecipes,
          luArray:res.data.lunchRecipes,
          diArray:res.data.dinnerRecipes
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