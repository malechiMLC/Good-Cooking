// pages/post/post.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liked: false,
    commented: false,
    likenum: '',
    commentnum: '',
    commenttext: '',
    postid:'',
    postuserid:'',
    name:'',
    avatar:'',
    images:[],
    text:'',
    time:'',
    commentArray: []
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
  //获取评论列表
  getComments:function(){
    var that = this
    wx.request({
      url: 'https://csquare.wang/comment/recipe/' + that.data.postid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        var temp_array = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = {}
          obj.openid = res.data[i].openid,
            obj.name = res.data[i].name,
            obj.avatar = res.data[i].profile,
            obj.content = res.data[i].content
          temp_array.push(obj)
        }
        that.setData({
          commentArray: temp_array
        })
      }
    })
  },
  getLikes:function(){
    var that = this
    wx.request({
      url: 'https://csquare.wang/like/post/' + that.data.postid + '/number',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          likenum:res.data
        })
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
    that.setData({
      postid: options.postid
    })
    // 获取分享详情
    wx.request({
      url: 'https://csquare.wang/post/' + this.data.postid,
      method:'GET',
      data:{
      },
      header:{
        'content-type': 'application/json'
      },
      success(res){
        console.log(res)
        that.setData({
          postuserid:res.data.openid,
          name:res.data.name,
          avatar:res.data.profile,
          images:res.data.images,
          text:res.data.text,
          time:res.data.time
        })
      }
    })
    that.getComments()
    that.getLikes()
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