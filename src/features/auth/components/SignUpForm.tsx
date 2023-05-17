import { ChangeEvent, FormEvent, useState } from "react";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { Button, FormInput } from "@components/Elements";
import {
  createAuthUserWithEmailAndPassword,
  getMessageFromCode,
  updateUserDocumentDisplayName,
} from "@lib/firebase";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
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

    if (!displayName || !email || !password || !confirmPassword) {
      setError("Please make sure all fields are filled in.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Please make sure the passwords match.");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (response) {
        await updateProfile(response.user, { displayName });
        await updateUserDocumentDisplayName(response.user, displayName);
      }
      resetFormFields();
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
        label="Display Name"
        type="text"
        name="displayName"
        id="name"
        className="mb-2 rounded px-3 py-2"
        onChange={handleChange}
        value={displayName}
      />

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

      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        id="confirm-password"
        required
        className="mb-4 rounded px-3 py-2"
        onChange={handleChange}
        value={confirmPassword}
      />

      <Button type="submit">Sign Up</Button>
    </form>
  );
};
