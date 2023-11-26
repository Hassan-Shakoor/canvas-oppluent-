function ValidationError({text}) {
  return (
    <div className="validation-errors">
      <div className="validation-errors__item">{text}</div>
    </div>
  )
}

export default ValidationError