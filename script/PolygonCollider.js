//碰撞思路 获取一个几何图形的边缘点集合区间 如果另一个几何图形的边缘顶点位于区间即判断成立

/* function rectanglesCollide(rect1, rect2) {
    // 矩形由其左上角和右下角的坐标定义，例如：rect = { top, left, bottom, right }
    const { top: top1, left: left1, bottom: bottom1, right: right1 } = rect1;
    const { top: top2, left: left2, bottom: bottom2, right: right2 } = rect2;

    // 检查一个矩形的右边是否在另一个矩形的左边之外
    if (right1 <= left2) return false;
    // 检查一个矩形的左边是否在另一个矩形的右边之外
    if (left1 >= right2) return false;
    // 检查一个矩形的底部是否在另一个矩形的顶部之上
    if (bottom1 <= top2) return false;
    // 检查一个矩形的顶部是否在另一个矩形的底部之下
    if (top1 >= bottom2) return false;

    // 如果没有上述情况，则矩形相交
    return true;
}

// 使用示例：
const rect1 = { top: 0, left: 0, bottom: 50, right: 50 };
const rect2 = { top: 25, left: 25, bottom: 75, right: 75 };

console.log(rectanglesCollide(rect1, rect2)); // 输出：true 或 false */




/* 
function isColliding(rect1, rect2) {
    // 矩形由其左上角和右下角的坐标定义，例如：rect = {x1, y1, x2, y2}
    const { x1: x1_1, y1: y1_1, x2: x2_1, y2: y2_1 } = rect1;
    const { x1: x1_2, y1: y1_2, x2: x2_2, y2: y2_2 } = rect2;

    // 检查一个矩形的左下角是否在另一个矩形的右边
    if (x1_1 >= x2_2 || x2_1 <= x1_2) {
        return false;
    }
    // 检查一个矩形的左上角是否在另一个矩形的下边
    if (y1_1 >= y2_2 || y2_1 <= y1_2) {
        return false;
    }

    // 如果没有上述情况，则矩形相交
    return true;
}

// 使用示例：
const rect1 = { x1: 0, y1: 0, x2: 50, y2: 50 };
const rect2 = { x1: 30, y1: 30, x2: 80, y2: 80 };

console.log(isColliding(rect1, rect2)); // 输出：true 或 false */



class PolygonCollider {
    constructor() {
        this.dot = this.dot.bind(this);
        this.cross = this.cross.bind(this);
        this.projectPolygon = this.projectPolygon.bind(this);
    }

    dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    cross(v1, v2) {
        // 计算叉积，得到 z 分量，这在二维中相当于计算两个向量的垂直程度
        return v1.x * v2.y - v1.y * v2.x;
    }

    getNormal(p1, p2) {
        // 使用叉积来确保法向量指向外部
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const crossProduct = this.cross({ x: 0, y: 0 }, { x: dx, y: dy });
        const normal = {
            x: crossProduct * -dy,
            y: crossProduct * dx
        };
        return normal;
    }

    projectPolygon(polygon, normal) {
        let min = Infinity, max = -Infinity;
        for (let point of polygon) {
            let dotProduct = this.dot(point, normal);
            if (dotProduct < min) min = dotProduct;
            if (dotProduct > max) max = dotProduct;
        }
        return { min, max };
    }

    polygonsCollide(polygon1, polygon2) {
        const normals1 = this.calculateNormals(polygon1);
        const normals2 = this.calculateNormals(polygon2);

        for (let normal of normals1) {
            if (!this.overlap(normal, polygon1, polygon2)) {
                return false;
            }
        }

        for (let normal of normals2) {
            if (!this.overlap(normal, polygon2, polygon1)) {
                return false;
            }
        }

        return true;
    }

    calculateNormals(polygon) {
        const normals = [];
        for (let i = 0; i < polygon.length; i++) {
            const edge = [polygon[i], polygon[(i + 1) % polygon.length]];
            const normal = this.getNormal(edge[0], edge[1]);
            normals.push(normal);
        }
        return normals;
    }

    overlap(normal, polygon1, polygon2) {
        const projection1 = this.projectPolygon(polygon1, normal);
        const projection2 = this.projectPolygon(polygon2, normal);
        return projection1.min <= projection2.max && projection2.min <= projection1.max;
    }
}
/* 
// 创建一个PolygonCollider实例
const collider = new PolygonCollider();

// 定义矩形
const rect1 = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
const rect2 = [{ x: 5, y: 5 }, { x: 15, y: 5 }, { x: 15, y: 15 }, { x: 5, y: 15 }];

// 检测矩形与矩形是否碰撞
console.log("矩形与矩形碰撞检测:", collider.polygonsCollide(rect1, rect2));

// 定义三角形
const triangle = [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];

// 检测矩形与三角形是否碰撞
console.log("矩形与三角形碰撞检测:", collider.polygonsCollide(rect1, triangle));

// 定义五角星，这里简化为一个五边形
const pentagon = [
    { x: 5, y: 1 },
    { x: 9, y: 4 },
    { x: 7, y: 8 },
    { x: 3, y: 4 },
    { x: 7, y: 1 }
];
const pentagon2 = [
    { x: 15, y: 11 },
    { x: 19, y: 14 },
    { x: 17, y: 18 },
    { x: 13, y: 14 },
    { x: 17, y: 11 }
];

// 检测矩形与五角星是否碰撞
console.log("矩形与五角星碰撞检测:", collider.polygonsCollide(rect1, pentagon));

// 定义另一个三角形
const triangle2 = [{ x: 15, y: 0 }, { x: 25, y: 10 }, { x: 15, y: 10 }];

// 检测三角形与三角形是否碰撞
console.log("三角形与三角形碰撞检测:", collider.polygonsCollide(triangle, triangle2));
// 检测三角形与五角星是否碰撞
console.log("三角形与五角星碰撞检测:", collider.polygonsCollide(triangle, pentagon));

// 检测五角星与五角星是否碰撞
console.log("五角星与五角星碰撞检测:", collider.polygonsCollide(pentagon, pentagon2));
 */