import { useEffect, useState } from "react";
import TableData from "./TableData";
import TableHeader from "./TableHeader";

const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoinsList(data))
      .catch((err) => console.error(err));
  }, []);

  
  useEffect(() => {
    const filteredCoins = coinsList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredCoins);
  }, [coinsList, searchQuery]);

  return (
    <main className="flex-1 mx-auto container px-6">
      <TableHeader setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <TableData data={filteredData} />
    </main>
  );
};

export default Main;
