import React from 'react';
import Editor from './quill';
import '../App.css';
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import {Glyphicon, GlyphiconProps} from "react-bootstrap";

export default class AnswerButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,

          Answer: {
            ans: "",
            votes: 0
          },
          update: false,
          updateIndex: "",
          Answers: []
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      handleSubmit = () => {
        let { Answers, Answer } = this.state;
        let b = "hii";
          if (this.state.update) {
            Answers[this.state.updateIndex] = Answer;
            this.setState({ update: false });
          } else {
            Answers.push(Answer);
            // this.props.noOfAnswers(this.state.Answers.length);
            // console.log(this.state.Answers.length)
          }
       
        Answer = {
          ans: "",
          votes: 0
        };
        this.setState({ Answers, modal: false, Answer });
        // localStorage.setItem("user", JSON.stringify(this.state.Answers));
        // console.log(this.state.Answers);
        // this.props.pushAnswers(b);
      }
      handleValue = (value)=>{
        this.state.Answer.ans = value;
        
      }
      increment = (i) =>{
          let Answer = this.state.Answers[i];
          let {Answers} = this.state;
          Answer.votes +=1;
          Answers[i]=Answer;
          this.setState({Answers})

          // this.handleSubmit();
          
      }
      decrement =(i) =>{
        let Answer = this.state.Answers[i];
        let {Answers} = this.state;
        Answer.votes -=1;
        Answers[i]=Answer;
        this.setState({Answers})

      }
  
  render() {
    let { votes } = this.state.Answer;
    console.log(this.state.Answers)
    return (
      <div>
       
                <Button color="info" onClick={this.toggle} >Post your answer</Button>
           
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Editor  placeholder="Your answer here..." handleValue={this.handleValue}/>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="space"></div>
        <h6 className="noOfAnswers">{this.state.Answers.length} Answers</h6>
        
        <div className="answer-container">
        {this.state.Answers.length !== 0 ? (
          
          <table className="AnswerTable">
            
            <tbody>
              {this.state.Answers.map((Answer, i) => (
                <tr key={i}>
                <tr>
                  <div class="static">
                  <td className="vote">
                  
                  <button class="vote-button" aria-pressed="false" aria-label="up vote" onClick= {()=>this.increment(i) }>
                  <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                  <path d="M2 26h32L18 10z" className="voteFill"></path>
                  </svg>
                  </button>
                   
                    <p className="votesDisplay">{Answer.votes}</p>
                    
                    <button class="vote-button" aria-pressed="false" aria-label="down vote" onClick= {() => this.decrement(i) } ><svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36"><path d="M2 10h32L18 26z" className="voteFill"></path></svg></button>
                  
                  </td>
                  </div>
                  <td className="answerTd">
                    {" "}
                    <p>Answer {i+1}</p>
                    <p className="content" dangerouslySetInnerHTML={{__html:  Answer.ans}}></p>
                    
                  </td>
                
                  </tr>
                  <div className="ansEndLine"></div>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
      </div>
    );
  }
}
