import React from "react";
import { ScrumboardProvider } from "./scrumboard/ScrumboardContext";
import ScrumboardWrapper from "./scrumboard";

const App = (props) => {
  return (
    <ScrumboardProvider>
      <ScrumboardWrapper {...props} />
    </ScrumboardProvider>
  );
};

export default App;
