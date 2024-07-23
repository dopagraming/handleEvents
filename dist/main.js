"use strict";
function setMinDate() {
    // Get Today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    // Select the date input element
    const eventDate = document.querySelector(".event-date");
    // set the minimun date to today
    eventDate.min = today;
    eventDate.addEventListener("input", () => {
        if (eventDate.value < today) {
            eventDate.value = today;
        }
    });
}
setMinDate();
function addEvent() {
    const eventName = document.querySelector(".event-name").value;
    const eventOrgenizer = document.querySelector(".orgenizer").value;
    const eventDate = document.querySelector(".event-date").value;
    const eventTimeStamp = new Date(eventDate).getTime();
    const event = {
        name: eventName,
        orgenizer: eventOrgenizer,
        date: eventDate,
        timeStamp: eventTimeStamp
    };
    let events = [];
    const eventsFromStorage = localStorage.getItem("events");
    events = eventsFromStorage ? JSON.parse(eventsFromStorage) : [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    console.log(events);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    });
    displayEvents();
}
function displayEvents() {
    let events = [];
    const eventsFromStorage = localStorage.getItem("events");
    events = eventsFromStorage ? JSON.parse(eventsFromStorage) : [];
    const eventList = document.querySelector(".events");
    eventList.innerHTML = "";
    events.forEach((event, index) => {
        const now = new Date().getTime();
        const timeLeft = event.timeStamp - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minuts = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / (1000));
        const container = `${days}d ${hours}h ${minuts}m ${seconds}s`;
        eventList.innerHTML += `
        <div class="event">
            <h3>${event.name}</h3>
            <div><span>By</span><p>${event.orgenizer}</p></div>
            <div><span>On</span><p>${event.date}</p></div>
            <div><span>Time Left</span><p>${container}</p></div>
            <button onclick="deleteEvent(${index})">Delete</button>
        </div>`;
    });
}
displayEvents();
function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    console.log(events);
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
}
setInterval(displayEvents, 1000);