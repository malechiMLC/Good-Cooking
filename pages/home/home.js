// pages/home/home.js
const order = ['demo1', 'demo2', 'demo3']
const app = getApp()
var date = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    // 是否显示面板指示点
    indicatorDots: true,
    // 滑动方向是否为纵向
    vertical: false,
    // 是否自动切换
    autoplay: true,
    // 是否采用衔接滑动
    circular: true,
    // 自动切换时间间隔
    interval: 2000,
    // 滑动动画时长
    duration: 500,
    // 前边距，可用于露出前一项的一小部分
    previousMargin: 10,
    // 后边距，可用于露出后一项的一小部分
    nextMargin: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //程序的首页 所以一开始加载，也只会加载一次，可以用来处理登录
    // 登录
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
              url: 'csquare.wang/recipe/recommendation', 
              data: {
                openid: '',
                time: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                console.log(res.data)
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