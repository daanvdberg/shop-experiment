import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "@utils/firebase/auth";
import { FirebaseError } from "firebase/app";
import { getMessageFromCode } from "@utils/firebase/errors";
import FormInput from "@components/form-input";
import Button from "@components/button";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const message = getMessageFromCode(error);
        if (message) setError(message);
      }
    }
  };

  const logGoogleUser = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithGooglePopup();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const message = getMessageFromCode(error);
        if (message) setError(message);
      }
    }
  };

  return (
    <form className="mb-4 flex max-w-[400px] flex-col" onSubmit={handleSubmit}>
      {error ? <span className="text-rose-700">{error}</span> : null}
      <FormInput
        label="Email"
        type="email"
        name="email"
        id="email"
        required
        className="mb-2 rounded px-3 py-2"
        onChange={handleChange}
        value={email}
      />

      <FormInput
        label="Password"
        type="password"
        name="password"
        id="password"
        required
        className="mb-2 rounded px-3 py-2"
        onChange={handleChange}
        value={password}
      />

      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button type="submit">Sign in</Button>
        <Button onClick={logGoogleUser} variant="google">
          Sign in with Google
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
