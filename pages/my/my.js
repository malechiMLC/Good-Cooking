// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "中华小神厨",
    avater: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",
    sex:'',
    talk: "这个人很懒，还没有写介绍┑(￣Д ￣)┍.....................",
    followingnum: "111",
    followernum: "222",
    likenum: "333",
    imgBase: app.globalData.imgBase
  },

  //事件处理函数
  infoBindTap:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              console.log(app.globalData)
              app.globalData.userInfo = res.userInfo
              this.setData({
              })
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        }
        else{
          console.log('尚未授权')
          wx.showModal({
            title: '请先登录',
            content: '新用户请点击授权登录获取更多服务哦',
            showCancel: false
          })
        }
      }
    })
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

  bindGetUserInfo: function (e) {
    console.log(app.globalData.loginSuccess)
    console.log(app.globalData.wechatStepsAuthorizationSuccess)
    if(app.globalData.loginSuccess && app.globalData.wechatStepsAuthorizationSuccess){
      wx.showToast({
        title: '您已登录',
        icon: 'success'
      })
    }
    else{
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        // 获取到用户的信息了，打印到控制台上看下
        console.log("用户的信息如下：");
        console.log(e.detail.userInfo);
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                  // 根据自己的需求有其他操作再补充
                  // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                  wx.login({
                    success: res => {
                      app.globalData.loginSuccess = true;
                      // 获取到用户的 code 之后：res.code
                      console.log("用户的code:" + res.code);
                      //获取用户openid 虽然我觉得传secret会被微信暴打
                      wx.request({
                        url: 'https://csquare.wang/openid',
                        data: {
                          "appid": "wxfdbdf9572f3ae678",
                          "secret": "5fecb5d7093bb4a17d7d77cb19cf37a2",
                          "js_code": res.code,
                          "grant_type": "authorization_code"
                        },
                        header: {
                          'content_type': "application/json"
                        },
                        method: "GET",
                        success(res) {
                          console.log(res.data.openid)
                          app.globalData.openId = res.data.openid
                        },
                        fail(res) {
                          console.log(res)
                        }
                      })
                    }
                  });
                }
              });
              wx.login({
                success: function () {
                  wx.getWeRunData({
                    success(res) {
                      app.globalData.wechatStepsAuthorizationSuccess = true
                      app.globalData.mycloudId = res.cloudID;
                      console.log("success:" + app.globalData.mycloudId);
                      wx.cloud.callFunction({
                        name: 'getSteps',
                        data: {
                          weRunData: wx.cloud.CloudID(app.globalData.mycloudId), // 这个 CloudID 值到云函数端会被替换
                          obj: {
                            shareInfo: wx.cloud.CloudID(app.globalData.mycloudId), // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
                          }
                        }
                      }).then(res => {
                        console.log(res);
                        app.globalData.step = res.result.weRunData.data.stepInfoList[30].step;
                        console.log("步数" + app.globalData.step);
                        wx.redirectTo({
                          url: '/pages/home/home',
                        })
                      })
                    }, fail() {
                      console.log("fail");
                    }
                  })
                }, fail() {
                  console.log("失败");
                  wx.showToast({
                    title: '授权失败,请在微信中删除本小程序（清空缓存）后重新添加进入',
                    string: 'none',
                    duration: 3000
                  })
                }
              })
            } else {
              // 用户没有授权
            }
          }
        });
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，小程序无法为您提供进一步服务，请重新授权！',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    }
  },
})