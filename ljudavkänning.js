document.addEventListener('DOMContentLoaded', function () {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            var audioContext = new (window.AudioContext || window.webkitAudioContext)();
            var analyser = audioContext.createAnalyser();
            var microphone = audioContext.createMediaStreamSource(stream);

            microphone.connect(analyser);
            analyser.connect(audioContext.destination);

            analyser.fftSize = 256;
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);

            function update() {
                analyser.getByteFrequencyData(dataArray);
                var average = getAverageVolume(dataArray);

                // Anpassa denna tröskel efter dina behov
                if (average > 100) {
                    document.getElementById('status').textContent = 'Låt matten tysta munn!';
                } else {
                    document.getElementById('status').textContent = 'Väntar på ljud...';
                }

                requestAnimationFrame(update);
            }

            function getAverageVolume(array) {
                var values = 0;
                var average;

                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += array[i];
                }

                average = values / length;
                return average;
            }

            update();
        })
        .catch(function (err) {
            console.error('Fel: ' + err);
        });
});
