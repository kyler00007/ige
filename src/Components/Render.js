import { Data } from "./Data";
import { useValue } from "./ItemContex";

const RenderTable = () => {
  const { data,searchQuery } = useValue();

  let filteredData = data;
  if (searchQuery.trim() !== "") {
    filteredData = data.filter(
      (item) =>
        typeof item.Type === "string" &&
        item.Type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filteredData.length === 0) {
    return <div>No data available.</div>;
  } else {
    return (
      <div className="table-responsive">
        <table className="table" style={{ border: "2px solid black" }}>
          <thead>
            <tr  >
              <th className="main_border">Type</th>
              <th className="main_border">Description</th>
              <th className="main_border">Goods Group</th>
              <th className="main_border">Manufacturer</th>
              <th className="main_border">Product</th>
            </tr>
          </thead>
          <tbody>
            <Data excelData={filteredData} />
          </tbody>
        </table>
      </div>
    );
  }
};

export default RenderTable;
