const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav")
menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true"

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open");
})
/* Page functions */
const questionsAnswers = [
    {question: "Are there Items you can't take?", answer: "We can't take any Hazardous Chemicals, Tires or Cars. We reserve the right to refuse to take any items that would put our employees at risk or are dangerous to others."},
    {question: "Do you offer free estimates?", answer: "We do! We offer a free estimate to any who are interested, go ahead an Schedule and when we reach out feel free to send us an image of what you want us to remove!"},
    {question: "How much does it cost?", answer: "Costs are determined on a case by case basis, but in general items the size of a couch are $40 and a single truckload is $150. We negotiate with each customer to ensure that the cost is within your budget!"},
    {question: "What type of payment is accepted?", answer: "We accept payment through Venmo, cash, or checks. If you have another payment method feel free to reach out exceptions can be made!"}
];

const faqSection = document.getElementById("faq");


function renderFaq() {
    questionsAnswers.forEach(faq => {
        const faqDiv = document.createElement("div");
        faqDiv.classList.add("faq-div");

        const questionDiv = document.createElement("div")
        questionDiv.classList.add("question-div")

        const question = document.createElement("h3");
        question.classList.add("question");
        question.textContent = faq.question;

        const button = document.createElement("button");
        button.classList.add("faq-button");
        button.innerHTML = ">"

        const answer = document.createElement("p");
        answer.classList.add("answer");
        answer.textContent = faq.answer;
        answer.style.display = "none";

        button.addEventListener("click", () => {

            const isOpen = answer.style.display === "block";

            answer.style.display = isOpen ? "none" : "block";
             button.textContent = isOpen ? ">" : "v";

        });

        faqSection.appendChild(faqDiv);
        faqDiv.appendChild(questionDiv)
        questionDiv.appendChild(question);
        questionDiv.appendChild(button);
        faqDiv.appendChild(answer);
    })

}


renderFaq();