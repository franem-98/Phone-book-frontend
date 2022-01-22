function Button({ label, ...rest }) {
  return (
    <button {...rest} className="btn btn-primary">
      {label}
    </button>
  );
}

export default Button;
