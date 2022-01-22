function Input({ name, error, ...rest }) {
  return (
    <div className="mb-3">
      <input
        {...rest}
        name={name}
        id={name}
        autoFocus
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
