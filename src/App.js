// Step One: Import 'useState' and 'useEffect from react
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  // Step Two: We have impotrted useState, but now we need to set our declare our state variable (meme, memeIMgae
  // as well as our method for updating/setting state (setMeme, setMemeImage).
  // We're setting the default value of meme to NULL (MORE ON THIS LATER)
  // Then we can use the setMeme like we would use setState 
   const [memes, setMemes] =  useState([])
   const [jokes, setJokes] = useState([])
   const [memeImage, setMemeImage] = useState(null)
   const [joke, setJoke] = useState(null)


 // Step 3: Write our useEffect Function 
 // Now we can see that we set the state of meme to NULL so that 
 // as we wait for for our fetch to complete, we are not attempting to render our meme
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    // Step 4: Now we can set meme => to an an array of images we received from the fetch response
    .then(data => setMemes(data.data.memes))
  }, [])

  useEffect(() => {
      fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=10")
      .then(response => response.json())
      // Step 4: Now we can set meme => to an an array of images we received from the fetch response
      .then(data => setJokes(data.jokes))
    }, [])
  

 // console.log(memes)
 // console.log(memes[Math.floor(Math.random()*memes.length)])
 const handleJokeClick = () => {
   console.log(jokes)
   //debugger
   let oneJoke = jokes[Math.floor(Math.random()*jokes.length)]
   console.log(oneJoke)
    setJoke(oneJoke)
 }


 // Step Five: if we want to get a random image each time, we can use the following.
 // The easiest way to down to the one piece of data you want is to use debugger and console.logs
 // walk it through your code and play in the console to access the key/value that you want to display
 const handleMemeClick = () => {
  let meme = memes[Math.floor(Math.random()*memes.length)]
  // Step Six: Now we have one image we can use to set our image state to display below
  setMemeImage(meme.url)
 }

  // Step Seven: Using && to say that only run/display the img tag if memeImage is true 
  // Reminder if memeImage is null it won't attempt to render the image
  return (
    <div className="App">
    <h3>I need a break!</h3>
    {memeImage && <img src={memeImage} alt="meme"></img>}
    {joke && <h4>{joke.setup} <br></br>  <br></br>  {joke.delivery}</h4>}

   
    <button id="meme-button" onClick={handleMemeClick}>Get me a MEME</button>
    <button id="joke-button" onClick={handleJokeClick}>Get me a JOKE</button>
 
    </div>
  );
}

export default App;
