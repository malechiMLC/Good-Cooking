// pages/homepage/homepage.js
const app=getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    otherOpenId:'111',      //个人主页的所有者的openid
    name:'个人主页',
    sex:'2',
    profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg',
    follows:[{
      openid:'111',
      name:'被关注用户1',
      sex:'0',
      profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg'
    },{
      openid:'222',
      name:'被关注用户2',
      sex:'2',
      profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg'
    },{
      openid:'333',
      name:'被关注用户3',
      sex:'2',
      profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg'
    }],
    followsLength:3,
    followers:[{
      openid:'111',
      name:'关注用户1',
      sex:'1',
      profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg'
    },{
      openid:'222',
      name:'关注用户2',
      sex:'1',
      profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg'
    },{
      openid:'333',
      name:'关注用户3',
      sex:'2',
      profile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585590556936&di=d28106696f36c2e6152f1f874451e3a0&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft013f09f1d8e07f62ce.jpg'
    }],
    followersLength:3,
    likes:0,
    iffollow:'关注',    //关注/取消关注
    btnColor:'red',
    txtColor:'white',
    caipuColor:'#777',
    dongtaiColor:'#bbb',
    shoucangColor:'#bbb',
    dongtaiArray:[
    ],
    caipuArray:[
    ],
    shoucangArray:[
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
      }],
    iscaipu:true,
    isshoucang:false,
    isdongtai:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1')
    console.log(options.otherOpenId)
    var _this=this
    _this.setData({
      otherOpenId:options.otherOpenId
    })
    console.log(_this.data.otherOpenId)
  // 获取个人主页信息
   wx.request({
    url: 'https://csquare.wang/user/',
    method: 'GET',
    data: {
      openid:_this.data.otherOpenId
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      _this.setData({
        // name:res.data.name,
        // sex:res.data.sex,
        profile:res.data.profile
      })
      console.log(res)
    }
  })

    // 关注了谁
    wx.request({
      url: 'https://csquare.wang/user/'+_this.data.otherOpenId+'/follow',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          follows:res.data,
          followsLength:res.data.length
        })
      }
    })
    //被谁关注了
    wx.request({
      url: 'https://csquare.wang/user/'+_this.data.otherOpenId+'/follower',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        _this.setData({
          followers:res.data,
          followersLength:res.data.length
        })
      }
    })
    //获赞数
    // wx.request({
    //   url: 'https://csquare.wang/like/post/'+app.globalData.openId+'/number',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     _this.setData({
    //       likes:res.data
    //     })
    //   }
    // })
    // 登录者是否关注了这个人
    // wx.request({
    //   url: 'https://csquare.wang/user/'+app.globalData.openId+'/follow',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     var follows=[]
    // follows=res.data
    // for(var i=0;i<follows.lenght;i++){
    //   if(follows[i].openid==app.globalData.openId){
    //     _this.setData({
    //       iffollow:'取消关注',
          // btnColor:'white',
          // txtColor:'red'
    //     })
    //   }
    // }
    //   }
    // })

    // 获取分享列表
    wx.request({
      url: 'https://csquare.wang/post',
      method: 'GET',
      data: { 
        openid:_this.data.otherOpenId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var temp_array=[]
        for(var i=0;i<res.data.length;i++){
          var obj = {}
          obj.author=res.data[i].name
          obj.bgUrl=res.data[i].images[0]
          obj.text=res.data[i].text
          obj.avatarUrl=res.data[i].profile
          obj.openid=res.data[i].openid
          obj.id=res.data[i].id
          temp_array.push(obj)
        }
        _this.setData({
          dongtaiArray:temp_array
        })
        console.log(_this.data.dongtaiArray)
      }
    }) 

    // 获取菜谱列表
    wx.request({
      url: 'https://csquare.wang/recipe',
      method: 'GET',
      data: {
        openid:_this.data.otherOpenId
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
            var temp_array=[]
            for(let i=0;i<res.data.length;i++){
              var obj = {}
              obj.timeNeeded=res.data[i].timeNeeded
              obj.bgUrl=res.data[i].image
              obj.text=res.data[i].name
              obj.difficulty=res.data[i].difficulty
              obj.id=res.data[i].id
              temp_array.push(obj)
            }
            console.log(temp_array)
            _this.setData({
              caipuArray:temp_array
            })
      }
    })

    // 获取收藏列表
    wx.request({
      url: 'https://csquare.wang/favorite/user/'+_this.data.otherOpenId,
      method: 'GET',
      data: { },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        var temp_array=[]
        for(var i=0;i<res.data.length;i++){
          var obj = {}
          obj.timeNeeded = res.data[i].timeNeeded
          obj.bgUrl=res.data[i].image
          obj.text=res.data[i].title
          obj.difficulty=res.data[i].difficulty
          obj.id=res.data[i].id
          temp_array.push(obj)
        }
        _this.setData({
          shoucangArray:temp_array
        })
      }
    })
    wx.setNavigationBarTitle({
      title: _this.data.name
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
    console.log('1')
    var _this=this
    // _this.setData({
    //   otherOpenId:options.otherOpenId
    // })

    console.log(_this.data.otherOpenId)
  // 获取个人主页信息
   wx.request({
    url: 'https://csquare.wang/user/',
    method: 'GET',
    data: {
      openid:_this.data.otherOpenId
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      _this.setData({
        name:res.data.name,
        sex:res.data.sex,
        profile:res.data.profile
      })
      console.log(res)
    }
  })
  },

  iffollow:function(){
    var _this=this
    // 关注
    if(_this.data.iffollow=='关注'){
      wx.request({
          url: 'https://csquare.wang/user/'+app.globalData.openId+'/follow',
          method: 'POST',
          data: {
            folOpenid: _this.data.otherOpenId
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(_this.data.otherOpenId)
            console.log(res)
            if(res.data=='true'){
              _this.setData({
                iffollow:'取消关注',
                btnColor:'white',
                txtColor:'red',
                followersLength:1
              })
            }
          }
        })
    }
    // 取消关注
    else if(_this.data.iffollow=='取消关注'){

      wx.request({
        url: 'https://csquare.wang/user/'+app.globalData.openId+'/follow',
        method: 'DELETE',
        data: {
          followid: _this.data.otherOpenId
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res.data)
          if(res.data=='true'){
            _this.setData({
              iffollow:'关注',
              btnColor:'red',
              txtColor:'white'
            })
          }
        }
      })
    }
  },
  changetab:function(e){
    var _this=this
    if(e.currentTarget.id=='caipu'){
      _this.setData({
        iscaipu:true,
        isdongtai:false,
        isshoucang:false,
        caipuColor:'#777',
        dongtaiColor:'#bbb',
        shoucangColor:'#bbb'
      })
    }else if(e.currentTarget.id=='dongtai'){
      _this.setData({
        iscaipu:false,
        isdongtai:true,
        isshoucang:false,
        caipuColor:'#bbb',
        dongtaiColor:'#777',
        shoucangColor:'#bbb'
      })
    }else if(e.currentTarget.id=='shoucang'){
      _this.setData({
        iscaipu:false,
        isdongtai:false,
        isshoucang:true,
        caipuColor:'#bbb',
        dongtaiColor:'#bbb',
        shoucangColor:'#777'
      })
    }
  },
  showfollows:function(){
    var _this=this
    wx.navigateTo({
      url: '/pages/followlist/followlist',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.data.follows})
      }
    })
  },
  showfollowers:function(){
    var _this=this
    wx.navigateTo({
      url: '/pages/followlist/followlist',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.data.followers})
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