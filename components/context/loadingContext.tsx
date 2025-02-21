import React, { useContext, useState, FC, ReactNode, useEffect } from "react";

type LoadingType = boolean;
export interface LoadingContextType {
  loading: LoadingType;
  setLoading: React.Dispatch<React.SetStateAction<LoadingType>>;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

interface Props {
  children: ReactNode;
}

const LoadingHolder: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<LoadingType>(false);

  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingHolder;
