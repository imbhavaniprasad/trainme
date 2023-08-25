import React, { useState, useEffect } from 'react'
import { FileContext } from '../App';
import { useContext } from 'react';
// import { test as questionsArray } from './test';
import { formatAsQuestions } from './test';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AttemptTest = () => {
  const currentFile = useContext(FileContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsArray, setQuestionsArray] = useState([]);
  const navigate = useNavigate();
  const fetchQuestions = async () => {
    let data;
    setQuestionsLoading(true);
    await axios.post('http://localhost:5000/get-answer', {
      'question': 'List five questions I can ask from this as single choices.Each question must have 2 choices also must attach the answer at the end of each question',
      'nameSpace': currentFile.nameSpace
    }).then((response) => {
      console.log("answer", response)
      data = response.data.answer
    }).catch((error) => console.log(error))
    const finalQuestions = await formatAsQuestions(data);
    setQuestionsArray(finalQuestions);
    console.log("final questions to load", finalQuestions)
    setQuestionsLoading(false);
  }
  useEffect(() => {
    if (!currentFile) return navigate("/");
    fetchQuestions();
    return () => {
      setQuestionsArray([]);
    }
  }, [])

  const handleOptionChange = (option, index) => {
    const selectedOptions = { ...selectedOption };
    selectedOptions[index] = option;
    setSelectedOption(selectedOptions);
    console.log(selectedOption)
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      {
        Object.keys(selectedOption).map((questionIndex) => {
          if (questionsArray[questionIndex].answer == selectedOption[questionIndex]) {
            setScore(prev => prev + 1);
          }
        })
      }
      setShowScore(true);
    }
  };
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    fetchQuestions();
    setSelectedOption(null);
    setShowScore(false);
    setQuestionsArray([]);
    setScore(0);
  }
  const renderOptions = (index) => {
    const question = questionsArray[index];
    const options = ['a', 'b'];
    const optionRows = [];
    for (let i = 0; i < options.length; i += 1) {
      const optionRow = (
        <div key={i} style={{ display: 'flex', justifyContent: "space-between", width: '70%', 'margin': '10px auto' }}>
          <label style={{ textAlign: 'left' }}>
            <input
              type="radio"
              name="option"
              value={options[i]}
              checked={selectedOption?.[index] === options[i]}
              onChange={() => handleOptionChange(options[i], index)}
            />
            {options[i]} . {question[options[i]]}
          </label >
        </div>
      );
      optionRows.push(optionRow);
    }
    return optionRows;
  };
  return (
    <div className="test_main">
      <h1 style={{ textAlign: 'center' }}>{currentFile?.title ? currentFile?.title : "Revise"} Test</h1>
      {!showScore ?
        <>
          {questionsLoading ? <h2>Loading...</h2> :
            <div className='question_panel'>
              {questionsArray.map((question, index) => {
                return (
                  <div key={index} style={{ margin: '20px auto' }}>
                    <p style={{ width: '70%', margin: '10px auto', fontSize: '20px', fontWeight: '200' }}>{questionsArray[index].question}</p>
                    <form style={{ margin: '30px auto' }}>{renderOptions(index)}</form>
                    <div style={{ border: '0.5px dotted white' }}></div>
                  </div>
                )
              })}
            </div>}</> :
        <div className='question_panel'>
          <h1>Your score : {score}/{questionsArray.length}</h1>
          {questionsArray.map((question, index) => {
            return (
              <div key={index} style={{ width: '70%', margin: '10px auto' }}>
                <p style={{ fontSize: '20px', fontWeight: '200' }}>{questionsArray[index].question}</p>
                <p>Answer : {questionsArray[index][questionsArray[index].answer]}</p>
                <div style={{ border: '0.5px dotted white' }}></div>
              </div>
            )
          })}
        </div>
      }

      <div className="test_buttons_container">
        <button onClick={handleReset} style={{ color: 'white', backgroundColor: 'green', border: '1px solid white', minWidth: '100px', padding: '8px', fontSize: '20px' }}>Reset</button>
        {!showScore && <button style={{ color: 'white', backgroundColor: 'blue', border: '1px solid white', width: '100px', padding: '8px', fontSize: '20px', margin: 'auto' }} onClick={handleSubmit}>Submit</button>}
      </div>
    </div >
  )
}

export default AttemptTest