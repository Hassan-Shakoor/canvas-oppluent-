import React from "react";
import PageManagerList from "./PageManagerList";

function PageManagerStage() {
  let stages = ["frhstqpt2d", "hcqwusyyb5", "mhpcoj2vc7", "x41bm0fkwd"];

  return (
    <ul className="page-manager__stages-list">
      {stages.map((stage) => (
        <PageManagerList key={stage} id={stage} />
      ))}
    </ul>
  );
}

export default PageManagerStage;
