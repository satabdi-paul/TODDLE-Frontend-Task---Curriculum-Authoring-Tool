import React from "react";
import "./App.scss";
import ContextWrapper from "./appContext";
import HeaderButtons from "./HeaderButtons";
import Curriculum from "./Curriculum";

function App() {
  return (
    <ContextWrapper>
      <Curriculum />
      <HeaderButtons />
    </ContextWrapper>
  );
}

export default App;
