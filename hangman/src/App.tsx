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

  const isLoser = incorrectLetters.length>=6;
  const isWinner = wordToGuess.split("").every(letter=>guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter:string)=>{
    if (guessedLetters.includes(letter)||isLoser||isWinner) return

    setguessedLetters(currentLetters=>[
      ...currentLetters,letter
    ])
  },[guessedLetters,isLoser,isWinner])

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
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner&& "Winner!"}
        {isLoser&& "You Lost!"}
        </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
        disabled={isWinner||isLoser}
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
