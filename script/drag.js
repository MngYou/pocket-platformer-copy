function makeDraggable(element) {
    if (!(element instanceof HTMLElement)) {
        console.error('The argument passed to makeDraggable is not a DOM element.');
        return;
    }

    let initX, initY;
    let isDragging = false;

    function onMouseDown(e) {
        initX = e.clientX - parseInt(element.style.left || 0);
        initY = e.clientY - parseInt(element.style.top || 0);
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        requestAnimationFrame(animate); // 开始动画循环
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        element.style.left = e.clientX - initX + 'px';
        element.style.top = e.clientY - initY + 'px';
    }

    function onMouseUp(e) {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function animate() {
        if (isDragging) {
            requestAnimationFrame(animate); // 继续动画循环
        } else {
            // 停止动画循环
        }
    }

    element.addEventListener('mousedown', onMouseDown);
    element.dragDisable = function() {
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
}

// 使用示例
/* const element = document.getElementById('draggableElement');
if (element) {
    makeDraggable(element);
} */