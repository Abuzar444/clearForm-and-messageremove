"use client";
import { useFormState, useFormStatus } from "react-dom";

import { createUser } from "@/utils/actions";
import { useEffect, useState } from "react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type='submit' className={btnStyle} disabled={pending}>
      {pending ? "submitting..." : "submit"}
    </button>
  );
};

const initialState = {
  message: "",
  resetKey: Date.now().toString(),
};

function Form() {
  const [state, formAction] = useFormState(createUser, initialState);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      setMessage(state.message);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state]);
  return (
    <form action={formAction} className={formStyle} key={state?.resetKey}>
      {showMessage && <p className=' text-green-500'>{message}</p>}
      <h2 className='text-2xl capitalize mb-4'>create user</h2>
      <input type='text' name='firstName' required className={inputStyle} />
      <input type='text' name='lastName' required className={inputStyle} />
      <SubmitButton />
    </form>
  );
}

const formStyle = "max-w-lg flex flex-col gap-y-4  shadow rounded p-8";
const inputStyle = "border shadow rounded py-2 px-3 text-gray-700";
const btnStyle =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize";

export default Form;
