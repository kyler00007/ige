import { createContext, useContext } from "react";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, onSnapshot, getDocs,addDoc } from "firebase/firestore";
import * as XLSX from "xlsx";

const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

function CustomItemContext({ children }) {
  const [data, setData] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState("schneider");
  const [searchQuery, setSearchQuery] = useState("");

  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      

      // Save data to the selected Firestore collection
      data.forEach(async (item) => {
        try {
          await addDoc(collection(db, selectedCollection), item);
        } catch (error) {
          console.error("Error adding document:", error);
        }
      });
    } else {
      setExcelFileError("Please select an Excel file");
    }
  };



  const handleDownload = () => {
    const originalDataForDownload = data.filter(
      (item) =>
        typeof item.Type === "string" &&
        item.Type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Map the data to have the desired column order
    const mappedData = originalDataForDownload.map((item) => ({
      Type: item.Type,
      Description: item.Description,
      GoodsGroup: item["Goods Group"],
      Manufacturer: item.Manufacturer,
      Product: item.Product,
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "filtered_data.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, selectedCollection));
        const part = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(part);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFirestoreData();

    const unsubscribe = onSnapshot(
      collection(db, selectedCollection),
      (snapshot) => {
        const part = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(part);
      }
    );

    return () => unsubscribe();
  }, [selectedCollection]);

  return (
    <itemContext.Provider
      value={{
        handleFile,
        handleSubmit,
        handleDownload,
        selectedCollection,
        setSelectedCollection,
        searchQuery,
        setSearchQuery,
        data,
        setData,
        excelFileError,
        setExcelFileError,
      }}
    >
      {children}
    </itemContext.Provider>
  );
}

export { useValue };
export default CustomItemContext;






