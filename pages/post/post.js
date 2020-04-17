// pages/post/post.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liked: false,
    commented: false,
    likenum: '111',
    commentnum: '222',
    commenttext: '',
    postid:'',
    postuserid:'',
    name:'昵称',
    avatar:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg',
    images:[
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg",
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1430982764,1384686867&fm=26&gp=0.jpg"
    ],
    text:'今天做了.......今天做了.......今天做了.......今天做了.......今天做了.......今天做了.......今天做了.......今天做了.......今天做了.......今天做了.......',
    time:'2020/4/16 19:00',
    commentArray: [
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg",
        name: 'user',
        comment: "great!"
      },
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg",
        name: 'user',
        comment: "great!"
      },
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg",
        name: 'user',
        comment: "great!"
      }
    ]
  },

  // like
  onLike:function(){
    if (!this.data.liked) {
      var that = this
      wx.request({
        url: 'https://csquare.wang/like/post/' + that.data.postid,
        method: 'POST',
        data: {
          openid: app.globalData.openId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('like success')
          var num = parseInt(that.data.likenum) + 1
          that.setData({
            liked: true,
            likenum:num.toString()
          })
        },
      })
    } else {
      var that = this
      //取消收藏
      wx.request({
        url: 'https://csquare.wang/like/post/' + that.data.postid,
        method: 'DELETE',
        data: {
          openid: app.globalData.openId,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('delete success')
          var num = parseInt(that.data.likenum) - 1
          that.setData({
            liked: false,
            likenum: num.toString()
          })
        },
      })
    }
  },
  // 点击comment按钮
  onComment: function () {
    if (!this.data.commented) {
      this.setData({
        commented: true
      })
    } else {
      this.setData({
        commented: false
      })
    }
  },
  inputComment: function (e) {
    this.setData({
      commenttext: e.detail.value
    })
  },
  // 提交评论
  commitComment: function () {
    var that = this
    wx.request({
      url: 'https://csquare.wang/comment/recipe/' + that.data.rid,
      method: 'POST',
      data: {
        openid: app.globalData.openId,
        content: that.data.commenttext
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log("comment success")
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
        that.setData({
          commented: false
        })
        //刷新评论
        that.getComments()
      }
    })

  },
  // 查看作者主页
  tohomepage: function () {
    wx.navigateTo({
      url: '/pages/homepage/homepage?otherOpenId=' + this.data.postuserid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取分享详情
    // wx.request({
    //   url: 'https://csquare.wang/post/' + '1',
    //   method:'GET',
    //   data:{
    //   },
    //   header:{
    //     'content-type': 'application/json'
    //   },
    //   success(res){
    //     console.log(res)
    //     that.setData({
    //       postuserid:res.data.openid,
    //       name:res.data.name,
    //       avatar:res.data.profile,
    //       images:res.data.images,
    //       text:res.data.text,
    //       time:res.data.time,
    //     })
    //     // 获取评论
    //     wx.request({
    //       url: 'https://csquare.wang/comment/post/' + that.data.postid,
    //       method: 'GET',
    //       data: {
    //       },
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success(res) {
    //         // that.setData({
    //         //   commentArray:res.data
    //         // })
    //       }
    //     })
    //   }
    // })

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