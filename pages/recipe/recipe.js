// pages/recipe/recipe.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liked:false,
    collected:false,
    commented:false,
    commentnum: '111',
    collectnum: '222',
    commenttext:'',
    rid:10,
    title: "",
    image:'',
    timeNeeded:'',
    difficulty:'',
    size:'',
    ingredients:'',
    nutrition:'',
    steps: '',
    commentArray: []
  },

  //点击collet按钮
  onCollect:function(){
    if (!this.data.collected) {
      var that = this
      //收藏
      wx.request({
        url: 'https://csquare.wang/favorite/user/' + app.globalData.openId + '/recipe/' + that.data.rid,
        method: 'POST',
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('collect success')
          var num = parseInt(that.data.collectnum)+1
          that.setData({
            collected: true,
            collectnum:num.toString()
          })
       },
      })
    } else {
      var that = this
      //取消收藏
      wx.request({
        url: 'https://csquare.wang/favorite/recipe/' + that.data.rid,
        method: 'DELETE',
        data: {
          openid: app.globalData.openId,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('delete success')
          var num = parseInt(that.data.collectnum) - 1
          that.setData({
            collected: false,
            collectnum: num.toString()
          })
        },
      })
    }
  },
  //点击comment按钮
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
  //
  inputComment:function(e){
    this.setData({
      commenttext: e.detail.value
    })
  },
  //提交评论
  commitComment:function(){
    var that = this
    wx.request({
      url: 'https://csquare.wang/comment/recipe/'+ that.data.rid,
      method:'POST',
      data:{
        openid: app.globalData.openId,
        content:that.data.commenttext
      },
      header:{
        'content-type': 'application/json'
      },
      success(res){
        console.log("comment success")
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
        var num = parseInt(that.data.commentnum) + 1
        that.setData({
          commented:false,
          commentnum:num.toString()
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // //页面跳转参数处理
    // let eventChannel = this.getOpenerEventChannel();
    // eventChannel.on('acceptDataFromOpenerPage', function (data) {
    //   that.setData({
    //     rid: data.data
    //   })
    // })

    //获取食谱
    wx.request({
      url: 'https://csquare.wang/recipe/' + that.data.rid,
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          difficulty:res.data.difficulty,
          image:res.data.image,
          ingredients:res.data.ingredients,
          nutrition:res.data.nutrition,
          size:res.data.size,
          steps:res.data.steps,
          timeNeeded:res.data.timeNeeded,
          title:res.data.title,
          uid:res.data.openid,
          time:res.data.time,
        })
        var temp_array = []
        new Promise((resolve, reject) => {
          // 获取评论列表
          wx.request({
            url: 'https://csquare.wang/comment/recipe/' + that.data.rid,
            method: 'GET',
            data: {
            },
            header: {
              'content-type': 'application/json'
            },
            success(response) {
              for (let i = 0; i < response.data.length; i++) {
                let obj = {}
                obj.comment = response.data[i].content,
                obj.openid = response.data[i].openid,
                new Promise((response, reject) => {
                  //获取用户头像
                  wx.request({
                    url: 'https://csquare.wang/user',
                    method: 'GET',
                    data: {
                      openid: obj.openid
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success(resp) {
                      obj.name = resp.data.name
                      obj.avatar = resp.data.profile
                    }
                  })
                })
                temp_array.push(obj)
              }
            }
          })
        })
        that.setData({
          commentArray: temp_array
        })
      }
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
    var that = this
    var temp_array = []
      // 获取评论列表
    
      wx.request({
        url: 'https://csquare.wang/comment/recipe/' + that.data.rid,
        method: 'GET',
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        success(response) {
          for (let i = 0; i < response.data.length; i++) {
            let obj = {}
            obj.comment = response.data[i].content,
            obj.openid = response.data[i].openid
            // if (obj.openid = null){
            //   obj.openid = "ovQMG5twIxjfeMk7WdJt8hAIZDBQ"
            // }
            new Promise((response, reject) => {
              //获取用户头像
              wx.request({
                url: 'https://csquare.wang/user',
                method: 'GET',
                data: {
                  openid: obj.openid
                },
                header: {
                  'content-type': 'application/json'
                },
                success(resp) {
                  obj.name = resp.data.name
                  obj.avatar = resp.data.profile
                }
              })
            })
            temp_array.push(obj)
          }
          that.setData({
            commentArray: temp_array
          })
          console.log(temp_array)
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

  }
})