// pages/search/search.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    URI:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    _this.setData({
      search: this.search.bind(this)
    })

    // 获取历史搜索
    wx.request({
      url: 'https://csquare.wang/search/history',
      method: 'GET',
      data: {
        openid:app.globalData.openId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
       _this.setData({
         historyWords:res.data
       })
      }
    })

    // 获取热门搜索
    wx.request({
      url: 'https://csquare.wang/search/hot',
      method: 'GET',
      data: {
        openid:app.globalData.openId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
       _this.setData({
         hotWords:res.data
       })
      }
    })
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

  img2Base642URI:function(){
    var _this=this
    var FSM = wx.getFileSystemManager()
    // 获取图片
    wx.chooseImage({
      count: 1,
      success: function(e) {
        FSM.readFile({
          filePath: e.tempFilePaths[0],
          encoding: "base64",
          success: function(res) {
            console.log(encodeURI(res.data))
            _this.setData({
              URI:encodeURI(res.data)
            })
            console.log(_this.data.URI)
            _this.getCate()
          }
        })
      }
  })

    FSM.readFile({
      filePath: '/images/timg.jpg',
      encoding: "base64",
      success: function(res) {
        console.log(encodeURI(res.data))
        _this.setData({
          URI:encodeURI(res.data)
        })
        console.log(_this.data.URI)
        _this.getCate()
      }
    })
  },

  

  getCate:function(){
    var _this=this
    var access_token
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=dHI6TB3SArO6YVxOkDvcnzwv&client_secret=EoSU8wLzXIpb7yqyFIFuk6rzIU3E1h3C',
      method: 'POST',
      data: { },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        access_token = res.data.access_token
        console.log(_this.data.URI)
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token='+access_token,
          method: 'POST',
          data: {
            image:_this.data.URI,
            filter_threshold:0.95
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(e) {
            console.log(e.data.result[0].name)
            wx.navigateTo({
              url: '/pages/searchResult/searchResult',
              success: function(res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.data.result[0].name })
              }
            })
          }
        })
      }
    })    
  },

  usecamera:function(){
    var _this=this
    _this.img2Base642URI()
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