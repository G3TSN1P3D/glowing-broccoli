import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILE } from "../utils/queries";

export default function Home() {
  const { loading, data: profile = [] } = useQuery(QUERY_PROFILE);

  return (
    // Drew wants a title in jumbo
    // description of the site and buttons for 



    <div className="jumbotron" style={{backgroundblendmode: "multiply"}}>
      <h1 className="display-4 d-flex justify-content-center p-5">Drew here is your title</h1>
      <p className="lead d-flex justify-content-center p-5">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      </p>
      <hr className="my-4 p-4" />
      <p className="lead d-flex justify-content-center p-5">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      </p>
    </div>
  );
}
