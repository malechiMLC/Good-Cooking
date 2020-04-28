// pages/editor/editor.js

const app = getApp()
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()

Page({
  data: {
    title:'',
    image_url:'',
    timeNeeded:'',
    difficulty:'',
    size:'',
    ingredients:'',
    nutrition:'',
    steps:'',

    //chooseIcon
    icon:'/images/add.png',
    cover_url:'',
    head: 'http://q8xdn54oe.bkt.clouddn.com/',

    //editor
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
  },

  //exit
  exit:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  //submit
  submit:function(){
    var that = this;
    var TIME = Date.parse(new Date())
    console.log(this.data.steps)
    wx.request({
      url: 'https://csquare.wang/recipe',
      method:'POST',
      data:{
        openid: app.globalData.openId,
        time:TIME,
        title: that.data.title,
        image: that.data.cover_url,
        timeNeeded: that.data.timeNeeded,
        difficulty: that.data.difficulty,
        size: that.data.size,
        ingredients: that.data.ingredients,
        nutrition: that.data.nutrition,
        steps: that.data.steps,
      },
      header:{
        'content-type': 'application/json'
      },
      success(res) {
        console.log('upload success');
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
      },
    })
  },

  //inputs
  inputTitle:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  inputDif: function(e) {
    this.setData({
      difficulty:e.detail.value
    })
  },
  inputTime: function (e) {
    this.setData({
      timeNeeded: e.detail.value
    })
  },
  inputSize: function (e) {
    this.setData({
      size: e.detail.value
    })
  },
  inputIng: function (e) {
    this.setData({
      ingredients: e.detail.value
    })
  },
  inputNur: function (e) {
    this.setData({
      nutrition: e.detail.value
    })
  },
  inputStep: function (e) {
    const value = e.detail.html
    this.data.steps = value
    console.log(value)
  },
  //get cover
  chooseCover:function(){
    var that=this;
    wx.chooseImage({
      count: 1,  
      sizeType: ['compressed'], // 指定压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      success: function (res) {
        var filePath = res.tempFilePaths[0]
        console.log(filePath)
        //前台展示
        that.setData({
          icon: filePath,
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
                that.setData({
                  cover_url: imageurl
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

  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  onLoad() {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })

    //语音识别初始化
    this.initRecord()
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    var url
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 指定压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        console.log(filePath)
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
                url = that.data.head + dataObject.key;
                //前台展示
                that.editorCtx.insertImage({
                  src: url,
                  data: {
                    id: 'abcd',
                    role: 'god'
                  },
                  width: '80%',
                  success: function () {
                    console.log('insert image success')
                  }
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
      that.editorCtx.insertText({
        text: res.result,
      })
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
})
