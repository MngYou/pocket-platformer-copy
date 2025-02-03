function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  
  document.addEventListener('dblclick', function(event) {
    //console.log('文档被双击了！');
    // 调用该函数尝试进入全屏模式
    //toggleFullScreen();
  });
  function simulateDblClick(element) {
    // 创建一个mousedown事件
    var mousedownEvent = new MouseEvent('mousedown', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    
    // 创建一个mouseup事件
    var mouseupEvent = new MouseEvent('mouseup', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    
    // 创建一个dblclick事件
    var dblclickEvent = new MouseEvent('dblclick', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    
    // 触发mousedown事件
    element.dispatchEvent(mousedownEvent);
    
    // 触发mouseup事件
    element.dispatchEvent(mouseupEvent);
    
    // 触发dblclick事件
    element.dispatchEvent(dblclickEvent);
  }
  
  simulateDblClick(document);






  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  
  const throttledResize = throttle(function(event) {
    // 处理窗口大小改变的逻辑
    let widthForWindow = window.innerWidth;
    let heightForWindow = window.innerHeight;
    let hScale = 0; //-
    let vScale = 0; //|
    hScale = widthForWindow / getW(container);
    vScale = heightForWindow / getH(container);
    container.style.transform = `scale(${hScale},${vScale})`; 
    container.style.transformOrigin = 'top left';

  }, 60); // 例如，这里设置为1000ms，即1秒
  
  window.addEventListener('resize', throttledResize);