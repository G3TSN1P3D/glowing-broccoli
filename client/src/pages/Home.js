import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILE } from "../utils/queries";

export default function Home() {
  const { loading, data: profile = [] } = useQuery(QUERY_PROFILE);

  return (
    <div className="jumbotron">
      <h1 className="display-4 d-flex"></h1>
      <p className="lead d-flex justify-content-center">
            Because I for real don't know what to do lmfao
      </p>
      <hr className="my-4" />
      <p>
            Should we slap a nice lil background image here with some randomly pulled stats?
      </p>
      <p className="lead"></p>
    </div>
  );
}
