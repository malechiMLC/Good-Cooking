//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 我发现好像app.js的onLaunch严格意义上不一定在home.js的onLoad之前执行
    
    //获取设备信息
    wx.getSystemInfo({
      success: res => {
        // console.log(res.pixelRatio)     //设备像素比
        // console.log(res.windowWidth)    //可使用窗口宽度，单位px
        // console.log(res.windowHeight)   //可使用窗口高度，单位px
        // console.log(res.statusBarHeight)    //状态栏的高度，单位px
        // console.log(res.width)    //安全区域的宽度，单位逻辑像素
        // console.log(res.height)   //安全区域的高度，单位逻辑像素

        this.globalData.windowWidth = res.windowWidth
        this.globalData.windowHeight = res.windowHeight
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.safeWidth = res.width
        this.globalData.safeHeight = res.height
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    server: "https://csquare.wang/",
    imgBase: 'cloud://env-3n8tl.656e-env-3n8tl-1301584149/',
    loginSuccess: false,
    // 适配：微信定义所有屏幕宽度都为750rpx，screenWidth为手机屏幕的实际的宽度（单位px）
    // 1rpx=（screenWidth / 750）px
    windowWidth:0,    //可使用窗口宽度，单位px
    windowHeight:0,   //可使用窗口高度，单位px
    statusBarHeight:0,    //状态栏的高度，单位px
    safeWidth:0,    //安全区域的宽度，单位逻辑像素
    safeHeight:0,   //安全区域的高度，单位逻辑像素
    
  },

})