import React, { useState } from "react";
import { render } from "react-dom";
import { MentionsInput, Mention } from "react-mentions";
import DateTimePicker from 'react-datetime-picker';
import Linkify from "./Linkify";
import ASearch from "./advancesearch";
import { BrowserRouter as Router,Route, Routes, Switch } from "react-router-dom";

import { Checkbox} from "@material-ui/core";

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

// const comments1= [
//   {
//     "id": "112",
//     "isChecked": 1,
//     "comment": "Amit"
//   },
// ]
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
    isChecked:false
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

//  handleSaveComment = async(e)=>{
//          e.preventDefault();
//          const {id,display}=hashtags;
         
//          console.log(hashtags);

//          const red=await fetch("http://localhost:3010/hashtags",{
//           method:'POST',
//         headers:{
//             "content-type":'application/json'
//         },
//         body:JSON.stringify({id: "45",
//         display: "Sunil12"
//         })

//       })

//       const red1=await fetch("http://localhost:3010/comments",{
//         method:'POST',
//       headers:{
//           "content-type":'application/json'
//       },
//       body:JSON.stringify({id: "118",
//       isChecked: 0,
//       comment: "Ankit #Football"
//       })

//     })


         /*  const res=await fetch("http://localhost:3010/hashtags/",{
           method:'POST',
         headers:{
             "content-type":'application/json'
         },
         body:JSON.stringify({hashtags

         })

       }) */

      // }


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

          comment: this.state.comment.replace(/@/g,"").

                  replace(/[\[\]']+/g,'').replace(/[0-9]/g,"").

                  replace(/[\(\)']+/g,''),
          isChecked:false
        });
      }
      
      else{
        this.setState({
          comments: [...this.state.comments, this.state.comment],
          comment: this.state.comment,
          
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

  handleSaveComment = async(e) => {
      
          const res=await fetch("http://localhost:3010/comments",{
            method:'POST',
          headers:{
              "content-type":'application/json'
          },
          body:JSON.stringify(
            {comment:this.state.comment, isChecked:this.state.isChecked}
            )
        })
        const data=await res.json();
        console.log(data);
      

    const commentData = this.state.comment;
    let extractHashtag = commentData.match(/#[a-z]+/gi);

    //console.log(extractHashtag);
      
        const resp=await fetch("http://localhost:3010/hashtags" ,{
          method:'POST',
        headers:{
            "content-type":'application/json'
        },
        body:JSON.stringify({extractHashtag: extractHashtag})

        })
        const hashTag=await resp.json();
        console.log(hashTag);
      

    //console.log(this.state.isChecked);
 
  }

  handleCheckbox = e =>{
    console.log(this.state.isChecked);
    this.setState({ 
      isChecked : true
     },() => {console.log(this.state.isChecked);});
  }

  componentDidMount() {
    this.handleCheckbox();
  }

  componentWillUnmount(){
    this.setState({
      isChecked :false
    },() => {console.log(this.state.isChecked);});
  }
//-------
  render() {
    const { comments, comment } = this.state;
    return (
      <div>
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

                {/* <span>

                {comments.map(comment => <b><p>{comment.replace("#time",this.state.datevalue)}</p></b>)} 
                
                </span>
                
                {this.state.isLoggedIn ? <Datepicker abc={this.handleDateSubmit}/> : ""}
                
                <hr />
                <MentionsInput
                  markup="@[__display__](__id__)"
                  value={comment}
                  onChange={this.handleCommentChange}
                > 
                  
                  <Mention trigger="#" data={hashtags} />

                  <Mention trigger="@" data={users}/>
                
                </MentionsInput>

                <button onClick={this.handleSubmitComment}>Comment</button>
                <button onClick={this.handleSaveComment}>Save</button>       */}

          
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
          > 
            
            <Mention trigger="#" data={hashtags} />

            <Mention trigger="@" data={users}/>
          
          </MentionsInput>

          <button onClick={this.handleSubmitComment}>Comment</button> 
          <button onClick={this.handleSaveComment}>SAVE</button>

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

