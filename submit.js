$(document).ready(function () {
  const $form = $("#form");
  const $first_name = $("#first-name");
  const $last_name = $("#last-name");
  const $email = $("#email");
  const $cargo = $("#cargo");

  function validarName() {
    const nameOk = /^[a-z]{2,14}$/.test($first_name.val());
    $first_name.removeClass("is-invalid");
    $first_name.addClass(nameOk ? "is-valid" : "is-invalid");
    return nameOk;
  }

  function validarLastname() {
    const lastnameOk = /^[a-z]{2,14}$/.test($last_name.val());
    $last_name.removeClass("is-invalid");
    $last_name.addClass(lastnameOk ? "is-valid" : "is-invalid");
    return lastnameOk;
  }

  function validarEmail() {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($email.val());
    $email.removeClass("is-invalid");

    $email.addClass(emailOk ? "is-valid" : "is-invalid");
    return emailOk;
  }

  function submit(e) {
    e.preventDefault();

    if (!validarName()) {
      return;
    }

    if (!validarLastname()) {
      return;
    }

    if (!validarEmail()) {
      return;
    }

    // Aqui se hace el submit
    create($first_name.val(), $last_name.val(), $email.val(), $cargo.val());

    renderizar();
  }

  $("input, select, textarea").on("mouseenter", function () {
    $(this).addClass("shadow");
  });

  $("input, select, textarea").on("mouseleave", function () {
    $(this).removeClass("shadow");
  });

  $first_name.on("input", validarName);
  $last_name.on("input", validarLastname);
  $email.on("input", validarEmail);

  $form.on("submit", submit);
});
