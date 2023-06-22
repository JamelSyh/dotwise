import React from "react";
import MyRouter from "routers/index";

function App() {
  console.log(import.meta.env.DOTWISE_API_KEY);
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
