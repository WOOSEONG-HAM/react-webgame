import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if(state === 'waiting'){
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => { 
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random()*1000) + 2000);
    }else if(state === 'ready'){
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요!');
    }else if(state === 'now'){
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevState) => {
        return [...prevState, endTime.current - startTime.current];
      })
    }
  };

  const onClickButton = () => {
    setResult([]);
  };

  const renderAvg = () => {
    return(
      result.length === 0
       ? null 
       : <div>
         <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onClickButton}>리셋</button>
        </div>
    );
  };

  return (
    <div>
    <div
      id="screen"
      className={state}
      onClick={onClickScreen}
      >
        {message}
    </div> 
    {/* 만약에 result 처럼 배열 초기값이 없으면 아래와 같이 null을 넣어주어야한다. */}
    {/* {renderAvg()} */}
    {(() => {
      if(result.length === 0){
        return null
      }else{
        return (
        <div>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <button onClick={onClickButton}>리셋</button>
        </div>
      )}
    })()}
  </div>
  );
};

export default ResponseCheck;
