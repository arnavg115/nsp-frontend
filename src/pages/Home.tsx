import React from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading, error } = useGetAllQuery();
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  } else if (!data || !data.getAll || error?.message) {
    return <p>Error:{error?.message}</p>;
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
