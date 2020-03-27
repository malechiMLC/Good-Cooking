// pages/sharelist/share.js

//mask
const app = getApp()
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoArray:[
      {
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"这里是内容",
        avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
        author:"作者名",
        likeNum:'2000'
      },{
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"这里是标题",
        avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
        author:"作者名",
        likeNum:'2000'
      },{
        bgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",        
        text:"这里是标题",
        avatarUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
        author:"作者名",
        likeNum:'2000'
      }
    ],

    //Mask
    showModal: false,
    img_url: [],
    content: '',    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    // 获取分享列表
    // wx.request({
    //   url: 'https://csquare.wang/post',
    //   method: 'GET',
    //   data: { },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     var temp_array=[]
    //     for(var i=0;i<res.length;i++){
    //       var obj
    //       obj.author=res.data[i].name
    //       obj.bgUrl=res.data[i].images[0]
    //       obj.text=res.data[i].text
    //       obj.avatarUrl=res.data[i].profile
    //       obj.likeNum=res.data[i].images.length*10+1     //fake likeNum

    //       temp_array.push(obj)
    //     }

    //     _this.setData({
    //       infoArray:temp_array
    //     })
    //   }
    // })
  },

  tosearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  towrite:function(){
    //展示蒙层
    console.log("展示蒙层")
    this.setData({
      showModal: true
    })
  },

  toedit: function () {
    //跳转到写菜谱页面
    console.log("跳转到写菜谱页面")
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
  },

  /**
   * Mask
   */

  preventTouchMove: function () {

  },

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
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {

        if (res.tempFilePaths.length > 0) {

          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }

          //把每次选择的图push进数组
          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })

        }

      }
    })
  },


  //提交
  submit: function () {
    let that = this;
    let images = that.data.img_url;
    let text = that.content;
    var TIME = util.formatTime(new Date());
    wx.request({
      url: 'https://csquare.wang/post',
      method: 'GET',
      data: {
        openid: app.globalData.openId,
        images: images,
        text: text,
        time: TIME,
      },
      header: {
        'content-type': 'application.json'
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
        that.setData({
          showModal: false
        })
      },
      fail() {
        console.log('fail')
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 1500
        })
      }
    })
  },

  //中途退出
  close: function () {
    this.setData({
      img_url: [],
      showModal: false
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