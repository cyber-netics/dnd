import React from "react";
import { ScrumboardProvider } from "./ScrumboardContext";
import ScrumboardWrapper from "./ScrumboardWrapper";

const App = (props) => {
  return (
    <ScrumboardProvider>
      <ScrumboardWrapper {...props} />
    </ScrumboardProvider>
  );
};

export default App;
