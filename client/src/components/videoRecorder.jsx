import React, { useEffect } from 'react';
import { useRecordWebcam } from 'react-record-webcam'
import useTimer from '../hooks/useTImer';

export default function VideoRecorder({ }) {

  let timeouts = [];
  const recordWebcam = useRecordWebcam();
  const timer = useTimer();

  useEffect(()=> {
    // recordWebcam.open();
    return () => clearTimeouts();
  }, []);
  
  function clearTimeouts() {
    console.log('Cleaning timeouts from video recorder');
    timeouts.forEach(t => {
      clearTimeout(t);
    });
  }

  function saveFile() {
    const blob = recordWebcam.getRecording();
  }

  function startRecording() {
    timer.resetTime();
    timer.start();
    // recordWebcam.start();
    const newTimeout = setTimeout(()=> {
      console.log('Stop recording');
      stopRecording();
    },10000);
    timeouts.push(newTimeout);
  }

  function stopRecording() {
    // recordWebcam.stop();
    clearTimeouts();
    // timer.stop();
  }

  function retake() {
    timer.start();
    startRecording();
  }

  return (
    <>
      <div>
        <p>time: {timer.time}</p>
        <p>Camera status: {recordWebcam.status}</p>
        <button onClick={recordWebcam.open}>Open camera</button>
        <button onClick={startRecording}>Start recording</button>
        <button onClick={recordWebcam.stop}>Stop recording</button>
        <video width={300} ref={recordWebcam.webcamRef} autoPlay muted />
        <video wisth={200} ref={recordWebcam.previewRef} autoPlay muted loop />
      </div>
    </>
  );
}
