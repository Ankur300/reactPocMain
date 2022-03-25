import React, { useState } from "react";
import { render } from "react-dom";
import { MentionsInput, Mention } from "react-mentions";
import DateTimePicker from 'react-datetime-picker';
import Linkify from "./Linkify";
import ASearch from "./advancesearch";
import { BrowserRouter as Router,Route, Routes, Switch } from "react-router-dom";

import { Checkbox} from "@material-ui/core";

// import axios from 'axios'

// const api = axios.create({
//   baseURL: `http://localhost:3010`
// })

const hashtags = [
  {
    id: "1",
    display: "#india"
  },
  {
    id: "2",
    display: "#indianArmy"
  },
  {
    id: "3",
    display: "#indianCricket"
  },
  {
    id: "4",
    display: "#time"
  }
];

const users = [
  {
    id: "1",
    display: "Amit"
  },
  {
    id: "2",
    display: "Deepak"
  },
  {
    id: "3",
    display: "Rohan"
  },
  {
    id: "4",
    display: "Sunil"
  }
];

function Datepicker(props) {
  const [value, onChange] = useState(new Date());

  var options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour:"2-digit",
    hour12:"true",
    minute:"2-digit"
};
console.log("#Time:" +value.toLocaleDateString("in", options));
//   console.log(value);
// console.log(value.toLocaleString("en-in"))
console.log(props);
console.log("after props");
  return (
    <div>
      <DateTimePicker onChange={onChange} value={value}   />
      <button 
                                     className="btn btn-success btn-lg"
                                      type="submit"
                                      onClick= {()=>props.abc(value)}
                                  >submit</button>
    </div>
  );
}

