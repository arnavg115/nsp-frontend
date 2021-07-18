import React from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { useGetAllQuery, useMeQuery } from "../generated/graphql";

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, loading, error } = useGetAllQuery();
  const res = useMeQuery();
  if (loading || res.loading) {
    return <Spinner animation="border" variant="primary" />;
  } else if (!data || !data.getAll || error?.message) {
    return <p>Error:{error?.message}</p>;
  } else if (!res.data || !res.data.me) {
    history.push("/login");
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
        padding: "10px",
      }}
    >
      <style>
        {`
          a{
            text-decoration: none;
          }
        `}
      </style>
      {data.getAll.map((x) => {
        return (
          <Link to={`/view/${x.num}`}>
            <Card>
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Articles
                </Card.Subtitle>
                <ListGroup>
                  {x.articles.map((y) => {
                    return (
                      <ListGroup.Item>
                        <p>{y.name}</p>
                        <p className="text-muted">{y.desc}</p>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
