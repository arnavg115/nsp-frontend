import React, { FC, useState } from "react";
import { FormControl, InputGroup, Button, Table } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import _ from "lodash";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "60vw", display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginTop: "100px" }}>
            <InputGroup>
              <FormControl
                type="text"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup style={{ marginTop: "10px" }}>
              <FormControl
                type="text"
                value={num}
                placeholder="number"
                onChange={(e) => setNum(e.target.value)}
              />
            </InputGroup>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></div>
        </div>

        <div style={{ width: "800px", marginTop: "30px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Short Description</td>
                <td>
                  <Button
                    onClick={(e) => {
                      const ind =
                        articles.length !== 0
                          ? articles[articles.length - 1].index + 1
                          : 0;
                      setArticles([
                        ...articles,
                        { name: "", index: ind, desc: "" },
                      ]);
                    }}
                  >
                    Add Article
                  </Button>
                </td>
              </tr>
            </thead>
            <tbody>
              {articles.map((x) => {
                return (
                  <tr key={x.index}>
                    <td>{x.index + 1}</td>
                    <td>
                      <FormControl
                        type="text"
                        value={x.name}
                        placeholder="Name"
                        onChange={(e) => {
                          const copy = [...articles];
                          copy[x.index] = {
                            ...copy[x.index],
                            name: e.target.value,
                          };
                          setArticles(copy);
                        }}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="text"
                        placeholder="Description"
                        value={x.desc}
                        onChange={(e) => {
                          const cp = [...articles];
                          cp[x.index] = {
                            ...cp[x.index],
                            desc: e.target.value,
                          };
                          setArticles(cp);
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          const cp = [...articles];
                          const res = _.remove(cp, (n) => {
                            return n.index !== x.index;
                          });
                          setArticles(res);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Button
          style={{ width: "200px", marginTop: "10px" }}
          onClick={async (e) => {
            const { errors } = await addOneEditionMutation({
              variables: {
                name,
                num: parseInt(num),
              },
            });
            if (!errors || errors.length === 0) {
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
            } else {
              alert(errors[0].message);
            }
            setArticles([]);
            setName("");
            setNum("");
            history.push("/");
          }}
        >
          Submit
        </Button>
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
