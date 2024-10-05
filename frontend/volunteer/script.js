document.addEventListener("DOMContentLoaded", function() {

    let healthStatus = "healthy";

    const resultBoxElement = document.querySelector(".result-box");

    if (healthStatus === "healthy") {
        resultBoxElement.classList.add("healthy");
        resultBoxElement.querySelector(".status").textContent = "Healthy";
    } else if (healthStatus === "at-risk") {
        resultBoxElement.classList.add("at-risk");
        resultBoxElement.querySelector(".status").textContent = "At Risk";
    }
});