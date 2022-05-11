import Messages from './components/Messages';
import './App.css';
import React, { Component } from 'react'
import Input from './components/Input';

function randomName() {
  const adjectives = [
    "eager", "unequaled", "equable", "toothsome", "natural", "late", "womanly", "irate", "voracious", "mute", "heavy", "sable", "nosy", "separate", "fascinated", "infamous", "hushed", "aboard", "murky", "weak", "troubled", "nonchalant", "abandoned", "common", "happy", "sharp", "melodic", "noisy", "lovely", "calm", "defiant", "overt", "full", "dry", "upbeat", "successful", "nappy", "precious", "itchy", "adhesive", "faulty", "strong", "finicky", "unsightly", "fine", "thoughtful", "ready", "draconian", "nonstop", "petite", "nimble", "witty", "vacuous", "attractive", "puzzling", "magnificent", "wandering", "accidental", "combative", "internal", "frequent", "befitting", "thin", "envious"
  ];
  const nouns = ["quill", "bubble", "horse", "question", "corn", "turkey", "sidewalk", "needle", "week", "chicken", "match", "nut", "shame", "meal", "fruit", "fish", "station", "music", "care", "calendar", "lawyer", "brush", "weight", "goat", "horn", "tent", "tray", "bird", "stem", "lamp", "afterthought", "needle", "nose", "thought", "cake", "trucks", "bat", "underwear", "lumber", "scarecrow", "toes", "title", "glass", "whistle", "sheet", "honey", "surprise", "goose", "care", "brush", "spark", "attraction", "laborer", "mint", "vegetable", "haircut", "family", "lunch", "cow", "motion", "badge", "brake", "cows", "winter"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor () {

  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class App extends Component {
  
  state = {
    messages: [],
    member: {
      color: randomColor(),
      username: randomName()
    }
  }

  constructor(){
    super();
    this.setState({messages: [],
      member: {
        color: randomColor(),
        username: randomName()
      }})

    this.drone = new window.Scaledrone("jg8RR2Lv0W2U7SUD", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error){
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data,member)=>{
      const messages = this.state.messages;
      messages.push({ text: data, member});
      this.setState({messages});
    });
  }
  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Algebra - Seminarski rad Chat App</h1>
        </div>
        <Messages messages={this.state.messages} currentMember={this.state.member} />
        <Input onSendMessage = {this.onSendMessage} />
      </div>
    )
  }
  
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  } 
}