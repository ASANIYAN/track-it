const ErrorDisplayHandler = (isError: boolean, error: any) => {
  if (isError) {
    if (error.response.status >= 400 && error.response.status < 500) {
      return <p className="text-error"> {error.response.data.error} </p>;
    } else {
      return <p className="text-error"> Error occurred, please try again. </p>;
    }
  }
};

export default ErrorDisplayHandler;
