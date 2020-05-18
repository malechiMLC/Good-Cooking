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
    commentnum: 0,
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
          var num = parseInt(that.data.likenum) + 1
          that.setData({
            liked: true,
            likenum:num.toString()
          })
        },
      })
    } else {
      var that = this
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
      url: 'https://csquare.wang/comment/post/' + that.data.postid,
      method: 'POST',
      data: {
        openid: app.globalData.openId,
        content: that.data.commenttext
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
      url: 'https://csquare.wang/comment/post/' + that.data.postid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var temp_array = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = {}
          obj.openid = res.data[i].openid,
          obj.name = res.data[i].name,
          obj.avatar = res.data[i].profile,
          obj.content = res.data[i].content
          temp_array.push(obj)
        }
        if(temp_array.length>0){
          that.setData({
            commentArray: temp_array,
            commentnum:temp_array.length
          })
        }
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
        that.setData({
          likenum:res.data
        })
        //点赞
        var oldlikenum = res.data
        var newlikenum
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
            //获取数
            wx.request({
              url: 'https://csquare.wang/like/post/' + that.data.postid + '/number',
              method: 'GET',
              data: {},
              header: {
                'content-type': 'application/json'
              },
              success(res){
                newlikenum = res.data
                if (newlikenum == oldlikenum) {
                  that.setData({
                    liked: true
                  })
                } else {
                  that.setData({
                    liked: false
                  })
                  //取消点赞
                  wx.request({
                    url: 'https://csquare.wang/like/post/' + that.data.postid,
                    method: 'DELETE',
                    data: {
                      openid: app.globalData.openId,
                    },
                    header: {
                      'content-type': 'application/json'
                    }
                  })
                }
              }
            })
          }
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