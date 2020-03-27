Page({
  data: {
    title:'',
    image:'',
    timeNeeded:'',
    difficulty:'',
    size:'',
    ingredients:'',
    nutrition:[],
    steps:'',
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

  },

  //submit
  submit:function(){
    let that = this;
    let da = that.data;
    let ing =JSON.stringify(da.ingredients);
    let nut = JSON.stringify(da.nutrition);
    let ste = JSON.stringify(da.steps);
    wx.request({
      url: 'https://csquare.wang/recipe',
      method:'POST',
      data:{
        title:da.title,
        image:da.image,
        timeNeeded:da.timeNeeded,
        difficulty:da.difficulty,
        size:da.size,
        ingredients:ing,
        nutrition:nut,
        steps:ste,
      },
      header:{
        'content-type': 'application.json'
      },
      success(res) {
        console.log(res);
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
    var that = this;
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
  inputStep: function (e) {
    var that = this;
    that.editorCtx.getContents({
      success: function (res) {
        console.log(res.html)
        wx.setStorageSync("content", res.html); // 缓存本地
        that.setData({
          steps:res.html
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
