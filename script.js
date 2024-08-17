document.addEventListener('DOMContentLoaded', function () {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const alarmListElement = document.getElementById('alarm-list');
    const alarmModal = document.getElementById('alarm-modal');
    const addAlarmBtn = document.getElementById('add-alarm-btn');
    const closeModalBtn = document.querySelector('.close');
    const setAlarmBtn = document.getElementById('set-alarm-btn');
    const themeToggle = document.getElementById('theme-toggle');

    let alarms = [];

    function updateClock() {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        dateElement.textContent = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        alarms.forEach((alarm, index) => {
            if (alarm.enabled) {
                const alarmTime = new Date(alarm.time);
                if (now >= alarmTime && !alarm.rang) {
                    playAlarm(alarm.sound);
                    alarm.rang = true;
                    alert(`Alarm: ${alarm.name}`);
                }
            }
        });
    }

    function playAlarm(sound) {
        const audio = new Audio(sound);
        audio.play();
    }

    function addAlarmToList(alarm, index) {
        const alarmItem = document.createElement('div');
        alarmItem.classList.add('alarm-item');
        alarmItem.innerHTML = `
            <span>${alarm.time.slice(0, 5)} - ${alarm.name}</span>
            <label>
                <input type="checkbox" class="alarm-toggle" ${alarm.enabled ? 'checked' : ''}>
                Enabled
            </label>
        `;
        alarmListElement.appendChild(alarmItem);

        const toggle = alarmItem.querySelector('.alarm-toggle');
        toggle.addEventListener('change', () => {
            alarms[index].enabled = toggle.checked;
        });
    }

    addAlarmBtn.addEventListener('click', () => {
        alarmModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        alarmModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == alarmModal) {
            alarmModal.style.display = 'none';
        }
    });

    setAlarmBtn.addEventListener('click', () => {
        const alarmTime = document.getElementById('alarm-time').value;
        const alarmName = document.getElementById('alarm-name').value;
        const alarmSoundInput = document.getElementById('alarm-sound');
        const alarmSound = alarmSoundInput.files[0] ? URL.createObjectURL(alarmSoundInput.files[0]) : '';

        if (alarmTime && alarmName && alarmSound) {
            const alarm = {
                time: new Date(new Date().toDateString() + ' ' + alarmTime).toISOString(),
                name: alarmName,
                sound: alarmSound,
                rang: false,
                enabled: true
                };
                alarms.push(alarm);
                addAlarmToList(alarm, alarms.length - 1);
                alarmModal.style.display = 'none';
                } else {
                alert('Please fill in all fields.');
                }
                });
                themeToggle.addEventListener('change', () => {
                    document.body.classList.toggle('dark-mode');
                });
                
                setInterval(updateClock, 1000);
            });000                