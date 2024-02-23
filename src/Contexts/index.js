import { createContext, useState, useContext } from 'react';

const DetailContext = createContext();

export function DetailProvider({ children }) {
  const [data, setData] = useState({});

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <DetailContext.Provider value={{ data, updateData }}>
      {children}
    </DetailContext.Provider>
  );
}

export function useDetailContext() {
  return useContext(DetailContext);
}
