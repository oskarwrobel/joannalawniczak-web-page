import "./analytics";
import "./app.css";

import { render } from "../roman/roman";

const router = () => {
  const path = location.hash.replace(/^#\//, "");

  console.log(path);

  if (path === "roman") {
    render();
    return;
  }
};

router();
document.addEventListener("hashchange", router);
