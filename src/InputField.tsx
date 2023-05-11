import React,{useMemo,useState} from 'react';
import "./App.css";
import Pie from './Pie';
;

const InputField = () => {
    let arraySize: any;
    let inputArray: any;
    let keys: string[] = [];
    let arr = useMemo(() => [inputArray], [inputArray]);

    const [array,setArray] = useState<number[]>([]);
    const [legend,setLegend] = useState<string[]>([]);

    let inputLegend = document.getElementById('legend')! as HTMLInputElement;

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {

        if(arraySize===""){
            alert("please enter the data");
        }else{
            arraySize = e.target.value;
        }

    }

    const handleSubmit = () => {

        for(let i=0; i<parseInt(arraySize); i++){
            arr[i] = prompt('Enter array element '+ (i+1));
        }

        const numArr = arr.map((el:any)=>parseInt(el));
        setArray(numArr);

    }

    const addLegend = () => {

        keys.push(inputLegend.value);
        inputLegend.value = "";

        if(keys.length===array.length){
            setLegend(keys);
        }

    }



  return (
    <>
    <div className='box'>
        <div className='input-box'>
            <input type='number' placeholder='enter the size of the array' name='arraySize' id='size' onChange={handleChange} />
            <button onClick={handleSubmit} id='submit-btn'>Submit</button>
            <input type='text' placeholder='enter the legend' id='legend' />
            <button onClick={addLegend} id='add-btn'>Add</button>
        </div>
    </div>
    <Pie array={array} legend={legend}/> 
    </>
  )
}

export default InputField