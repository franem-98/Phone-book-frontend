function Timer({ seconds }) {
  const stringSeconds = seconds.toString();
  return stringSeconds.length === 1 ? (
    <h2>{`00:0${stringSeconds}`}</h2>
  ) : (
    <h2>{`00:${stringSeconds}`}</h2>
  );
}

export default Timer;
