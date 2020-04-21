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
    topRecLst: [],
    recommendRecipes: [],
    currPage: 0,
    allViewed: false,
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
    //这个函数success后才会调用获取信息推荐
  },

  getTopRec() {
    wx.request({
      url: 'https://csquare.wang/recipe/recommendation',
      data: {
        openid: app.globalData.openId,
      },
      method: 'get',
      success(res) {
        console.log(res.data)
      },
    })
  },

  getRecommendRecipes() {
    console.log("getRecommendRecipes")
    var that = this;
    wx.request({
      url: 'https://csquare.wang/recommendation/user/' + app.globalData.openId,
      data: {
        page: that.data.currPage,
        size: 5
      },
      method: 'get',
      success(res) {
        console.log(res.data)
        if (that.data.allViewed) {
          wx.showToast({
            title: '更多菜谱敬请期待',
            icon: 'none',
            duration: 2000
          })
        } else {
          var new_Array = that.data.recommendRecipes;
          for (var i = 0; i < res.data.data.length; i++) {
            new_Array.push(res.data.data[i]);
          }
          that.setData({
            recommendRecipes: new_Array,
            currPage: that.data.currPage + 1
          })
          if (that.data.currPage >= res.data.totalPages) {
            that.setData({
              allViewed: true,
            })
          }
          console.log(that.data.currPage)
        }
      },
    })
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
    console.log('触底刷新')
    this.getRecommendRecipes()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  swiperChanged: function (e) {
    this.setData({
      currentImage: e.detail.current
    })
  },

  swiperClicked: function () {
    console.log(this.data.currentImage)
  },

  //登录以及老用户直接获取用户信息
  loginAndGetUserInfo: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        console.log(res)
        //这样不太好.....但是省事
        wx.request({
          url: app.globalData.server + 'openid',
          data: {
            appid: 'wx58f90beac70c6284',
            secret: '7445557abf79f7371a4056035e0ee901',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            app.globalData.openId = res.data.openid
            console.log(app.globalData.openId)
            that.getTopRec();
            that.getRecommendRecipes(0);
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
            } else {
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

  toToday: function () {
    wx.navigateTo({
      url: '/pages/today/today',
    })
  },
})