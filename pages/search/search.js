// pages/search/search.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyWords:['茄子','早餐','晚餐','排骨','早餐','晚餐','排骨','茄子','早餐','晚餐','排骨','茄子','早餐','晚餐','排骨'],
    hotWords:['茄子','早餐','晚餐','排骨','早餐','晚餐','排骨']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })

    // // 获取历史搜索
    // wx.request({
    //   url: 'https://csquare.wang/search/history',
    //   method: 'GET',
    //   data: {
    //     openid:app.globalData.openid
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //    this.setData({
    //      historyWords:res.histories
    //    })
    //   }
    // })

    // // 获取热门搜索
    // wx.request({
    //   url: 'https://csquare.wang/search/hot',
    //   method: 'GET',
    //   data: {
    //     openid:app.globalData.openid
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //    this.setData({
    //      hotWords:res.hotWords
    //    })
    //   }
    // })
  },

  search: function (value){
    //temp_list  输入内容的联想
    var temp_list=[]
    for (var i = -1; i < this.data.hotWords.length; i++){
      if(i<0){
        var obj = {text:value, value: 1}
        temp_list.push(obj)
      }
      else{
        var obj = {text:value+this.data.hotWords[i], value: i+1}
        temp_list.push(obj)
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(temp_list)
      }, 200)
  })
  },

  selectResult: function (e) {
    var keyword_send = e.detail.item.text
    wx.navigateTo({
      url: '/pages/searchResult/searchResult',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.detail.item.text })
      }
    })

  },

  sendKeyword:function(e){
    wx.navigateTo({
      url: '/pages/searchResult/searchResult',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.detail })
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