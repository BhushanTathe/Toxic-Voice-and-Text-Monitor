
document.getElementById('filterButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;

    fetch('http://localhost:3000/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputText })
    })
    .then(response => response.json())
    .then(data => {
        const filteredText = data.sanitizedMessage;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.textContent = filteredText;

        const messagesContainer = document.getElementById('messages');
        messagesContainer.appendChild(messageDiv);

        document.getElementById('inputText').value = '';

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('messages').innerHTML = '';
    document.getElementById('inputText').value = '';
});

let mediaRecorder;
let audioChunks = [];
let timer;
const monitoringDuration = 60000; 

document.getElementById('voiceButton').addEventListener('click', function() {
    const voiceButton = document.getElementById('voiceButton');
    if (voiceButton.textContent === 'Start Voice Monitoring') {
        startVoiceMonitoring();
        voiceButton.textContent = 'Stop Voice Monitoring';
    } else {
        stopVoiceMonitoring();
        voiceButton.textContent = 'Start Voice Monitoring';
    }
});

function startVoiceMonitoring() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
                if (mediaRecorder.state === 'inactive') {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                  
                }
            };

            
            timer = setTimeout(() => {
                stopVoiceMonitoring();
                document.getElementById('voiceButton').textContent = 'Start Voice Monitoring';
            }, monitoringDuration);
        })
        .catch(error => {
            console.error('Error accessing audio stream:', error);
        });
}

function stopVoiceMonitoring() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop the audio stream
        mediaRecorder = null;
        audioChunks = [];
    }

   
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
}
