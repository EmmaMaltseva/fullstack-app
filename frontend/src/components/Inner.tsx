import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Inner = forwardRef((props, ref) => {
  const [innerState, setInnerState] = useState(0);

  useEffect(() => {
    console.log('Внутренне состояние изменено', innerState)
  }, [innerState]);

  useImperativeHandle(ref, () => ({
    runCodeInChild: () => {
      setInnerState(prev => prev + 1)
    }
  }));

  return (
    <div>{innerState}</div>
  )
})

export default Inner;