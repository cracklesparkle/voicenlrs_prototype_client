import React, { useEffect, useState } from 'react';
import styles from './App.module.scss'
import speaker_icon from './speaker.svg'
import logo_nlrs from './logo_nlrs.svg'
import silero_logo from './Black-logo-silero.png'
import { motion } from 'framer-motion'
const TTSClient = () => {
  const [text, setText] = useState('')
  const [audio, setAudio] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleSynthesize = async () => {
    setProcessing(true)
    await fetch('http://172.82.86.107:5000/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    }).then(async response => {
      const audioData = await response.arrayBuffer()
      setAudio(URL.createObjectURL(new Blob([audioData], { type: 'audio/wav' })))
    }).finally(() => {
      setProcessing(false)
    })
  }

  useEffect(() => {
    console.log(processing)
  }, [processing])

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <img src={logo_nlrs}></img>
      </div>

      <div className={styles.section}>
        <h1>NLRS Text to Speech</h1>
        <h2 className={styles.centered_text}>Наш сервис предоставляет простые и интуитивные решения для работы с текстами на якутском языке.</h2>
        <p>Вы можете проверить, как это работает, просто введите текст:</p>
        <div className={styles.section_element}>
          <div class={styles.input_wrapper}>
            <input aria-label="Ask us anything" value={text} onChange={handleTextChange}></input>
            <span class={styles.placeholder} style={{ display: text != '' && 'none' }}></span>
            {text != '' && 
            <motion.div
            whileTap={{ scale: 0.95 }} 
            className={styles.input_synthesize} onClick={handleSynthesize}>
              {!processing && <img className={styles.speaker_icon} src={speaker_icon} />}
              {processing &&
                <div class={styles.center}>
                  <div class={styles.wave}></div>
                  <div class={styles.wave}></div>
                  <div class={styles.wave}></div>
                  <div class={styles.wave}></div>
                  <div class={styles.wave}></div>
                </div>
              }
            </motion.div>}
          </div>
        </div>
        {/* <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.synthesize_button}
          onClick={handleSynthesize}>

          {!processing && <img className={styles.speaker_icon} src={speaker_icon} />}
          {processing &&
            <div class={styles.center}>
              <div class={styles.wave}></div>
              <div class={styles.wave}></div>
              <div class={styles.wave}></div>
              <div class={styles.wave}></div>
              <div class={styles.wave}></div>
            </div>
          }

        </motion.div> */}

        {audio && <audio controls src={audio} />}
      </div>

      <div className={styles.section}>
        <div className={styles.section_element}>
          В прототипе используется модель распознавания речи Silero TTS ©.
        </div>
        <div className={styles.section_element}>
          <img className={styles.silero_logo} src={silero_logo}></img>
          <a href='https://github.com/snakers4/silero-models'>Модели Silero на Github</a>
          <a href='https://silero.ai/'>Silero Speech</a>
        </div>

        <p>Реализовано для © Национальная библиотека Республики Саха (Якутия), 2023</p>
      </div>

      <div className={styles.bg_wrapper}>
        <div className={styles.gradient}></div>
      </div>

    </div>
  );
};

export default TTSClient;
