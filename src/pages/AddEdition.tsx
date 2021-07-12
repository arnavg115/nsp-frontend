import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  useAddOneArticleMutation,
  useAddOneEditionMutation,
  useMeQuery,
} from "../generated/graphql";

type ele = {
  name: string;
  index: number;
  desc: string;
};

export const AddEdition: FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState("");
  const [num, setNum] = useState<string>("");
  const [articles, setArticles] = useState<ele[]>([]);
  const [addOneEditionMutation] = useAddOneEditionMutation();
  const [addOneArticleMutation] = useAddOneArticleMutation();
  const { data, loading } = useMeQuery();
  if (loading) {
    return <p>Loading</p>;
  } else if (data?.me) {
    return (
      <div>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={num}
          placeholder="number"
          onChange={(e) => setNum(e.target.value)}
        />
        <button
          onClick={(e) => {
            const ind =
              articles.length !== 0
                ? articles[articles.length - 1].index + 1
                : 0;

            setArticles([...articles, { name: "", index: ind, desc: "" }]);
            console.log(articles);
          }}
        >
          Add
        </button>
        {articles.map((x) => {
          return (
            <div key={x.index}>
              <input
                type="text"
                value={x.name}
                placeholder="Name"
                onChange={(e) => {
                  const copy = [...articles];
                  copy[x.index] = { ...copy[x.index], name: e.target.value };
                  setArticles(copy);
                }}
              />
              <input
                type="text"
                placeholder="Description"
                value={x.desc}
                onChange={(e) => {
                  const cp = [...articles];
                  cp[x.index] = { ...cp[x.index], desc: e.target.value };
                  setArticles(cp);
                }}
              />
            </div>
          );
        })}
        <button
          onClick={async (e) => {
            await addOneEditionMutation({
              variables: {
                name,
                num: parseInt(num),
              },
            });
            for (let index = 0; index < articles.length; index++) {
              const x = articles[index];
              await addOneArticleMutation({
                variables: {
                  name: x.name,
                  Edition_Num: parseInt(num),
                  desc: x.desc,
                },
              });
            }
            setArticles([]);
            setName("");
            setNum("");
          }}
        >
          Submit
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Redirecting</p>
        {(() => {
          history.push("/login");
        })()}
      </div>
    );
  }
};
