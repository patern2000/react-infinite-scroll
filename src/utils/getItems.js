export default function getItems() {
    return new Promise((resolve, reject) => {
        const res = [];
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        var randomIndex = Math.floor(Math.random() * letters.length);// 0 - 25
        for (let i = 0; i < 10; i++) {
            res.push(i + letters[randomIndex]);
        }
        // res 是字符串数组
        setTimeout(() => {// settimeout 模拟异步操作
            resolve(res);// res就是成功的结果
        }, 1000)
    })
}
/* 
调用resolve  promise状态从pending ------- fulfilled
调用reject   promise状态从pending ------- rejected 


 */

