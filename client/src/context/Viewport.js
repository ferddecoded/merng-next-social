import * as React from "react";
import { BREAKPOINTS } from "../constants/breakpoints";

export const ViewportContext = React.createContext();

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const value = {
    mobile: width < BREAKPOINTS.mobile,
    tablet: BREAKPOINTS.mobole <= width && width < BREAKPOINTS.tablet,
    desktop: BREAKPOINTS.tablet <= width,
  };

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
};
