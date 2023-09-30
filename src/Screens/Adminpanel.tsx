import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BAButton from '../Componets/BAButton';
import { Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { fbAdd, fbGet } from '../Config/Firebasemethod';
import { Avatar } from '@mui/material';
import './Adminpanel.css'

export default function FormPropsTextFields() {

  const [disabled, setDisabled] = useState<any>(false);
  const [questionModel, setquestionModel] = useState<any>({});
  const [optionList, setOptionList] = useState<any>([]);
  const [option, setOption] = useState<any>('');
  const [quizDetail, setQuizDetail] = useState<any>({})
  const [correctoption, setcorrectoption] = useState<any>()
  const [question, setquestion] = useState<any>([])
  const [allQuiz, setAllQuiz] = useState<any>([])

  let lock = () => {
    console.log(quizDetail)
    setDisabled(true);
  }

  let fillQuizDetail = (key: any, val: any) => {
    quizDetail[key] = val;
    setQuizDetail({ ...quizDetail })
  }


  let fillQuestion = (key: any, val: any) => {
    questionModel[key] = val;
    setquestionModel({ ...questionModel })
  }

  const addOption = () => {
    optionList.push(option)
    setOptionList([...optionList])
    setOption('')
  }

  const addQuestion = () => {
    questionModel.option = [...optionList];
    questionModel.correctAnswer = correctoption;
    question.push(questionModel);
    setquestion([...question])
    setquestionModel({});
    setcorrectoption('');
    setOptionList([]);
    console.log(question);
  }

  const savequiz = () => {
    quizDetail.questions = [...question];
    console.log(quizDetail);
    fbAdd('quiz', quizDetail)
      .then((res: any) => {
        console.log(res);
        setQuizDetail({});
        getQuiz();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getQuiz = () => {
    fbGet('quiz')
      .then((res: any) => {
        console.log(res);
        setAllQuiz([...res]);
      })
      .catch((err) => {
        console.log(err);
      }
      )
  }

  useEffect(() => {
    getQuiz();
  }, []);

  return (

    <Grid container spacing={2} >
      <Grid item md={3} style={{ background: "#61605e", position: "relative" }}
        className='text-center'>
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Avatar style={{ width: "80px", height: "80px" }} alt="Remy Sharp" src="https://tse1.mm.bing.net/th?id=OIP.aPrAXebVFheO1nA-8qU47gHaJA&pid=Api&rs=1&c=1&qlt=95&w=87&h=106" /></div>
        <h3 style={{ fontSize: "30px" }}>Quiz App</h3>
        <div style={{marginTop: '10px'}}>
        {allQuiz.map((x: any, i: any) => {
          return (
            <h2 style={{ fontSize: "26px" }}>
              {x.QuizName}
            </h2>
          )
        })}</div>
        <div style={{
          position: 'absolute', bottom: "0", left: "0",
          right: "0",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          <BAButton onClick={''} label='Logout' />
        </div>
      </Grid>

      <Grid item md={9} style={{
        background: "white",
        margin: "5px auto"
      }}>
        <Box>
          <h2 style={{ fontSize: "26px" }}>
            Quiz App Admin
          </h2>
          <div style={{ width: '100px', marginTop: '25px' }}>
            <BAButton onClick={() => savequiz()} label="Save" />
          </div>

          <Grid container spacing={4} style={{ marginTop: '5px' }}>
            <Grid item md={3}>
              <TextField
                onChange={(e: any) => {
                  fillQuizDetail('QuizName', e.target.value)

                }}
                disabled={disabled}
                required
                id="outlined-required"
                label="Quiz Name"
              /></Grid>

            <Grid item md={3}>
              <TextField onChange={(e: any) => {
                fillQuizDetail('QuizDurationinMin', e.target.value)

              }}
                disabled={disabled}
                required
                id="outlined-required"
                label='Quiz Duration in Min'
              />
            </Grid>

            <Grid item md={3}>
              <TextField onChange={(e: any) => {
                fillQuizDetail('SecretKey', e.target.value)

              }}
                disabled={disabled}
                id="outlined-number"
                label="Secret Key"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item md={3}>
              <TextField onChange={(e: any) => {
                fillQuizDetail('QuizOpen', e.target.value)

              }}
                disabled={disabled}
                id="outlined-input"
                label="Quiz Open"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item md={8} >
              <TextField onChange={(e: any) => {
                fillQuizDetail('Descripton', e.target.value)

              }}
                disabled={disabled} fullWidth label="Decription" />
            </Grid>

            <Grid item md={4}>
              <BAButton onClick={() => lock()} label='Lock Quiz' />
            </Grid>

          </Grid>

          <div style={{ marginTop: "85px" }}>
            <TextField fullWidth label="Question" style={{ marginBottom: "10px" }}
              onChange={(e: any) => {
                fillQuestion('Question', e.target.value)

              }}
              id="outlined-number"
              value={questionModel.question}
              type='text'
              InputLabelProps={{
                shrink: true,
              }} />

            <Grid container spacing={2}>
              <Grid item md={8}>
                <TextField onChange={(e: any) => {
                  setOption(e.target.value)
                }}
                  id="outlined-number"
                  value={option}
                  type='text'
                  label='Option'
                  InputLabelProps={{
                    shrink: true,
                  }} fullWidth />
              </Grid>

              <Grid item md={4}>
                <BAButton onClick={addOption} label='Add' />
              </Grid>
            </Grid>
          </div>


          <Grid container spacing={2}>
            <Grid item md={8}>
              {optionList.map((x: any, i: any) => {
                return (
                  <div style={{marginTop:'20px', marginBottom:'10px'}}>
                    <Button variant="contained" fullWidth onClick={() => setcorrectoption(x)} key={i}>
                      {x}</Button>
                      
                  </div>
                )
              })}
            </Grid>

            <Grid item md={4} style={{marginTop:'20px', marginBottom:'10px'}} >
              <Button>{correctoption }</Button>

            </Grid>

          </Grid>



          <BAButton onClick={() => addQuestion()} label='Add Question' />



        </Box>
      </Grid>
    </Grid>



  );
}