class App extends React.Component {
  state = {
    comments: [],
    comment: "",
    isLoggedIn:false,
    datevalue:"",
    isChecked:false,
    abc:[]
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleSubmitComment = e => {
        e.preventDefault();
    console.log(this.state.comment)
    let z=this.state.comment.includes("AM")
    let m =this.state.comment.includes("PM")
    let y=this.state.comment.includes("@[#time](4)")
    console.log(y);
    console.log(this.state.comment)
    if(y){
      this.setState({
        isLoggedIn:true
      });
    } 
    
    if(!z&&!m){
    this.setState({
          comments: [...this.state.comments, this.state.comment.replace(/@/g,"").

          replace(/[\[\]']+/g,'').replace(/[0-9]/g,"").

          replace(/[\(\)']+/g,'')],

          // comment: this.state.comment.replace(/@/g,"").

          //         replace(/[\[\]']+/g,'').replace(/[0-9]/g,"").

          //         replace(/[\(\)']+/g,''),
          comment:"",

          isChecked:false
        });
      }
      
      else{
        this.setState({
          comments: [...this.state.comments, this.state.comment],
          comment: "",
          
        });

      }   
  };

  handleDateSubmit=(value)=>{
    
      var options = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
        var option2={hour:"2-digit",
        hour12:"true",
        minute:"2-digit"
    };
    var value1=value.toLocaleDateString("in", options);
    var value2=value.toLocaleTimeString("in", option2);
    console.log(value1);
    console.log(value2);

    value=value1+"|"+value2;

      this.setState({
        isLoggedIn:false,
        comment:"#Time:"+value.toString(),
        datevalue:this.state.comment    
    });    
  }

  fetch = async(e)=>{
    fetch('http://localhost:3010/comments')
            .then(response => {
              return response.json();
            }).then(result => {
              this.setState({
                abc:result
              });
            });
        console.log(this.state.abc);
        
  }

  handleSaveComment = async(e) => {

    function uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
    console.log(uuidv4());
    var uid= uuidv4();
     
          fetch('http://localhost:3010/comments')
            .then(response => {
              return response.json();
            }).then(result => {
              this.setState({
                abc:result
              });
            });
           console.log(this.state.abc);
            let allComments = (this.state.abc);
              console.log(allComments);
            var l=allComments.length
              console.log(l);
            console.log(allComments.map((c)=>c.comment));
            
            // var c=allComments.map((c)=>c.comment)
            // var is=allComments.map((is)=>is.isChecked)
            //console.log(is);
//---
            for(var i = 0; i < l; i++){
              console.log(allComments[i].comment);//a,b,ab
              console.log(this.state.comment);//ab
this.fetch();
              //var count=0
              if( allComments[i].comment == this.state.comment ){
                 // count=allComments[i].id;
                  //console.log(count);
              //}
            //}  
              
            //if( count > 0 )
              //{
                console.log("if enters");
              
                const res=await fetch(`http://localhost:3010/comments/${allComments[i].id}`,{
                  method:'PUT',
                  headers:{
                      "content-type":'application/json'
                  },
                  body:JSON.stringify(
                  {
                    comment:this.state.comment, 
                    isChecked:this.state.isChecked,
                    id:uid
                  }
                  )
                })     
               // this.fetch();//updates the comment collection when we clik save btn each time          
              }
          
              else
              {
                console.log("else inters");
                const res=await fetch(`http://localhost:3010/comments`,{
                  method:'POST',
                  headers:{
                      "content-type":'application/json'
                  },
                  body:JSON.stringify(
                  {
                    comment:this.state.comment, 
                    isChecked:this.state.isChecked,
                    id:uid
                  }
                  )
                })
                const comment=await res.json();
                console.log(comment);
                //this.fetch();//updates the comment collection when we clik save btn each time
              
        //-----     

    const commentData = this.state.comment;
    let extractHashtag = commentData.match(/#[a-z]+/gi);

    if( !extractHashtag ) return false;

    let hTag = extractHashtag.toString();


    //console.log(extractHashtag);
    //console.log(extractHashtag.toString());
  
   //const data = require('./db.json');

    const resp=await fetch("http://localhost:3010/hashtags" ,{
        method:'POST',
        headers:{
            "content-type":'application/json'
        },
        body:JSON.stringify({value : hTag})

        })
    const hashTag=await resp.json();
    console.log(hashTag);
  }
  console.log(allComments.map((c)=>c.comment));
}
      
  }

  handleCheckbox = e =>{
    console.log(this.state.isChecked);
    this.setState({ 
      isChecked : true
     },() => {console.log(this.state.isChecked);})
  }

  componentDidMount() {
    this.handleCheckbox();
    this.fetch();
  }

  componentWillUnmount(){
    this.setState({
      isChecked :false
    },() => {console.log(this.state.isChecked);});
  }

  render() {
    const { comments, comment } = this.state;

    return (
      <div className="container">
              <Router>
                  <div>
                  {/* <h1>Welcome to routing</h1>
                  <li><Link to ="/">Home</Link></li>
                  <li><Link to ="/contact">Contact us </Link></li>
                  <li><Link to ="/Registration">Registration</Link></li>
                  <li><Link to ="/allplayer">AllPlayer</Link></li> 
                  <li><Link to ="/login">Login</Link></li>  */}

                  <Switch>
                  <Route exact path="/search" component={ASearch}/>
                  </Switch>
                  </div>
                </Router>

        
          <span>
            {comments.map((comment) => (

              <div>
                  <Checkbox
                    onClick={this.handleCheckbox}
                    color="primary"
                  />
                  {comment.replace("#time",this.state.datevalue)}
              </div>
              ))
            }
          </span>
        
          {this.state.isLoggedIn ? <Datepicker abc={this.handleDateSubmit}/> : ""}
        
        
          <hr />
          <MentionsInput
            markup="@[__display__](__id__)"
            value={comment}
            onChange={this.handleCommentChange}
            required={true}
            placeholder={"start commenting..!!"}
          > 
            <Mention trigger="#" data={hashtags} />
            <Mention trigger="@" data={users}/> 
          </MentionsInput>
         
          <button type="button" className="btn btn-outline-warning btn-md" onClick={this.handleSubmitComment}>Comment</button> 
          <button type="button" className="btn btn-outline-success btn-md" onClick={this.handleSaveComment}>Save</button>
            <br/><br/>
          <div>
          <h4>Comments List</h4>
          { this.state.abc.map((c) => '  '+ c.comment +'  '+',' )} 
        </div>
                {/* <div></div>
                <br/>
                <br/>
                <div></div>
                <div></div>
                <div></div> */}
      </div>
  
    );
    
  }
}

render(<App />, document.getElementById("root"));

