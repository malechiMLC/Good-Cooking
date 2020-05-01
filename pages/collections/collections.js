// pages/collections/collections.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'ovQMG5twIxjfeMk7WdJt8hAIZDBQ',
    collects:[
      {
        title:"菜名",
        image:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        timeNeeded:"10min",
        difficulty:"0基础",
        rid:10,
        avatar:'',
        author:'',
        time:'',
      }, {
        title: "菜名",
        image: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        timeNeeded: "10min",
        difficulty: "0基础",
        rid:10,
        avatar: '',
        author: '',
        time: '',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取收藏列表
    wx.request({
      url: 'https://csquare.wang/favorite/user/' + that.data.openid,
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

  clickCard(e) {
    var index = e.currentTarget.dataset.index
    var that = this;
    wx.navigateTo({
      url: '/pages/recipe/recipe',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(that.data.collects[index].rid)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.collects[index].rid })
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