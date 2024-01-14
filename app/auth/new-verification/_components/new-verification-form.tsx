"use client";

import { BeatLoader } from "react-spinners";

import { CardWrapper } from "@/app/auth/_components/CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/auth-actions/new-verification";
import { FormError } from "../../_components/form-error";
import { FormSuccess } from "../../_components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Missing Token");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
