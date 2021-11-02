import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Placeholder = () => {
  const { isAuthenticated } = useAuth0();

  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    !isAuthenticated && (
      <div className="tempDiv">
        <h1>Stuff to do...</h1>
        <h1> Stuff to do...</h1>
        <h1> Stuff to do...</h1>
        <h1> Stuff to do...</h1>
        <h1>Stuff to do...</h1>
      </div>
    )
  );
};

export default Placeholder;
