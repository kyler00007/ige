import styles from "./Styles/Search.module.css";

import { useValue } from "./ItemContex";
import RenderTable from "./Render";

const Search = (props) => {
  const { toggle } = props;
  const {
    handleFile,
    handleSubmit,
    handleDownload,
    selectedCollection,
    setSelectedCollection,
    searchQuery,
    setSearchQuery,
    excelFileError,
  } = useValue();

  
  return (
    <div>
      <div className={styles.Heading}>Search Parts number</div>
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel file</h5>
          </label>
          <br />
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          />
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginTop: "5px" }}
          >
            Submit
          </button>
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: "5px" }}>
              {excelFileError}
            </div>
          )}
          <label>
            <h5>Select Collection</h5>
          </label>
          <br />
          <select
            className="form-control"
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            required
          >
            <option value="schneider">Schneider</option>
            <option value="L&T">L&T</option>
            <option value="seimens">Siemens</option>
          </select>
          <label>
            <h5>Search by Type</h5>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter type to search"
          />
          <button
            className="btn btn-primary"
            style={{ marginTop: "5px" }}
            onClick={handleDownload}
          >
            Download Filtered Data
          </button>
        </form>
      </div>
      <div>
        <button className={styles.close} onClick={toggle}>
          Go back
        </button>
      </div>
      {RenderTable()}
    </div>
  );
};

export default Search;
