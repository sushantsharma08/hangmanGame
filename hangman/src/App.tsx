import { useCallback, useEffect, useState } from 'react'
import words from './wordList.json'
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setguessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter=> !wordToGuess.includes(letter)
  )
  console.log(wordToGuess);


  const addGuessedLetter = useCallback((letter:string)=>{
    if (guessedLetters.includes(letter)) return

    setguessedLetters(currentLetters=>[
      ...currentLetters,letter
    ])
  },[guessedLetters])

  useEffect(() => {
    const handler=(e: KeyboardEvent)=>{
      const key =e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault();
      addGuessedLetter(key)
    }
    
    document.addEventListener("keypress",handler)
  
    return () => {
      document.removeEventListener("keypress",handler)
    }
  },[guessedLetters])
  

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center"
    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>LOSE WIN</div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
        activeLetter={guessedLetters.filter(letter=>
          wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          />
      </div>
    </div>
  )
}
export default App
