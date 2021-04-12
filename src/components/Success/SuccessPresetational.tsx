import React, { FC } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SuccessPresentationalType = {
  successes: [{ msg: string }]
}

const SuccessPresentational: FC<SuccessPresentationalType> = ({ successes: SuccessPresentationalType }) => (
  <ToastContainer>
    {successes &&
      successes.map((success: { msg: string }): void => {
        toast.success(success.msg, {
          autoClose: 2000,
        });
      })}
  </ToastContainer>
);

export default SuccessPresentational;