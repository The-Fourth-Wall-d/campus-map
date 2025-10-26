// 设置高德地图安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "2f88cff2411396a1a7bd8bed47780c70",
};

// 加载地图API（使用AMapLoader方式）
AMapLoader.load({
  key: "b1869bc9231e4790eb55c0fadeae157f", 
  version: "2.0",
  plugins: ['AMap.ToolBar'], // 预先加载需要的插件
}) 
  .then((AMap) => {
    console.log("地图API加载成功");
    
    //初始化地图
    const map = new AMap.Map("container", {
      viewMode: '2D',
      zoom: 17, // 提高缩放级别，让标记点更清晰可见
      center: [110.2478, 21.1852], // 调整中心点，让所有点都在可见范围内
      mapStyle: "amap://styles/macaron",
    });

    //直接创建并添加控件，不需要异步加载
    const toolbar = new AMap.ToolBar();
    map.addControl(toolbar);

    //创建并添加路况图层
    const traffic = new AMap.TileLayer.Traffic({
        autoRefresh: true,
        interval: 180,
    });
    map.add(traffic);
    traffic.show();

    //创建信息窗口实例
    const infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -30)
    });

    // 创建多个坐标点的数据数组
    const points = [
      {
        lnglat: [110.245919, 21.185337],
        title: "岭南师范学院主教学楼",
        description: "学校主要的教学建筑，包含多个教室和实验室",
        type: "teaching"
      },
      {
        lnglat: [110.249713,21.185978],
        title: "笃学楼",
        description: "提供丰富的图书资源和安静的学习环境",
        type: "learning"
      },
      {
        lnglat: [110.249757,21.18566],
        title: "敏学楼",
        description: "提供各类美食，满足学生用餐需求",
        type: "dining"
      },
      {
        lnglat: [110.249251,21.1845],
        title: "勤学楼",
        description: "配备完善的体育设施，供学生进行各类运动",
        type: "sports"
      },
      {
        lnglat: [110.249251,21.184418],
        title: "学生宿舍",
        description: "学生休息和生活的场所",
        type: "living"
      }
    ];

    // 根据类型获取不同的图标
    function getIconByType(type) {
      // 使用更可靠的图标地址，并添加备用方案
      const icons = {
        teaching: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-blue.png",
        learning: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-green.png",
        dining: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
        sports: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-purple.png",
        living: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-orange.png"
      };
      return icons[type] || icons.teaching;
    }

    // 遍历数据数组，创建并添加多个标记
    console.log("准备添加" + points.length + "个标记点");
    points.forEach((point, index) => {
      console.log("添加第" + (index + 1) + "个标记点: " + point.title);
      
      //创建Marker对象
      const marker = new AMap.Marker({
        position: new AMap.LngLat(point.lnglat[0], point.lnglat[1]),
        icon: getIconByType(point.type),
        title: point.title,
        offset: new AMap.Pixel(-13, -30),
      });
      
      //添加到地图上
      map.add(marker);
      console.log("标记点" + point.title + "已添加到地图");
      
      //为标记添加点击事件，显示信息窗口
      marker.on('click', function() {
        infoWindow.setContent(`
          <div style="padding: 10px;">
            <h3 style="margin-top: 0;">${point.title}</h3>
            <p>${point.description}</p>
          </div>
        `);
        infoWindow.open(map, marker.getPosition());
      });
    });

    // 输出调试信息
    console.log("地图初始化成功，标记点已添加完成");
  })
  .catch((e) => {
    console.error("地图加载失败:", e);
  });
