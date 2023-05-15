import {useContext, useEffect, useState} from 'react';
import { TestContext } from '~context/TestContext';

function TestComponent (){
  const [number, setNumber] = useState(0);

  const Increase = () =>{
    setNumber(number + 1)
  }

  (async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    let user = await response.json();

    console.log(user);
  })();  

  

  // context API test
  const conTextData  = useContext(TestContext);

  useEffect(() => {
    console.log('conTextData:', conTextData);
  }, []);

  return(
    <div className="test">
      <button onClick={Increase}>증가</button>
      <p>number : {number}</p>
      <img src="./images/logo.png" alt="" />
    </div>
  );
};

export default TestComponent;