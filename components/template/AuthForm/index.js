"use client";

import { useState } from "react";


import CheckOTPForm from "./CheckOTPForm";
import SendOTPForm from "./SendOTPForm";
import ModalContainer from "components/partials/containers/ModalContainer";


function AuthForm({ isOpenModal, setIsOpenModal}) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

 

  return (
    <div>
      {step === 1 && (
        <ModalContainer isOpenModal={isOpenModal}>
          <SendOTPForm
            setIsOpenModal={setIsOpenModal}
            setStep={setStep}
            mobile={mobile}
            setMobile={setMobile}
          />
        </ModalContainer>
      )}

      {step === 2 && (
        <ModalContainer isOpenModal={isOpenModal}>
          <CheckOTPForm
            mobile={mobile}
            setIsOpenModal={setIsOpenModal}
            setStep={setStep}
          />
        </ModalContainer>
      )}
    </div>
  );
}

export default AuthForm;
