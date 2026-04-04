window.addEventListener("DOMContentLoaded", function () {
        emailjs.init("gzzvLDHNSyItgaojE");
        });


const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav")
menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true"

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open");
})

const MAX_SELECTED_DAYS = 3;

let selectedDates = [];

const calendarEl = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");
const selectedDaysInput = document.getElementById("selectedDays");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let viewYear = new Date().getFullYear();
let viewMonth = new Date().getMonth();  // 0 = Jan, 11 = Dec


function toISODate(year, month, day) {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
}

function buildCalendar() {
    calendarEl.innerHTML = "";

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const numDays = new Date(viewYear, viewMonth + 1, 0).getDate();

    monthLabel.textContent =
        new Date(viewYear, viewMonth).toLocaleString("default", {
            month: "long",
        }) + " " + viewYear;

    for (let i = 0; i < firstDay; i++) {
        calendarEl.appendChild(document.createElement("span"));
    }

    for (let day = 1; day <= numDays; day++) {
        const dayBox = document.createElement("button");
        dayBox.type = "button"
        dayBox.className = "day";
        dayBox.textContent = day;

        dayBox.dataset.date = toISODate(viewYear, viewMonth, day);
        dayBox.setAttribute("aria-pressed", "false");

        if (selectedDates.includes(dayBox.dataset.date)) {
            dayBox.classList.add("selected");
            dayBox.setAttribute("aria-pressed", "true");
        }

        calendarEl.appendChild(dayBox);
    }
}


function handleDayClick(event) {
    const clicked = event.target;
    if (!clicked.classList.contains("day")) return;

    const dateString = clicked.dataset.date;
    const alreadySelected = selectedDates.includes(dateString);

    const selectedDate = new Date(dateString + "T00:00:00");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minAllowedDate = new Date(today);
    minAllowedDate.setDate(minAllowedDate.getDate() + 1);

    if (!alreadySelected && selectedDate < minAllowedDate) {
        alert("Please only select pickup days that are at least 24 hours in the future.");
        return;
    }

    if (alreadySelected) {
        clicked.classList.remove("selected");
        clicked.setAttribute("aria-pressed", "false");
        selectedDates = selectedDates.filter(d => d !== dateString);
    } else {
        if (selectedDates.length >= MAX_SELECTED_DAYS) {
            alert("You can only select up to 3 days.");
            return;
        }
        clicked.classList.add("selected");
        clicked.setAttribute("aria-pressed", "true");
        selectedDates.push(dateString);
    }

    selectedDaysInput.value = JSON.stringify(selectedDates);
}

function submitForm() {
    const formData = {
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        preferedContact: document.getElementById("preferedContact").value,
        generalJunkSize: document.getElementById("generalJunkSize").value,
        selectedDays: selectedDates.join(", ")
    };

    emailjs.send(
        "service_7156yar",
        "template_rjnoz05",
        formData
    )
    .then(() => {
        alert("Pickup request sent successfully!");
        document.getElementById("scheduleForm").reset();
        selectedDates.length = 0;

        document.querySelectorAll(".day.selected").forEach(day => {
            day.classList.remove("selected");
        });
        
    })
    .catch((error) => {
        console.error(error);
        alert("Failed to send request. Please try again.");
    });
}

function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const preferredContact = document.getElementById("preferedContact").value;
    const junkSize = document.getElementById("generalJunkSize").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const phonePattern = /^\d{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number (10–15 digits).");
        return;
    }

    if (address.length < 5) {
        alert("Please enter a valid address.");
        return;
    }

    if (!preferredContact) {
        alert("Please select a preferred form of contact.");
        return;
    }

    if (!junkSize) {
        alert("Please select a junk size.");
        return;
    }

    if (selectedDates.length < 1) {
        alert("Please select at least one pickup date.");
        return;
    }

    submitForm();
}

function handlePrevMonth() {
    viewMonth--;
    if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
    }
    buildCalendar();
}

function handleNextMonth() {
    viewMonth++;
    if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
    }
    buildCalendar();
}


function callEventListeners() {
    calendarEl.addEventListener("click", handleDayClick);
    document.getElementById("scheduleForm").addEventListener("submit", handleSubmit);
    prevBtn.addEventListener("click", handlePrevMonth);
    nextBtn.addEventListener("click", handleNextMonth);
}


function init() {
    buildCalendar();
    callEventListeners();
}

init();