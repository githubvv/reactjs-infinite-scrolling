import React, { useState, useEffect, useCallback } from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

const InfiniteScrollExample = () => {
  const [items, setItems] = useState([]); // List of items
  const [hasMore, setHasMore] = useState(true); // Determines if more items are available
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Tracks the current page

  const fetchItems = async (page) => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data]);

      // If no more items, set `hasMore` to false
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    // Customize the trigger area to load more (optional)
    rootMargin: "0px 0px 200px 0px",
  });

  return (
    <div ref={infiniteRef}>
      <h1>Infinite Scroll Example</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items to load.</p>}
    </div>
  );
};

export default InfiniteScrollExample;