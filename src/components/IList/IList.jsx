import React from 'react';
import useInfiniteScroll from '../../useInfiniteScroll';
import getItems from '../../utils/getItems';
import './IList.css';

export default function IList() {
    const fetchData = async () => {// 模拟get请求 http.get(url, {params})
        const items = await getItems(); // 产生新数据
        return { // 请求返回的数据
            data: items,
            more: true,
        };
    };
    // console.log("promise", fetchData()); // Promise 成功状态的结果 就是函数的返回值
    // 执行自定义函数
    const { data, Loading, loadingRef } = useInfiniteScroll(fetchData);// 子组件返回的loadingRef 传递给父组件

    return (
        <div className="list">
            {data.map((item, index) => {
                return (
                    <div key={index} className="item">
                        {item}
                    </div>
                );
            })}
            {/* <div ref={loadingRef}>加载...</div> */}
            {Loading}
        </div>
    );
}
