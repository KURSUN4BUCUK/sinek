function button({count, setCount}) {
    return (
    <button onClick={() => setCount((count) => count + 1)}>
      <p> {count} </p>
    </button>
  )
}

export default button
