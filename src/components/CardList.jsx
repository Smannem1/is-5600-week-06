import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const limit = 10;
const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);
  const filterTags = (searchTerm) => {
    console.log("Search term:", searchTerm); // Debugging
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((product) =>
        Array.isArray(product.tags) &&
        product.tags.some((tag) => {
          console.log("Tag object:", tag); // Debugging: check structure
          return tag.title && tag.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
      console.log("Filtered products:", filtered);
      setFilteredData(filtered);
    }
    setOffset(0);
    setProducts(filtered.slice(0, limit)); // 🔹 Fix: Use `filtered` instead of `filteredData`
  };

  const handlePagination = (step) => {
    setOffset((prevOffset) => Math.max(0, prevOffset + step));
  };
  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-limit)} disabled={offset === 0} />
        <Button text="Next" handleClick={() => handlePagination(limit)} disabled={offset + limit >= filteredData.length} />
      </div>
    </div>
  );
};
export default CardList;