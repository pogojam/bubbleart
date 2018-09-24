import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
      constructor(props) {
        super(props);
        this.state={
          active:false
        }
      }
      
  componentDidMount(){
    initCanvas()
  }


  render() {
    return (
      <div className="App">
        <canvas style={canvasStyle} id="HomeCanvas"/>
        <div style={containerStyle} id="MainContainer" >
        <div className="section">
            <div id="textpullout1">

            </div>
        </div>
        <div className="section"></div>
        <div className="section"></div>


        </div>
      </div>
    );
  }
}
const canvasStyle = {
  position:'fixed',
  top:'0',
  left:'0'

}
const containerStyle = { 
    height:'300vh'
}



// util functions

const getDistance = (x1,y1,x2,y2) => {
      let xDistance = x1 - x2;
      let yDistance = y1 - y2;

      return Math.sqrt(
        Math.pow(xDistance,2)+Math.pow(yDistance,2)
      )
      
} 





const initCanvas = () => {
  
  // canvas context
    const canvas = document.getElementById('HomeCanvas')
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    const c = canvas.getContext('2d');
    
    // window variables
    var innerWidth = window.innerWidth
    var innerHeight = window.innerHeight
    // Mouse
    var mouse = {
      x:null,
      y:null
    }
    document.addEventListener('mousemove',(event)=>{
          mouse.x = event.x
          mouse.y = event.y
    })    

    // scroll
    let polarity='down';
    let scrollRatio
    let containerHeight = document.getElementById('MainContainer').getBoundingClientRect().height
    
    document.addEventListener('scroll',(event)=>{


      if(scrollRatio<window.pageYOffset/(containerHeight-innerHeight)){
          polarity = 'down'
      }
      if(scrollRatio>window.pageYOffset/(containerHeight-innerHeight)){
        polarity = 'up'
      }
      
      scrollRatio=window.pageYOffset/(containerHeight-innerHeight)

    })

    let maxBubble = 300
    let bubbleCount = Math.floor(scrollRatio * maxBubble)
    
    const updateScrollBubble = () => {

      if(bubbleCount!=Math.floor(scrollRatio * maxBubble)){

        if(polarity==='up'){

                  BubbleArray.length = bubbleCount+initBubbles
                  console.log(BubbleArray.length);
        }
        if(polarity==='down'){
          for(let i=BubbleArray.length;i<bubbleCount; i++){

            let x = Math.random() * innerWidth
            let y =  innerHeight
            const radius = 20 * Math.random()
            const colorArray = ['#027495','#01a9c1','#bad6db']
            const color = colorArray[Math.floor(Math.random()*3)]
            
            BubbleArray.push(new Bubble(x,y,radius,color))
          }
        }
        

      }
      bubbleCount=Math.floor(scrollRatio * maxBubble)

      
    } 
     
    // shapes

// pullout interaction


const pullout = document.getElementById('textpullout1')

    const containerPullout = {
        y:pullout.offsetTop + pullout.offsetHeight,
        x:pullout.offsetWidth
    }

console.log(containerPullout);

  
  const Bubble = function (x,y,radius,color){

    this.color = color
    this.radius = radius
    this.x = x
    this.y = y

    let lift = - (Math.random()*10)+3

    this.dx = 0
    this.dy = 0

    this.update =() => {
      
      if(this.y<0){
        this.y = innerHeight
        this.x = Math.random() * innerWidth
        this.dy = -Math.random()*5
      }
      // Mouse Interaction
      if(getDistance(this.x,this.y,mouse.x,mouse.y)<100){
        this.x>mouse.x? this.dx =1 : this.dx = -1
        
      }


      // Container Interaction
      if(getDistance(this.x,this.y,containerPullout.x,containerPullout.y) < 10 ){
        this.dx = 1 
        this.dy = -1
     
        console.log('dfds');      
      }
      // add velocitys
      this.y += this.dy
      this.x += this.dx
      // upward gravity
      this.y += lift
      // Draw Shape
      this.draw()
    }
    this.draw = () => {
      c.beginPath();
      c.arc(this.x,this.y,this.radius,0,2*Math.PI)
      c.fillStyle = color
      c.fill()
    }  
} 

const TransitionBackground = function () {

  // 180 300 550 

  this.HLSA = {
    h:300,
    s:200,
    l:50,
    a:.5
  }

      this.draw =()=>{
        c.fillStyle = `hsla(${this.HLSA.h},${this.HLSA.s}%,${this.HLSA.l}%,${this.HLSA.a})`
        c.fillRect(0,0,innerWidth,innerHeight)
      }
}

const NightBackgound = new TransitionBackground()

    let BubbleArray ;
    const initBubbles = 40


// inital bubbles

    const initShapes =()=>{
      // add shapes
      BubbleArray = []
      // push shapes into array
      for (let i = 0; i < initBubbles; i++) {
              // positon
      let x = Math.random() * innerWidth
      let y = Math.random() * innerHeight
      const radius = 10 * Math.random()
      const colorArray = ['#027495','#01a9c1','#bad6db']
      const color = colorArray[Math.floor(Math.random()*3)]
      
          BubbleArray.push(new Bubble(x,y,radius,color))
      }
    }

  

    initShapes()
      
    const animate = () => {

      requestAnimationFrame(animate)
      c.fillStyle = '#091f34'
      c.fillRect(0,0,innerWidth,innerHeight)
      updateScrollBubble()
      NightBackgound.draw()
      BubbleArray.map(Bubble=>Bubble.update())
    
      
    }
      
    animate()
}

export default App;
