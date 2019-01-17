import React from 'react';
import Editor from './quill';
import '../App.css';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  } from 'reactstrap';
import logo from '../images/so-logo.svg'
import AnswerButton from './answerModal';
import {FormGroup, FormControl, Glyphicon, GlyphiconProps} from "react-bootstrap";
// import {AccessAlarmIcon } from '@material-ui/icons/AccessAlarm';
// import Icon from '@material-ui/core/Icon';

export default class WNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,

          ques: {
            q: ""
          
          },
          update: false,
          updateIndex: "",
          question: []
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      handleData = (event) => {
        let { ques } = this.state;
        // console.log(event.target);
       ques[event.target.name] = event.target.value;
        this.setState({ ques });
      };
      handleSubmit = () => {
        let { question, ques } = this.state;
          if (this.state.update) { // ques[event.target.name] = event.target.value;
            // ques[event.target.des] = event.target.value;
            
            question[this.state.updateIndex] = ques;
            this.setState({ update: false });
          } else {
            question.push(ques);
          }
       
        ques = {
          q: "",
          description: "",
          Qanswer: []
        };
        this.setState({ question, modal: false, ques });
        localStorage.setItem("user", JSON.stringify(this.state.question));
        //console.log(this.state.question);
      }
      handleValue = (value)=>{
        this.state.ques.q = value;
        // console.log(value)
        // console.log(this.state.ques.q)
        
      }
      handleDescription = (value)=>{
        this.state.ques.description = value;
        // console.log(value)
        //  console.log(this.state.ques.description)
        
      }
      pushAnswers = (answers) =>{
          console.log(answers)
      }
    
  
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
            <img src={logo} className="App-logo"></img>
          
         
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button color="info" onClick={this.toggle} >Ask a question</Button>
              </NavItem>
            </Nav>
           
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Your Questions Here...</ModalHeader>
          <ModalBody>
          <FormGroup>
              <FormControl
                  style={{height: "100px"}}
                  name="q"
                  ComponentClass="textarea"
                  placeholder="question here.."
                  value={this.state.ques.q}
                  onChange={this.handleData}
                  />


          </FormGroup>
          {/* <Editor placeholder="Question" handleValue={this.handleValue}/> */}
          {" "}
          <Editor placeholder="Description" handleDescription={this.handleDescription}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        </Navbar>
        {/* <keyboard_arrow_up /> */}
        {/* <Icon>keyboard_arrow_up</Icon>
        <AccessAlarmIcon /> */}
        
          <div className="questionContainer">
        {this.state.question.length !== 0 ? (
          
          <table className="question">
            
            <tbody>
              {this.state.question.map((ques, i) => (
                <tr key={i}>
                  <td>
                    {" "}
                    <h2>{ques.q}</h2>
                    <div className="Line"></div>
                    <div className="space"></div>
                    {" "}
                    <div className="description">
                    <p className="content" dangerouslySetInnerHTML={{__html: ques.description}} ></p>
                    </div>
                  <AnswerButton />
                  {/* <p>{ques.answerNo}</p> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {/* </Col>
        </Row>
        </Container> */}
        </div>
      </div>
    );
  }
}
