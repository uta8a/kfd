import React from "react";
import Main from "./pages/Main";
import { ContextWrapper } from "./Context";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

export const App = () => {
  return (
    <ContextWrapper>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/signup" element={<NotFound />} />
        <Route path="/signin" element={<NotFound />} />
        <Route path="/profile" element={<NotFound />} />
        <Route path="/problems/:id" element={<NotFound />} />
        <Route path="/problems" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextWrapper>
  );
};

export default App;
