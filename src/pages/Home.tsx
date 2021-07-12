import React from "react";
import { useGetAllQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading, error } = useGetAllQuery();
  if (loading) {
    return <p>Loading</p>;
  } else if (!data || !data.getAll || error?.message) {
    return <p>Error:{error?.message}</p>;
  }
  return (
    <div>
      {data.getAll.map((x) => {
        return (
          <div>
            <h1>
              {x.num}:{x.name}
            </h1>
            {x.articles.map((y) => {
              return (
                <div>
                  <h2>{y.name}</h2>
                  <p>{y.desc}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
