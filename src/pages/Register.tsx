import React, { useState } from "react";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { Form, Button } from "react-bootstrap";

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const res = useMeQuery();
  if (res.loading) {
    return <p>Loading</p>;
  } else if (res.data && res.data.me) {
    history.push("/");
  }
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Register</h1>
      <Form
        style={{
          width: "200px",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await register({
            variables: {
              username,
              password,
              adminPassword: adminPass,
            },
          });
          const res = await login({
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
            setAccessToken(res.data?.login.accessToken!);
          }
          history.push("/");
        }}
      >
        <Form.Group>
          <Form.Control
            value={username}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Admin Password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit">Register</Button>
        </div>
      </Form>
    </div>
  );
};
