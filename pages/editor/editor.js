// pages/editor/editor.js

const app = getApp()

Page({
  data: {
    title:'',
    image:'',
    timeNeeded:'',
    difficulty:'',
    size:'',
    ingredients:'',
    nutrition:'',
    steps:'',

    //chooseIcon
    icon:'/images/add.png',

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
    let that = this;
    wx.request({
      url: 'https://csquare.wang/recipe',
      method:'POST',
      data:{
        openid: app.globalData.openId,
        title: that.data.title,
        image: that.data.image,
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
        // console.log(that.data.steps)
        that.clear()
        
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
    console.log("chooseimage")
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {

        if (res.tempFilePaths.length > 0) {
            that.setData({
              icon: res.tempFilePaths[0],
              image: res.tempFilePaths[0]
            })
        }
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
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  }
})
