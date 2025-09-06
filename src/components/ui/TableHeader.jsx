import Button from "../utils/Button";

const TableHeader = ({ setSearchQuery, sortByMarketCap, sortByChange }) => {
  return (
    <header className="flex items-center justify-between py-4 gap-6 text-[#FFFFFF]">
      <div className="relative flex-1 bg-[#272A30] rounded-[5px]">
        <input
          type="search"
          placeholder="Search By Name or Symbol "
          className="w-full pl-10 pr-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#8E8E8E]"
          onInput={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <Button onClick={sortByMarketCap}>Sort By Mkt Cap</Button>
        <Button onClick={sortByChange}>Sort by Percentage</Button>
      </div>
    </header>
  );
};


export default TableHeader;
