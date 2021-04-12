import React from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ErrorContainer() {
  const errors = useSelector((state) => state.error);
  React.useEffect(() => {
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }, [errors]);
  return <ToastContainer autoClose={2000} />;
}

export default React.memo(ErrorContainer);
