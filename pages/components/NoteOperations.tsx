import { useState, useEffect } from 'react';
import styles from '../../styles/Evernote.module.scss'

export default function NoteOperations() {
    const [isInputVisible, setInputVisible] = useState(false)
    const [noteTitle, setNoteTitle] = useState('')

    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    return (
        <>
            <div className={styles.btnContainer}>
                <button
                    onClick={inputToggle}
                    className={styles.button}>
                    Add a New Note
                </button>

                {isInputVisible ? (
                    <div className={styles.inputContainer}>
                        <input 
                        className={styles.input} 
                        placeholder='Enter the Title...' 
                        onChange={(e) => setNoteTitle(e.target.value)}
                        />
                    </div>
                ) : (
                    <></>
                )}

            </div>
        </>
    )
}