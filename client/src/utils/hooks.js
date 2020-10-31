import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    const errorUpdate = { ...errors };
    delete errorUpdate[event.target.name];
    setErrors(errorUpdate);
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    setErrors,
    errors,
  };
};
