import React, {Component} from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  startTime;
  endTime;
  timeout;

  onClickScreen = () => {
    const { state, result, message} = this.state;
    if(state === 'waiting'){
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요',
      });
      this.timeout = setTimeout(()=>{
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random()*1000) + 2000);
    }else if(state === 'ready'){
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요!',
      })

    }else if(state === 'now'){
      this.endTime = new Date();
      this.setState((prevState) => {
        return({
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime],
        })
      })
    }
  };

  onClickButton = () => {
    this.setState({
      result: [],
    })
  }

  renderAvg = () => {
    const { result } = this.state;
    return (
      result.length === 0 ? null : <div><div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
      <button onClick={this.onClickButton}>리셋</button></div>
    );
  }
  render(){
    const { state, message} = this.state;
    return(
      <div>
      <div
        id="screen"
        className={state}
        onClick={this.onClickScreen}
        >
          {message}
      </div> 
      {/* 만약에 result 처럼 배열 초기값이 없으면 아래와 같이 null을 넣어주어야한다. */}
      {this.renderAvg()}
    </div>
    );
  }
}

export default ResponseCheck;
