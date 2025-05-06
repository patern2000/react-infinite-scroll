/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from '../utils/debounce';
function useInfiniteScroll(fetchFunc) {// fetchFunc 其实就是一个get请求

    const loadingRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState([]);

    const loadMore = useCallback(debounce(async () => {
        try {
            setLoading(true);
            const { data: newData, more } = await fetchFunc?.();//fetchFunc 向指定接口发起get请求 获取新数据和 more
            setHasMore(more);
            setData((prevData) => [...prevData, ...newData]);
        } catch (err) {
            console.log("加载更多数据失败");

        } finally {
            setLoading(false);
        }

    }, 1000), [fetchFunc]);

    //注册IntersectionObserver
    useEffect(() => {
        const targetEle = loadingRef.current;

        const observer = new IntersectionObserver((entries, curObserver) => {
            if (!hasMore) {// 如果后续没有数据，就停止监测  
                curObserver.unobserve(targetEle);
                return;
            }

            // 有更多数据，加载更多数据 
            entries.forEach(entry => {// entrys：所有被观察目标元素的交叉状态信息
                if (entry.isIntersecting) { // 目标元素与根元素的交集达到了设定的阈值 就继续加载数据
                    loadMore();
                }
            })
        }, {
            root: null, // 使用顶级文档视口
            rootMargin: "0px 0px 0px 0px",
            threshold: 1 // 目标元素完全进入视口才会触发回调
        });


        if (targetEle) {
            observer.observe(targetEle);
        }
        return () => {
            if (targetEle) {
                observer.unobserve(targetEle);
            }
        }
    }, [hasMore]) // 如果loadMore函数里fetchFunc请求携带参数， usecallback里的依赖就是这些参数保证loadMore是最新的， 那么useEffect的依赖项要把loadMore也加上



    return {
        data,
        hasMore,
        loading,
        loadingRef,
        Loading: hasMore ? <div ref={loadingRef}>Loading...</div> : <div ref={loadingRef}>无更多数据</div>,
    }
}

export default useInfiniteScroll;