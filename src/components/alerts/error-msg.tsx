type ErrorMsgProps = {
  msg?: any;
};

export const ErrorMsg: React.FC<ErrorMsgProps> = ({ msg }) => {
  return (
    <span className="text-sm text-red-700 my-1.5" role="alert">
      {msg}
    </span>
  );
};
