import React, { useState } from "react";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
  useMeQuery,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { Button, Form } from "react-bootstrap";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const { data, loading } = useMeQuery();

  if (loading) {
    return <p>Loading</p>;
  } else if (data && data.me) {
    history.push("/");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Login</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await login({
            variables: {
              username,
              password,
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user,
                },
              });
            },
          });
          if (response?.data) {
            setAccessToken(response?.data?.login.accessToken);
          }
          history.push("/");
        }}
      >
        <Form.Group className="mb-1">
          <Form.Control
            style={{
              width: "200px",
            }}
            value={username}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            style={{
              width: "200px",
            }}
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="submit">Login</Button>
        </div>
      </Form>
    </div>
  );
};
