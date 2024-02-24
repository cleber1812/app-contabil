// import { useState } from "react"
// import { Tweet } from "./components/Tweet"

import './App.css'
import { AppRoutes } from "./Routes"

 function App() {
  // const [tweets, setTweets] = useState<string[]>([
  //   'Tweet 1',
  //   'Tweet 2',
  //   'Tweet 3',
  //   'Tweet 4',
  // ])

  // function createTweet(){
  //   //console.log("criar")
  //   //setTweets(['Tweet 5'])
  //   setTweets([...tweets, 'Tweet 5'])

  // }

  return (
    <AppRoutes />
  )

    

    //   <div>
    //     <h1>APP CONTABIL</h1>
    //     {/* <Tweet text="Tweet 1"/>
    //     <Tweet text="Tweet 2"/>
    //     <Tweet text="Tweet 3"/> */}
        
    //     {tweets.map(tweet => {
    //       return <Tweet text={tweet} />
    //     })}

    //     <button 
    //     onClick={createTweet}
    //     style={{
    //       backgroundColor: '#8257e6',
    //       border: 2,
    //       borderColor: '#824404',
    //       padding: '6px 12px',
    //       color: '#FFF'
    //     }}
    //     >
    //       Adicionar tweet
    //     </button>
    //   </div>
    // );

}

export default App
