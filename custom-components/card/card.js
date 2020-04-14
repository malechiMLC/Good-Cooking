// components/card/card.js
const app=getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoArray:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ifactive:[]
  },

  lifetimes:{
    attached: function() {
      var _this=this
      for(var i=0;i<_this.data.infoArray.length;i++){
        _this.data.ifactive.push('false')
      }
    },

  },
  /**
   * 组件的方法列表
   */
  methods: {
    tohomepage:function(e){
      wx.navigateTo({
        url: '/pages/homepage/homepage?otherOpenId='+e.currentTarget.id,
      })
    },
    toshare:function(e){
      // 跳转到动态详情页
    },
    like:function(e){
      var _this=this
      var index=Number(e.currentTarget.id)
      if(_this.data.ifactive[index]=='true'){
        wx.request({
          url: 'https://csquare.wang/like/post/'+_this.data.infoArray[index].id,
          method: 'DELETE',
          data: {
            openid:app.globalData.openId
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            var temp=_this.data.ifactive
            temp[index]='false'
            var temp_1=_this.data.infoArray
            temp_1[index].likeNum--
            _this.setData({
              ifactive:temp,
              infoArray:temp_1
            })
          }
        })
      }else{
        wx.request({
          url: 'https://csquare.wang/like/post/'+_this.data.infoArray[index].id,
          method: 'POST',
          data: {
            openid:app.globalData.openId
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            var temp=_this.data.ifactive
            temp[index]='true'
            var temp_1=_this.data.infoArray
            temp_1[index].likeNum++
            _this.setData({
              ifactive:temp,
              infoArray:temp_1
            })
          }
        })
      }
    }
  }
})
