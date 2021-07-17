import React, { FC, useState } from "react";
import { Button, FormControl, Spinner, Table, Modal } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import {
  useAddOneArticleMutation,
  useDeleteArticleMutation,
  useDeleteOneEditionMutation,
  useGetOneQuery,
} from "../generated/graphql";

interface articleInp {
  name: string;
  desc: string;
}
interface del {
  type: "Edition" | "Article" | "";
  id: number;
}
export const ViewEditions: FC = () => {
  const history = useHistory();
  const goHome = () => {
    history.push("/");
  };
  const [addArt, { client }] = useAddOneArticleMutation();
  const [dt, setDt] = useState<articleInp>({ name: "", desc: "" });
  const [deleteEdition, other] = useDeleteOneEditionMutation();
  const [modal, setModal] = useState(false);
  const [Del, setDel] = useState<del>({ type: "", id: -1 });
  // @ts-ignore
  const { id } = useParams();
  const { data, loading } = useGetOneQuery({
    variables: { index: parseInt(id) },
  });
  const [deleteArt, art] = useDeleteArticleMutation();
  const closeModal = () => {
    setModal(false);
    setDel({ ...Del, type: "", id: -1 });
  };
  const openModal = () => setModal(true);
  if (loading || !data) {
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div style={{ padding: "20px", display: "grid", placeItems: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "60vw",
        }}
      >
        <h1>{data.getOneEdition.name}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <Button
            variant="outline-danger"
            onClick={(e) => {
              setDel({ ...Del, type: "Edition", id: data.getOneEdition.id });
              openModal();
              setTimeout(() => {
                goHome();
              }, 5000);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Table bordered hover striped style={{ width: "60vw" }}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "5%" }}></td>
            <td style={{ width: "35%" }}>
              <FormControl
                value={dt.name}
                placeholder="Article Title"
                onChange={(e) => {
                  setDt({ ...dt, name: e.target.value });
                }}
              />
            </td>
            <td style={{ width: "50%" }}>
              <FormControl
                placeholder="Article Description"
                as="textarea"
                value={dt.desc}
                onChange={(e) => {
                  setDt({ ...dt, desc: e.target.value });
                }}
              />
            </td>
            <td
              style={{
                width: "5%",
              }}
            >
              <Button
                onClick={async () => {
                  await addArt({
                    variables: {
                      name: dt.name,
                      desc: dt.desc,
                      Edition_Num: data.getOneEdition.num,
                    },
                  });
                  await client?.resetStore();
                  setDt({ name: "", desc: "" });
                }}
              >
                Submit
              </Button>
            </td>
          </tr>
          {data.getOneEdition.articles.map((x) => {
            return (
              <tr>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.desc}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      setDel({
                        ...Del,
                        type: "Article",
                        id: x.id,
                      });
                      openModal();
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
      <Modal show={modal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {Del.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a permanent action and doing so will result in the
          irreversible deletion of this {Del.type}.
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              setModal(false);
              setDel({ ...Del, type: "", id: -1 });
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async (e) => {
              if (Del.type === "Edition") {
                await deleteEdition({
                  variables: { id: data.getOneEdition.id },
                });
                await other.client?.resetStore();
                setModal(false);
                setDel({ ...Del, type: "", id: -1 });
              } else if (Del.type === "Article") {
                await deleteArt({ variables: { id: Del.id } });
                await art.client?.resetStore();
                setModal(false);
                setDel({ ...Del, type: "", id: -1 });
              } else {
                alert("Major Error");
                setModal(false);
                setDel({ ...Del, type: "", id: -1 });
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
