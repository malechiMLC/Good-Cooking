// pages/editor/editor.js

const app = getApp()

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
    isIOS: false
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
    wx.request({
      url: 'https://csquare.wang/recipe',
      method:'POST',
      data:{
        openid: app.globalData.openId,
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
        that.setData({
          title: '',
          image: '',
          timeNeeded: '',
          difficulty: '',
          size: '',
          ingredients: '',
          nutrition: '',
          steps: '',
        })
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

  recordBegins: function (e) {
    console.log('touch start event')
    const recorder = wx.getRecorderManager()
    const options = {
      duration: 30000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'wav',
      frameSize: 50
    }
    wx.getSetting({
      success: suc => {
        if (suc.authSetting['scope.record'] && !this.data.recordStarted) {
          recorder.start(options)
        } else {
          wx.authorize({
            scope: 'scope.record',
            success: () => {
            },
            fail: () => {
              wx.showToast({
                title: '获取用户授权失败, 无法录音',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  recordEnds: function (e) {
    console.log('touch end event', e)
    var { recordStarted } = this.data
    var delta = 0
    if (!recordStarted) {
      delta = 1000
    }
    setTimeout(() => {
      wx.getRecorderManager().stop()
    }, delta)
  },

  bindRecorderStopEvent: function(){
    recorderManager.onStop((res) => {
      var baiduBccessToken = app.globalData.baiduToken;
      var tempFilePath = res.tempFilePath;//音频文件地址
      // var fileSize = res.fileSize;
      const fs = wx.getFileSystemManager();
      fs.readFile({//读取文件并转为ArrayBuffer
        filePath: tempFilePath,
        success(res) {
          const base64 = wx.arrayBufferToBase64(res.data);
          var fileSize = res.data.byteLength;
          wx.request({
            url: 'https://vop.baidu.com/server_api',
            data: {
              format: 'pcm',
              rate: 16000,
              channel: 1,
              cuid: 'sdfdfdfsfs',
              token: baiduBccessToken,
              speech: base64,
              len: fileSize
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              console.log(res.data);
              var result = res.data.result;
              if (result.length == 0){
                wx.showToast({
                  title: "未识别到语音信息!",
                  icon: 'none',
                  duration: 3000
                })
                return ;
              }
              
              var keyword = result[0];
              keyword = keyword.replace("。", "");
              wx.navigateTo({
                url: '/pages/search/search?keyword=' + keyword
              })
            }
          })
        }
      })
 
      
    })
  },

  speechRecognition: function (res) {
    wx.showToast({
      title: '识别中',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=24.d86fa2092e41a9897f6e64efd77f1c36.2592000.1578540493.282335-17974307',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        image: that.data.resultBase64ImageB,
        filter_threshold: 0.95
      },
      success: function(res) {

        //console.log(res.data.result[0].calorie);
        console.log(res)
        wx.hideToast()
      }
    })
  },
})
