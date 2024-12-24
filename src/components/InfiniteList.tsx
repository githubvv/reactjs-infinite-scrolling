import { useState, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const fetchData = (pageNumber:number) => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => `Item ${pageNumber * 10 + i + 1}`);
      resolve(newItems);
    }, 500); 
  });
};

const InfiniteList = () => {
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchData(pageNumber) as [];
    setItems([...items as [], ...newItems]);
    setPageNumber(pageNumber + 1);
    setLoading(false);
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: (pageNumber < 10), //true, // Replace with actual condition
    onLoadMore: loadMore,
    rootMargin: '0px 0px 200px 0px' // Distance from the bottom to trigger loading
  });

  useEffect(() => {
    loadMore(); // Initial load
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {loading && <div>Loading...</div>}
      <div ref={sentryRef} /> 
    </div>
  );
};

export default InfiniteList;