/* TEMPERATURE GAUGE */

// Function to fetch actual temperature data from the server
function fetchTemperatureData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingTemp; // Get the temperature value from the server response
        })
        .catch(error => {
            console.error("Error fetching temperature data:", error);
            return 0; // Return default value (0) if there is an error
        });
}

// Function to update the temperature gauge
function updateTemperatureGauge() {
    const gaugeElement = document.querySelector(".gauge-card-1 .gauge");

    fetchTemperatureData()
        .then(temperatureInCelsius => {
            const normalizedTemperature = temperatureInCelsius / 100; // Normalize the temperature value to a range of 0 to 1
            setTemperatureGaugeValue(gaugeElement, normalizedTemperature);

            setTimeout(updateTemperatureGauge, 6000); // Update every 6 seconds
        });
}

// Function to set the temperature gauge value
function setTemperatureGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    const angle = value * 180; // Convert normalized value to an angle (0 to 180 degrees)
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}°C`; // Display temperature in Celsius
}

updateTemperatureGauge(); // Start updating the temperature gauge

/* HUMIDITY GAUGE */

// Function to fetch actual humidity data from the server
function fetchHumidityData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingHum; // Get the humidity value from the server response
        })
        .catch(error => {
            console.error("Error fetching humidity data:", error);
            return 0; // Return default value (0) if there is an error
        });
}

// Function to update the humidity gauge
function updateHumidityGauge() {
    const gaugeElement = document.querySelector(".gauge-card-2 .gauge");

    fetchHumidityData()
        .then(humidityInPercentage => {
            const normalizedHumidity = humidityInPercentage / 100; // Normalize the humidity value to a range of 0 to 1
            setHumidityGaugeValue(gaugeElement, normalizedHumidity);

            setTimeout(updateHumidityGauge, 6000); // Update every 6 seconds
        });
}

// Function to set the humidity gauge value
function setHumidityGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    const angle = value * 180; // Convert normalized value to an angle (0 to 180 degrees)
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}%`; // Display humidity value
}

updateHumidityGauge(); // Start updating the humidity gauge

/* ALTITUDE GAUGE */

// Function to fetch actual altitude data from the server
function fetchAltitudeData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingAlt; // Get the altitude value from the server response
        })
        .catch(error => {
            console.error("Error fetching altitude data:", error);
            return 0; // Return default value (0) if there is an error
        });
}

// Function to update the altitude gauge
function updateAltitudeGauge() {
    const gaugeElement = document.querySelector(".gauge-card-3 .gauge");

    fetchAltitudeData()
        .then(altitudeInMetre => {
            const normalizedAltitude = altitudeInMetre / 1000; // Normalize the altitude value to a range of 0 to 1
            setAltitudeGaugeValue(gaugeElement, normalizedAltitude);

            setTimeout(updateAltitudeGauge, 6000); // Update every 6 seconds
        });
}

// Function to set the altitude gauge value
function setAltitudeGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
    gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 1000)} m`; // Display altitude in meters
}

updateAltitudeGauge(); // Start updating the altitude gauge

/* PRESSURE GAUGE */

// Function to fetch actual pressure data from the server
function fetchPressureData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingPress; // Get the pressure value from the server response
        })
        .catch(error => {
            console.error("Error fetching pressure data:", error);
            return 0; // Return default value (0) if there is an error
        });
}

// Function to update the pressure gauge
function updatePressureGauge() {
    const gaugeElement = document.querySelector(".gauge-card-4 .gauge");

    fetchPressureData()
        .then(PressureInHpa => {
            const normalizedPressure = PressureInHpa / 6000; // Normalize the pressure value to a range of 0 to 1
            setPressureGaugeValue(gaugeElement, normalizedPressure);

            setTimeout(updatePressureGauge, 6000); // Update every 6 seconds
        });
}

// Function to set the pressure gauge value
function setPressureGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${value * 180}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${(value * 6000).toFixed(2)} hPa`; // Display pressure in hPa
}

updatePressureGauge(); // Start updating the pressure gauge

/* CO (PPM) GAUGE */

// Function to fetch actual CO data from the server
function fetchCOData() {
    return fetch(`/updateData`)
        .then((response) => response.json())
        .then(data => {
            return data.readingCO; // Get the CO value from the server response
        })
        .catch(error => {
            console.error("Error fetching CO data:", error);
            return 0; // Return default value (0) if there is an error
        });
}

