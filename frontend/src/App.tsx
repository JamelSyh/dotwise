import React from "react";
import MyRouter from "routers/index";

function App() {
  console.log("hiiiiiiiiiiiiiiiii");
  console.log(import.meta.env.VITE_BASE_API_URL);
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
