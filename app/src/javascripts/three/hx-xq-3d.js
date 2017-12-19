// var $ = require('jquery');

function show3Dinit(iItem) {
    
        // alert("function init()");
        var width = window.innerWidth;
        var height = window.innerHeight * 0.45;
    
        // 渲染器（renderer）
        var renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('hx-xq-3d')
        });
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff);
        // 场景（scene）
        var scene = new THREE.Scene();
    
        // 照相机（camera）
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
        camera.position.set(-50, 120, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    
        // 准备控制器 (OrbitControls)
        var controls = new THREE.OrbitControls(camera);
        controls.target = new THREE.Vector3(0, 0, 0);
        /* 设置滚动最小值和最大值 */
        controls.minDistance = 1.5;
        controls.maxDistance = 8;
        /* 设置旋转最小角度和最大角度 */
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI/2;
    
    
        scene.add(camera);
    
    
       
    
        // 贴图（texture loader）
        // var tLoader = new THREE.TextureLoader();
        // var textureFloor = tLoader.load('images/floor.jpg', function() {
        //     renderer.render(scene, camera);
        // });
        // textureFloor.wrapS = THREE.RepeatWrapping;
        // textureFloor.wrapT = THREE.RepeatWrapping;
        // textureFloor.repeat.set(6, 8);
    
        // 汽车模型（model）
        var car;
    
        // 进度条（progress bar）
        var proInfo = document.getElementById('progress-info').getElementsByTagName('span')[0];
        var proWrap = document.getElementById('progress-wrap');
    
        var mtlLoader = new THREE.MTLLoader();
        // mtlLoader.load('model/HX_0' + iItem +'.mtl', function(materials) {
            mtlLoader.load('model/HX_01.mtl', function(materials) {
            var objLoader = new THREE.OBJLoader();//创建loader变量，用于导入模型
            objLoader.setMaterials(materials);
            //第一个表示模型路径，第二个表示完成导入后的回调函数
            //一般我们需要在这个回调函数中将导入的模型添加到场景中
            // objLoader.load('model/HX_0' + iItem + '.obj', function(obj) {
                objLoader.load('model/HX_01.obj', function(obj) {
                obj.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.side = THREE.DoubleSide;
                    }
                });
                obj.scale.set(0.005,0.005,0.005);
                obj.position.set(0, 0, 0);
                obj.rotation.set(-Math.PI / 2, Math.PI / 2, Math.PI / 2);
                car = obj;//储存到变量 car 中
                scene.add(obj);////将导入的模型添加到场景中
                renderer.render(scene, camera);//渲染
            }, function(xhr) {//加载进度条
                if (xhr.lengthComputable) {
                    var percent = +(xhr.loaded / xhr.total * 100).toFixed(2);
                    proInfo.innerText = percent;
                    if (percent == 100) {
                        proWrap.style.display='none';
                    }
                }
            }, function(err) {
                console.error(err);
            });
        });
    
      // 灯光（light）
      var ambientLight = new THREE.AmbientLight(0x0c0c0c);
      scene.add(ambientLight);
    
      var plintLight1 = new THREE.PointLight(0x999999);
      plintLight1.position.set(200, 100, 200);
      scene.add(plintLight1);
      var plintLight2 = new THREE.PointLight(0x999999);
      plintLight2.position.set(200, 100, -200);
      scene.add(plintLight2);
      var plintLight3 = new THREE.PointLight(0x7a7a7a);
      plintLight3.position.set(-200, 100, -200);
      scene.add(plintLight3);
      var plintLight4 = new THREE.PointLight(0x999999);
      plintLight4.position.set(-200, 100, 200);
      scene.add(plintLight4);
    
    
        // //坐标轴x-y-z
        // function drawAxes() {
        //     // x-axis
        //     var xGeo = new THREE.Geometry();
        //     xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        //     xGeo.vertices.push(new THREE.Vector3(50, 0, 0));
        //     var xMat = new THREE.LineBasicMaterial({
        //         color: 0xff0000
        //     });
        //     var xAxis = new THREE.Line(xGeo, xMat);
        //     scene.add(xAxis);
    
        //     // y-axis
        //     var yGeo = new THREE.Geometry();
        //     yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        //     yGeo.vertices.push(new THREE.Vector3(0, 50, 0));
        //     var yMat = new THREE.LineBasicMaterial({
        //         color: 0x00ff00
        //     });
        //     var yAxis = new THREE.Line(yGeo, yMat);
        //     scene.add(yAxis);
    
        //     // z-axis
        //     var zGeo = new THREE.Geometry();
        //     zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        //     zGeo.vertices.push(new THREE.Vector3(0, 0, 50));
        //     var zMat = new THREE.LineBasicMaterial({
        //         color: 0x00ccff
        //     });
        //     var zAxis = new THREE.Line(zGeo, zMat);
        //     scene.add(zAxis);
        // }
        // drawAxes();
    
    
    
        //开启监听渲染
        function render() {
            renderer.render(scene, camera);
        }
    
        // 监控（stats）
        // var stats = new Stats();
        // document.body.appendChild(stats.dom);
    
        // 执行动画（animate）
        animate();
        function animate() {
            var perforObj = performance.now() / 1000;
            controls.update(perforObj - 1);
            requestAnimationFrame(animate);
            render();
        }
    
        /* 事件和函数（events & functions）*/
    
        // 当调整浏览器窗口的大小时,发生 resize 事件
        window.addEventListener('resize', function() {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            render();
        });
    
    };
    
    
    