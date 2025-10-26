// 设置高德地图安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "2f88cff2411396a1a7bd8bed47780c70",
};

// 加载地图API（使用AMapLoader方式）
AMapLoader.load({
  key: "b1869bc9231e4790eb55c0fadeae157f", 
  version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  plugins: [], //可以在这里添加需要的插件
})
  .then((AMap) => {

    //创建默认图层
    const layer = new AMap.createDefaultLayer({
        zooms: [3, 20], //可见级别
        visible: true, //是否可见
        opacity: 1, //透明度
        zIndex: 0, //叠加层级
    });

    //初始化地图
    const map = new AMap.Map("container", {
      viewMode: '2D', //默认使用 2D 模式
      zoom: 11, //地图级别
      center:  [110.38467, 21.2802], //地图中心点（北京）
      mapStyle: "amap://styles/macaron", //设置地图的显示样式
    });


    //创建并添加路况图层
    const traffic = new AMap.TileLayer.Traffic({
        autoRefresh: true, //是否自动刷新，默认为false
        interval: 180, //刷新间隔，默认180s
    });
    map.add(traffic); //通过add方法添加图层
    traffic.show(); //显示路况图层
    //traffic.hide(); //隐藏路况图层

    //异步加载控件
    AMap.plugin('AMap.ToolBar',function(){ 
        var toolbar = new AMap.ToolBar(); //缩放工具条实例化
        map.addControl(toolbar); //添加控件
    });
    toolbar.show(); 

    
    // 可以在这里添加更多地图功能
    console.log("地图初始化成功");
  })
  .catch((e) => {
    console.error("地图加载失败:", e); //加载错误提示
  });