// Function to update the CO gauge
function updateCOGauge() {
    const gaugeElement = document.querySelector(".gauge-card-6 .gauge");

    fetchCOData()
        .then(COInPPM => {
            const normalizedCO = Math.min(COInPPM / 1000, 1); // Normalize the CO value to a range of 0 to 1
            setCOGaugeValue(gaugeElement, normalizedCO);

            setTimeout(updateCOGauge, 6000); // Update every 6 seconds
        });
}

function updateCOStatus() {
    const statusElement = document.querySelector(".quality h5");

    fetchCOData()
        .then(MQ9Value => {
            if (MQ9Value > 0.35) {
                statusElement.textContent = "WARNING!!";
            } else {
                statusElement.textContent = "SAFE";
            }

            setTimeout(updateCOStatus, 6000); // Update every 6 seconds
        });
}
updateCOStatus();

// Function to set the CO gauge value
function setCOGaugeValue(gauge, value) {
    if (value < 0 || value > 1) {
        return;
    }
    const angle = value * 180
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${angle}deg)`;
    gauge.querySelector(".gauge__cover").textContent = `${(value * 1000).toFixed(3)}Ppm`; // Display CO level
}

updateCOGauge(); // Start updating the CO gauge

/* LINE CHART */

// Function to update chart data and labels
function updateChart(chart, temperatureData, humidityData, label) {
    if (chart.data.labels.length >= 30) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
    }

    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(temperatureData);
    chart.data.datasets[1].data.push(humidityData);
    chart.update();
}

// Function to create a line chart
function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: [],
                    borderColor: '#E7D7C4',
                    backgroundColor: 'rgba(255, 133, 81, 0.2)',
                    tension: 0.4,
                    fill: true,
                },
                {
                    label: 'Humidity (%)',
                    data: [],
                    borderColor: '#BA7E76',
                    backgroundColor: 'rgba(255, 184, 77, 0.2)',
                    tension: 0.4,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    display: true,
                    grid: {
                        display: false,
                    },
                },
                y: {
                    display: true,
                    grid: {
                        display: true,
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
            },
        },
    });

    return lineChart;
}

// Function to start updating the line chart every 15 seconds
function startUpdatingChart() {
    const lineChart = createLineChart();

    setInterval(async () => {
        const temperatureData = await getActualTemperatureData();
        const humidityData = await getActualHumidityData();
        const currentTime = moment().format('HH:mm'); // Get current time and format as 'HH:mm'

        updateChart(lineChart, temperatureData, humidityData, currentTime);
    }, 15000); // Set interval to 15 seconds
}

// Function to get actual temperature data from the server
async function getActualTemperatureData() {
    const response = await fetch('/updateData');
    const data = await response.json();
    return data.readingTemp;
}

// Function to get actual humidity data from the server
async function getActualHumidityData() {
    const response = await fetch('/updateData');
    const data = await response.json();
    return data.readingHum;
}

startUpdatingChart(); // Start updating the line chart

/* STATUS*/

async function changeCaption(value) {
                var captionElement = document.querySelector('.quality h5');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau4').addEventListener('click', function (){
                    changeCaption('WARNING!!');
                });
                document.getElementById('Merah4').addEventListener('click', function (){
                    changeCaption('SAFE');
                });
async function changeCaption1(value) {
                var captionElement = document.querySelector('.lamp1 h3');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau1').addEventListener('click', function () {
                    changeCaption1('ON');
                });
                document.getElementById('Merah1').addEventListener('click', function () {
                    changeCaption1('OFF');
                });
async function changeCaption2(value) {
                var captionElement = document.querySelector('.lamp2 h3');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau2').addEventListener('click', function () {
                    changeCaption2('ON');
                });
                document.getElementById('Merah2').addEventListener('click', function () {
                    changeCaption2('OFF');
                });
async function changeCaption3(value) {
                var captionElement = document.querySelector('.lamp3 h3');
                captionElement.textContent = value;
                }
                document.getElementById('Hijau3').addEventListener('click', function () {
                    changeCaption3('ON');
                });
                document.getElementById('Merah3').addEventListener('click', function () {
                    changeCaption3('OFF');
                });

// Fetch the IP data from the server
async function fetchIpData() {
    try {
        const response = await fetch('/updateData');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP data:', error);
        return '0.0.0.0'; // Return a default IP address in case of error
    }
}

//Update the IP display on the webpage
async function updateIpDisplay() {
    const displayElement = document.querySelector('.ip h3');

    try {
         const ipAddress = await fetchIpData();
        displayElement.textContent = `${ipAddress}`; // Display IP address in the selected element

        // Repeat the update every 6 seconds
        setTimeout(updateIpDisplay, 6000);
    } catch (error) {
        console.error('Error updating IP display:', error);
    }
}

// Call the function to start the update cycle
updateIpDisplay();

