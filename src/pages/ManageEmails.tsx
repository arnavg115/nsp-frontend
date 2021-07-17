import React, { useState, FC } from "react";
import { Table, Button, FormControl, Modal } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import {
  useAddEmailMutation,
  useDeleteEmailMutation,
  useGetAllEmailsQuery,
} from "../generated/graphql";

export const ManageEmails: FC<RouteComponentProps> = ({ history }) => {
  const { data, error, loading } = useGetAllEmailsQuery();
  const [deleteEmail, { client }] = useDeleteEmailMutation();
  const [open, setOpen] = useState(false);
  const [addEmail] = useAddEmailMutation();
  const [email, setEmail] = useState("");
  const [otherm, setOtherm] = useState("");
  const openM = () => setOpen(true);
  const closeM = () => {
    setOpen(false);
    setOtherm("");
  };
  if (loading) {
    return <p>Loading</p>;
  } else if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <FormControl
          style={{ width: "400px" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          style={{ marginTop: "20px", marginBottom: "20px" }}
          variant="outline-primary"
          onClick={async (e) => {
            await addEmail({ variables: { email: email } });
            setEmail("");
            await client?.resetStore();
          }}
        >
          Submit
        </Button>
      </div>
      <Table hover bordered striped>
        <thead>
          <tr>
            <td>Email</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data?.getAllEmails.map((x) => {
            return (
              <tr key={x.email}>
                <td>
                  <p>{x.email}</p>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      openM();
                      setOtherm(x.email);
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
      <Modal show={open} onHide={closeM}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a permanent action and will result in the deletion of this
          email address from the database
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeM}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteEmail({
                variables: {
                  email: otherm === "" ? "random@random.com" : otherm,
                },
              });
              await client?.resetStore();
              closeM();
              setOtherm("");
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
