import React, { Fragment } from "react";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import LoginButton from "./components/LoginButton";
import { Auth0Provider } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import Placeholder from "./components/Placeholder";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUDIENCE;
console.log('domain', domain);
console.log('clientId', clientId);
console.log('audience', audience);


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <Fragment>
      <Auth0Provider domain={domain} clientId={clientId} audience={audience} redirectUri={window.location.origin}>
        <div className="container">
          <LoginButton />
          <LogoutButton />
          <Profile />
          <Placeholder />
          <InputTodo />
          <ListTodos />
        </div>
      </Auth0Provider>
    </Fragment>
  );
}

export default App;
