// pages/followlist/followlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[{
      openid:'111',
      name:'被关注用户1',
      sex:'0',
      profile:'http://pic4.zhimg.com/50/v2-236c74303ee2e7da84cab2b21b8ef30b_hd.jpg'
    },{
      openid:'222',
      name:'被关注用户2',
      sex:'1',
      profile:'http://pic4.zhimg.com/50/v2-236c74303ee2e7da84cab2b21b8ef30b_hd.jpg'
    },{
      openid:'333',
      name:'被关注用户3',
      sex:'2',
      profile:'http://pic4.zhimg.com/50/v2-236c74303ee2e7da84cab2b21b8ef30b_hd.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    //   _this.setData({
    //     userList:data
    //   })
    // })
  },
  touserhomepage:function(e){
    wx.redirectTo({
      url: '/pages/homepage/homepage?otherOpenId='+e.currentTarget.id,
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