// Function to get current date in DD-MM-YYYY format
        const getCurrentDate = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth is zero-indexed
            const year = now.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const dateTimeElement = document.getElementById("date-time");

        const updateDateTime = async () => {
            const currentDate = getCurrentDate(); // Get current date

            // API for Hijri and Gregorian Calendar Data for the current date
            const hijriApiUrl = `https://api.aladhan.com/v1/gToH/${currentDate}?calendarMethod=UAQ`;

            try {
                const response = await fetch(hijriApiUrl);
                const data = await response.json();

                if (data.code === 200) {
                    const hijriData = data.data;
                    const gregorian = hijriData.gregorian;
                    const hijri = hijriData.hijri;

                    // Formatting the date information with both English and Arabic weekday names
                    const fullDate = `${gregorian.weekday.en}, ${gregorian.day} ${gregorian.month.en} ${gregorian.year} | ${hijri.day} ${hijri.month.en} ${hijri.year} (${hijri.weekday.en}) (${hijri.weekday.ar})`;

                    // Displaying in the Marquee
                    dateTimeElement.querySelector("p").innerText = `${fullDate} | Gregorian: ${gregorian.date}`;
                } else {
                    dateTimeElement.querySelector("p").innerText = "Error fetching Hijri data.";
                }
            } catch (error) {
                dateTimeElement.querySelector("p").innerText = "Unable to fetch date and time.";
            }
        };

        // Update every second to display real-time changes
        setInterval(updateDateTime, 1000);

        // Initial load on page load
        window.onload = updateDateTime;
        // Fetch Geolocation Automatically
        window.onload = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    dateTimeElement.querySelector("p").innerText =
                        `Your Location: Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`;
                }, () => {
                    dateTimeElement.querySelector("p").innerText = "Unable to fetch location.";
                });
            } else {
                dateTimeElement.querySelector("p").innerText = "Geolocation is not supported by your browser.";
            }
        };

        // Fetch Random Quote from quote.json
        fetch('quotes.json')
            .then(response => response.json())
            .then(data => {
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                document.getElementById("quote").querySelector(".quote").innerText =
                    `"${randomQuote.quoteText}" - ${randomQuote.quoteAuthor}`;
            })
            .catch(() => {
                document.getElementById("quote").querySelector(".quote").innerText = "Failed to load quote.";
            });
        
        
    
    
