const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/weather?location=${searchInput.value}`).then((response) => {
    response.json().then((data) => {
      console.log(data);
      message1.classList.remove("message-closed");
      message1.classList.add("message-open");
      setTimeout(() => {
        message1.innerText = `Location: ${data.country}`;
        message2.innerText = `${data.weather_descriptions} Current temperature: ${data.temperature} Chance of precipitation: ${data.precip}`;
      }, 1500);
    });
  });
});

// window.addEventListener("mousemove", (e) => {
//   console.log(e.clientX, e.clientY);
// });

window.addEventListener("scroll", (e) => {
  console.log(window.screen.top);
});
