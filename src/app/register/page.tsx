"use client";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";

const RegisterPage: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setCreatingUser(true);
    error && setError("");
    setUserCreated(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (e) {
      // Handle network errors or errors in converting the response to JSON
      setError("An error occurred while creating the user. Please try again.");
    } finally {
      setCreatingUser(false);
    }
  };

  const handleEmailChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  return (
    <section className="mt-8 flex flex-col items-center">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center user__status--completed">
          User created.
          <br />
          You can now{" "}
          <Link href="/login" className="underline">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center errmsg w-2/3">
          An error has occurred.
          <br />
          {error}
        </div>
      )}
      <form className="block max-w-xs mx-auto w-2/5" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={handlePasswordChange}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src="/google.png" alt="" width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link href="/login" className="underline">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
