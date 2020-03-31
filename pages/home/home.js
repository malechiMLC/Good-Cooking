// pages/home/home.js
const order = ['demo1', 'demo2', 'demo3']
const app = getApp()
var date = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    currentImage: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  //跳转到写菜谱页面
  toedit: function () {
    console.log("跳转到写菜谱页面")
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //程序的首页 所以一开始加载，也只会加载一次，可以用来处理登录
    // 登录 以及登录的回调里面写了获取推荐数据等等
    this.loginAndGetUserInfo();
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
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

  },

  swiperChanged: function(e){
    this.setData({
      currentImage: e.detail.current
    })
  },

  swiperClicked: function(){
    console.log(this.data.currentImage)
  },

  //登录以及老用户直接获取用户信息
  loginAndGetUserInfo: function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        console.log(res)
        //这样不太好.....但是省事
        wx.request({
          url: app.globalData.server+'openid', 
          data: {
            appid: 'wx58f90beac70c6284',
            secret: '7445557abf79f7371a4056035e0ee901',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            app.globalData.openId = res.data.openid
            console.log(app.globalData.openId)
            wx.request({
              url: app.globalData.server + 'recipe/recommendation', 
              data: {
                openid: app.globalData.openId,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                console.log(res.data)
              },
              fail(res){
                console.log(res)
              }
            })
            wx.request({
              url: app.globalData.server + 'recipe/today', 
              data: {
                openid: app.globalData.openId,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                console.log(res.data)
              },
              fail(res){
                console.log(res)
              }
            })
          },
          fail (res){
            console.log(res)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        wx.getSetting({
          success: res => {
            console.log(res)
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  var userInfo = res.userInfo;
                  app.globalData.userInfo = userInfo;
                }
              })
              app.globalData.loginSuccess = true;
            }
            else{
              console.log('尚未授权')
              wx.showModal({
                title: '请先登录',
                content: '新用户请在我的页面点击授权登录获取更多服务哦',
                showCancel: false
              })
            }
          }
        })
      }
    })
  },

  toToday:function(){
    wx.navigateTo({
      url: '/pages/today/today',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
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

  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})