import gql from "graphql-tag";
import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/Auth";

const Register = ({ history }) => {
  const context = useContext(AuthContext);
  const { onChange, onSubmit, values, errors, setErrors } = useForm(
    addUserCallback,
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  );
  // pass mutation and options
  // update is run when mutation is successful
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  // we use function declaration here to hoist the function in useForm
  // if we dont, itll throw a warning on how we are using a function before it is defined
  function addUserCallback() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          label={"Email"}
          placeholder="Email.."
          name="email"
          type="email"
          error={!!errors.email}
          value={values.email}
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
        <Form.Input
          label={"Confirm Password"}
          placeholder="Confirm Password.."
          name="confirmPassword"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Register;
