(function () {
  const form = document.getElementById("review-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  function show(message, state) {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const church = String(data.get("church") || "").trim();
    const website = String(data.get("website") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (!name || !church || !website || !email) {
      event.preventDefault();
      show("Please fill in name, church, website, and email.", "err");
      return;
    }

    event.preventDefault();
    show("Sending…", "ok");

    fetch("https://formsubmit.co/ajax/andrew.churchtechsolutions@gmail.com", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok, body: body };
        });
      })
      .then(function (result) {
        if (result.ok) {
          window.location.href = "/thank-you";
          return;
        }
        throw new Error((result.body && result.body.message) || "The request did not send.");
      })
      .catch(function () {
        show("The request did not send. Email me directly instead.", "err");
      });
  });
})();
