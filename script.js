document.addEventListener('DOMContentLoaded', () => {
    // 🚘 Simulated Automobile Dataset (based on your project file snippets)
    const automobileData = [
        { make: 'Toyota', fuelType: 'Petrol', horsepower: 120, mileage: 18, cylinders: 4 },
        { make: 'Honda', fuelType: 'Diesel', horsepower: 150, mileage: 22, cylinders: 4 },
        { make: 'Ford', fuelType: 'Petrol', horsepower: 200, mileage: 15, cylinders: 6 },
        { make: 'BMW', fuelType: 'Diesel', horsepower: 250, mileage: 12, cylinders: 6 },
        { make: 'Maruti', fuelType: 'Petrol', horsepower: 80, mileage: 25, cylinders: 4 },
        { make: 'Hyundai', fuelType: 'CNG', horsepower: 90, mileage: 27, cylinders: 4 },
        { make: 'Audi', fuelType: 'Diesel', horsepower: 300, mileage: 10, cylinders: 8 },
        { make: 'Tata', fuelType: 'Petrol', horsepower: 110, mileage: 20, cylinders: 4 },
        { make: 'Mahindra', fuelType: 'Diesel', horsepower: 180, mileage: 16, cylinders: 6 },
        { make: 'Nissan', fuelType: 'Petrol', horsepower: 130, mileage: 19, cylinders: 4 },
        { make: 'Kia', fuelType: 'CNG', horsepower: 95, mileage: 28, cylinders: 4 },
        { make: 'Chevrolet', fuelType: 'Diesel', horsepower: 160, mileage: 14, cylinders: 6 },
        { make: 'Volkswagen', fuelType: 'Petrol', horsepower: 170, mileage: 17, cylinders: 4 },
        { make: 'Skoda', fuelType: 'Diesel', horsepower: 220, mileage: 13, cylinders: 6 },
        { make: 'Jeep', fuelType: 'Petrol', horsepower: 210, mileage: 16, cylinders: 6 },
        { make: 'Mercedes', fuelType: 'Diesel', horsepower: 280, mileage: 11, cylinders: 8 },
        { make: 'Renault', fuelType: 'Petrol', horsepower: 140, mileage: 21, cylinders: 4 },
        { make: 'Fiat', fuelType: 'CNG', horsepower: 100, mileage: 26, cylinders: 4 },
        { make: 'Volvo', fuelType: 'Diesel', horsepower: 260, mileage: 12, cylinders: 6 },
        { make: 'Hyundai', fuelType: 'Diesel', horsepower: 146, mileage: 28.7, cylinders: 3 },
        { make: 'Ford', fuelType: 'Diesel', horsepower: 128, mileage: 20.8, cylinders: 8 },
        { make: 'BMW', fuelType: 'Diesel', horsepower: 111, mileage: 25.7, cylinders: 6 },
        { make: 'Toyota', fuelType: 'Diesel', horsepower: 84, mileage: 11, cylinders: 3 },
        { make: 'BMW', fuelType: 'Electric', horsepower: 227, mileage: 22.7, cylinders: 8 },
        { make: 'Ford', fuelType: 'Diesel', horsepower: 167, mileage: 29.1, cylinders: 3 },
        { make: 'Honda', fuelType: 'Diesel', horsepower: 296, mileage: 20.6, cylinders: 3 },
    ];

    const filterSelect = document.getElementById('cylinder-filter');
    const totalCarsEl = document.getElementById('total-cars');
    const avgMileageEl = document.getElementById('avg-mileage');
    const carListEl = document.getElementById('car-list');
    
    // Global variable for the chart instance
    let mileageChart;

    // Helper function to calculate average mileage per fuel type
    function getChartData(data) {
        const fuelTypeMileage = {}; 
        const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric'];
        const chartDataArray = [];

        // 1. Group mileages by fuel type
        data.forEach(car => {
            if (!fuelTypeMileage[car.fuelType]) {
                fuelTypeMileage[car.fuelType] = [];
            }
            fuelTypeMileage[car.fuelType].push(car.mileage);
        });

        // 2. Calculate average for each fuel type
        fuelTypes.forEach(fuel => {
            const mileages = fuelTypeMileage[fuel] || [];
            const average = mileages.length > 0
                ? (mileages.reduce((sum, m) => sum + m, 0) / mileages.length).toFixed(2)
                : 0;
            
            // Only include fuel types that exist in the filtered data
            if(parseFloat(average) > 0) {
                chartDataArray.push({ fuelType: fuel, average: parseFloat(average) });
            }
        });

        return chartDataArray;
    }

    // 1. Populate the filter options based on unique cylinder values
    const uniqueCylinders = [...new Set(automobileData.map(car => car.cylinders))].sort((a, b) => a - b);
    uniqueCylinders.forEach(cyl => {
        const option = document.createElement('option');
        option.value = cyl;
        option.textContent = `${cyl} Cylinders`;
        filterSelect.appendChild(option);
    });


    // 2. Main function to filter data and update the dashboard
    function filterAndDisplayData() {
        if (!filterSelect) return; 

        const selectedCylinders = filterSelect.value;

        // Filter the data based on the "slicer" selection
        const filteredData = automobileData.filter(car => {
            if (selectedCylinders === 'all') {
                return true;
            }
            return car.cylinders === parseInt(selectedCylinders);
        });

        // Calculate Overall Average Mileage (Key Project Metric)
        const totalMileage = filteredData.reduce((sum, car) => sum + car.mileage, 0);
        const averageMileage = filteredData.length > 0 
            ? (totalMileage / filteredData.length).toFixed(2) 
            : 0;

        // Update Metrics
        totalCarsEl.textContent = filteredData.length;
        avgMileageEl.textContent = `${averageMileage} MPG`;
        
        // --- CHART UPDATE LOGIC ---
        const chartData = getChartData(filteredData);
        const labels = chartData.map(d => d.fuelType);
        const dataValues = chartData.map(d => d.average);
        
        // Define colors for consistency
        const chartColors = {
            'Petrol': 'rgba(75, 192, 192, 0.8)',
            'Diesel': 'rgba(255, 99, 132, 0.8)',
            'CNG': 'rgba(54, 162, 235, 0.8)',
            'Electric': 'rgba(255, 206, 86, 0.8)'
        };
        
        const backgroundColors = labels.map(label => chartColors[label]);

        if (mileageChart) {
            // Update existing chart instance
            mileageChart.data.labels = labels;
            mileageChart.data.datasets[0].data = dataValues;
            mileageChart.data.datasets[0].backgroundColor = backgroundColors;
            mileageChart.update();
        } else {
            // Initialize the chart
            const ctx = document.getElementById('mileageChart').getContext('2d');
            mileageChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Avg. Mileage (MPG)',
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Average Mileage (MPG)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Fuel Type'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
        
        // --- END CHART UPDATE LOGIC ---

        // Update Car List
        carListEl.innerHTML = ''; // Clear previous list
        
        if (filteredData.length === 0) {
            carListEl.innerHTML = '<li>No vehicles found for the selected filter.</li>';
        } else {
            filteredData.forEach(car => {
                const listItem = document.createElement('li');
                listItem.textContent = `${car.make} (${car.fuelType}) - HP: ${car.horsepower}, Mileage: ${car.mileage} MPG, Cylinders: ${car.cylinders}`;
                carListEl.appendChild(listItem);
            });
        }
    }

    // 3. Add Event Listener and Initial Run
    if (filterSelect) {
        filterSelect.addEventListener('change', filterAndDisplayData);
        filterAndDisplayData();
    }
});