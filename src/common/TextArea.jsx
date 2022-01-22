function TextArea({ value, error, ...rest }) {
  return (
    <div className="mb-3">
      <textarea className="message-input" {...rest} value={value} />
      <p>{value.length}/255 characters</p>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextArea;
