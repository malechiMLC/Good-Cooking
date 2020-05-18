// pages/sharelist/share.js

//mask
const app = getApp()
const util = require('../../utils/util.js');
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoArray:[],
    URI: undefined,
    //Mask
    showModal: false,
    head: 'http://qaj46n6jc.bkt.clouddn.com/',
    img_array: [],
    img_urls: [],
    content: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // _this.gettotalarray()
    wx.request({
      url: 'https://csquare.wang/post',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res)
        var temp_array = []
        for (var i = 0; i < res.data.length; i++) {
          let obj={}
          _this.form(res,temp_array,i,obj)
          .then(_this.getlikenum(obj,obj.id))
          .then(_this.addtoarray(temp_array,obj))
        }
        _this.setData({
          infoArray: temp_array
        })
        console.log(_this.data.infoArray)
    }
    })

    //语音识别初始化
    this.initRecord()
  },
  gettotalarray:function(temp){
    var _this = this
    return new Promise(function (resolve, reject) {
      // 获取分享列表
      wx.request({
        url: 'https://csquare.wang/post',
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          // console.log(res)
          var temp_array = []
          for (var i = 0; i < res.data.length; i++) {
            let obj={}
            _this.form(res,temp_array,i,obj)
            .then(_this.getlikenum(obj,obj.id))
            .then(_this.addtoarray(temp_array,obj))
          }
          _this.setData({
            infoArray: temp_array
          })
          console.log(_this.data.infoArray)
        }
      })
    })
  },

  form:function(res,temp_array,i,obj){
    var _this=this
    return new Promise(function (resolve, reject) {
      obj.author = res.data[i].name
      obj.bgUrl = res.data[i].images[0]
      obj.text = res.data[i].text
      obj.avatarUrl = res.data[i].profile
      obj.openid = res.data[i].openid
      obj.id = res.data[i].id
    })
  },

  getlikenum:function(obj,id){
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://csquare.wang/like/post/' + id + '/number',
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success(response) {
          console.log(response)
          obj.likeNum = response.data
        }
      })
    })
  },

  addtoarray:function(temp_array,obj){
    // console.log(obj)
    temp_array.push(obj)
    // console.log(temp_array)
  },

  tosearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  towrite: function () {
    //展示蒙层
    console.log("展示蒙层")
    this.setData({
      showModal: true
    })
  },

  /**
   * Mask
   */

  //输入内容
  input: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  //选择图片
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 指定压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        console.log(filePath)
        //把图push进数组
        let temp_array = that.data.img_array;
        temp_array.push(filePath)
        //前台显示
        that.setData({
          img_array: temp_array
        })
        //上传图片
        wx.request({
          url: 'https://csquare.wang/uptoken',
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res.data)
            uptoken: res.data

            var fileName = filePath.split('//')[1];
            var urls = that.data.img_urls
            var formData = {
              'token': res.data,
              'key': fileName
            };
            wx.uploadFile({
              url: 'https://upload.qiniup.com',
              filePath: filePath,
              name: 'file',
              formData: formData,
              success: function (res) {
                let dataString = res.data
                let dataObject = JSON.parse(dataString);
                console.log(dataObject)
                let imageurl = that.data.head + dataObject.key;
                urls.push(imageurl);
                that.setData({
                  img_urls: urls
                })
              },
              fail: function (error) {
                console.log(error);
                if (fail) {
                  fail(error);
                }
              }
            })

          }
        })
      }
    })
  },

  //提交
  submit: function () {
    let that = this;
    let images = that.data.img_urls;
    let text = that.data.content;
    var TIME = Date.parse(new Date())
    return new Promise(function (resolve, reject){
      wx.request({
        url: 'https://csquare.wang/post',
        method: 'POST',
        data: {
          openid: app.globalData.openId,
          images: images,
          text: text,
          time: TIME,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          })
          // wx.request({
          //   url: 'https://csquare.wang/user/',
          //   method: 'GET',
          //   data: {
          //     openid: app.globalData.openId
          //   },
          //   header: {
          //    'content-type': 'application/json'
          //    },
          //   success(res) {

          //     // let obj = {}
          //     // obj.bgUrl = images[0]
          //     // obj.text = text
          //     // obj.avatarUrl = res.data.profile
          //     // obj.author = res.data.name
          //     // obj.likeNum = 0
          //     // obj.id = app.globalData.openId
          //     // var tempArray = that.data.infoArray
          //     // tempArray.push(obj)

          //     that.setData({
          //       img_url: [],
          //       img_array: [],
          //       content: '',
          //       showModal: false
          //       // infoArray: tempArray
          //     })
          //   }
          //  })
        }
      })
    })
  },

  //中途退出
  close: function () {
    this.setData({
      img_url: [],
      showModal: false
    })
  },

  //开始识别
  recordBegins: function (e) {
    wx.showLoading({
      title: '启动语音输入',
    })
    manager.start({
      lang: 'zh_CN',
      complete (res) {
        wx.hideLoading()
      }
    })
    wx.showToast({
      title: '正在聆听中',
      icon: 'loading',
      duration: 100000
    })
  },

  recordEnds: function (e) {
    manager.stop()
  },

  initRecord: function(res){
    let manager = plugin.getRecordRecognitionManager();
    var that = this;
    manager.onStop = function(res){
      that.setData({
        content: that.data.content + res.result
      })
      console.log(res.result)
      console.log(that.data.content)
      wx.hideToast()
    }
    manager.onStart = function(res){
      console.log('已开始录音', res)
    }
    manager.onError = function(res){
      wx.hideToast()
      console.log("error:", res.msg)
    }
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