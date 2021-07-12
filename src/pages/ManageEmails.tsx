import React, { useState } from "react";
import {
  useAddEmailMutation,
  useDeleteEmailMutation,
  useGetAllEmailsQuery,
} from "../generated/graphql";

export const ManageEmails = () => {
  const { data, error, loading } = useGetAllEmailsQuery();
  const [deleteEmail, { client }] = useDeleteEmailMutation();
  const [addEmail] = useAddEmailMutation();
  const [email, setEmail] = useState("");
  if (loading) {
    return <p>Loading</p>;
  } else if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      {data?.getAllEmails.map((x) => {
        return (
          <div key={x.email}>
            <p>{x.email}</p>
            <button
              onClick={async () => {
                await deleteEmail({
                  variables: {
                    email: x.email,
                  },
                });
                await client?.resetStore();
              }}
            >
              Delete {x.email}
            </button>
          </div>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={async (e) => {
            await addEmail({ variables: { email: email } });
            setEmail("");
            await client?.resetStore();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
