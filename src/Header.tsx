import React from "react";
import { useMeQuery, useLogoutMutation } from "./generated/graphql";
import { setAccessToken } from "./accessToken";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
export const Header = () => {
  const { loading, data } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  let body: any = null;

  if (loading) {
    body = null;
  } else if (data?.me) {
    body = (
      <Navbar.Text>
        You are logged in as <strong>{data.me.username}</strong>
      </Navbar.Text>
    );
  } else {
    body = <Navbar.Text>Not logged in</Navbar.Text>;
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">NSP-Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!loading && data?.me ? (
            <Nav>
              <Nav.Link href="/addedition">Add Edition</Nav.Link>
              <Nav.Link href="/manageemails">Manage Emails</Nav.Link>
              <Button
                variant="outline-danger"
                onClick={async () => {
                  await logout();
                  setAccessToken("");
                  await client?.resetStore();
                }}
              >
                Logout
              </Button>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        {body}
      </Container>
    </Navbar>
  );
};
