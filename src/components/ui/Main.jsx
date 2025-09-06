import { useEffect, useState } from "react";
import TableData from "./TableData";
import TableHeader from "./TableHeader";

const Main = () => {
  const [searchThen, setSearchThen] = useState("");
  const [searchAsync, setSearchAsync] = useState("");
  const [coinsByThen, setCoinsByThen] = useState([]);
  const [coinsByAsync, setCoinsByAsync] = useState([]);
  const [filteredByThen, setFilteredByThen] = useState([]);
  const [filteredByAsync, setFilteredByAsync] = useState([]);

  const fetchDataByChaining = () => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoinsByThen(data))
      .catch((err) => console.error(err));
  };

  const fetchDataByAsyncAwait = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoinsByAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDataByChaining();
    fetchDataByAsyncAwait();
  }, []);

  useEffect(() => {
    const filtered = coinsByThen.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchThen.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchThen.toLowerCase())
    );
    setFilteredByThen(filtered);
  }, [coinsByThen, searchThen]);

  useEffect(() => {
    const filtered = coinsByAsync.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchAsync.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchAsync.toLowerCase())
    );
    setFilteredByAsync(filtered);
  }, [coinsByAsync, searchAsync]);

  const sortByMarketCap = (data, setData) => {
    const sorted = [...data].sort((a, b) => b.market_cap - a.market_cap);
    setData(sorted);
  };

  const sortByChange = (data, setData) => {
    const sorted = [...data].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setData(sorted);
  };

  return (
    <main className="flex-1 mx-auto container px-6 space-y-8">
      <TableHeader
        setSearchQuery={setSearchThen}
        sortByMarketCap={() => sortByMarketCap(filteredByThen, setFilteredByThen)}
        sortByChange={() => sortByChange(filteredByThen, setFilteredByThen)}
      />
      <h2 className="text-white mt-2">Data fetched using .then()</h2>
      <TableData data={filteredByThen} />

      <TableHeader
        setSearchQuery={setSearchAsync}
        sortByMarketCap={() => sortByMarketCap(filteredByAsync, setFilteredByAsync)}
        sortByChange={() => sortByChange(filteredByAsync, setFilteredByAsync)}
      />
      <h2 className="text-white mt-2">Data fetched using async/await</h2>
      <TableData data={filteredByAsync} />
    </main>
  );
};

export default Main;
