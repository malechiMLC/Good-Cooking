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
    swiperRecipes: [],
    recommendRecipes: [],
    currPage: 0,
    allViewed: false,
    todayRecipes: []
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

  getSwiperRec() {
    var that = this
    wx.request({
      url: 'https://csquare.wang/recipe/recommendation',
      data: {
        openid: app.globalData.openId,
      },
      method: 'get',
      success(res) {
        console.log(res.data)
        that.setData({
          swiperRecipes: res.data
        })
      },
    })
  },

  
  getTodayRecipes() {
    var that = this
    wx.request({
      url: 'https://csquare.wang/recipe/today',
      data: {
        openid: app.globalData.openId,
      },
      method: 'get',
      success(res) {
        console.log(res.data)
        var breakfast = res.data.breakfastRecipes;
        var lunch  = res.data.lunchRecipes;
        var dinner = res.data.dinnerRecipes;
        var todayRec = [];
        for(var i=0;i<breakfast.length;i++){
          todayRec.push({
            id: breakfast[i].id,
            title: '早餐·' + breakfast[i].title,
            image: breakfast[i].image,
          })
        }
        for(var i=0;i<lunch.length;i++){
          todayRec.push({
            id: lunch[i].id,
            title: '午餐·' + lunch[i].title,
            image: lunch[i].image,
          })
        }
        for(var i=0;i<dinner.length;i++){
          todayRec.push({
            id: dinner[i].id,
            title: '晚餐·' + dinner[i].title,
            image: dinner[i].image,
          })
        }
        that.setData({
          todayRecipes: todayRec,
        })
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
            title: '更多美味敬请期待',
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

  clickCard(e) {
    var index = e.currentTarget.dataset.index
    var that = this;
    wx.navigateTo({
      url: '/pages/recipe/recipe',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(that.data.recommendRecipes[index].id)
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: that.data.recommendRecipes[index].id
        })
      }
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

  swiperClicked: function (e) {
    var index = e.currentTarget.dataset.index
    var that = this;
    wx.navigateTo({
      url: '/pages/recipe/recipe',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(that.data.swiperRecipes[index].id)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.swiperRecipes[index].id })
      }
    })
  },

  scrollClicked(e){
    var index = e.currentTarget.dataset.index
    var that = this;
    wx.navigateTo({
      url: '/pages/recipe/recipe',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        console.log(that.data.todayRecipes[index].id)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.todayRecipes[index].id })
      }
    })
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
            that.getSwiperRec();
            that.getTodayRecipes();
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