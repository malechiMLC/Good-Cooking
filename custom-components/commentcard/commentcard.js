// custom-components/commentcard/commentcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentArray: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        if (newVal.length>0){
          var that = this
          var temp_array = []
          for (let i = 0; i < newVal.length; i++) {
            let obj = {}
            obj.comment = newVal[i].comment,
            obj.openid = newVal[i].openid
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
          this.setData({
            comments: temp_array
          })
          console.log(that.data.comments)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    comments:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tohomepage: function (e) {
      wx.navigateTo({
        url: '/pages/homepage/homepage?otherOpenId=' + e.currentTarget.id,
      })
    },
  }
})
