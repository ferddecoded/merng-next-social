import gql from "graphql-tag";
import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";

const Login = ({ history }) => {
  // pass mutation and options
  // update is run when mutation is successful
  const { onChange, onSubmit, values, errors, setErrors } = useForm(
    loginUserCallback,
    {
      username: "",
      password: "",
    }
  );
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label={"Username"}
          placeholder="Username.."
          name="username"
          type="text"
          error={!!errors.username}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label={"Password"}
          placeholder="Password.."
          name="password"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
          type="password"
        />
        <Button type="submit">Register</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) =>
              value ? <li key={value}>{value}</li> : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Login;
