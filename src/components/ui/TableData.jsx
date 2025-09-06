const TableData = ({ data = [] }) => {
  return (
    <table className=" text-white w-full border-collapse my-3">
      <thead className="my-3">
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Volume</th>
          <th>24h %</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No coin found
            </td>
          </tr>
        ) : (
          data.map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-[#8E8E8E]"
            >
             <td className="">
                <div className="flex items-center justify-center gap-4">
                    <img src={coin.image} alt={coin.name} width={30}/>
                    <span>{coin.name}</span>
                </div>
                </td>

              <td>{coin.symbol.toUpperCase()}</td>
              <td>{`$${coin.current_price}`}</td>
              <td>{`$${coin.total_volume}`}</td>
              <td
                className={
                  coin.price_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-700"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>{`Mkt Cap : $${coin.market_cap}`}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableData;
