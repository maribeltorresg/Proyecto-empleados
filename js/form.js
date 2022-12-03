$(document).ready(function () {
  const $form = $("#form");
  const $email = $("#email");
  //   const $phone = $("#phone");
  const $options = $("#options");
  const $first_name = $("#first-name");
  $(".errores").hide();

  function validarName() {
    const nameOk = /^[a-z]{2,14}$/.test($first_name.val());
    $first_name.removeClass("is-invalid");
    $first_name.addClass(nameOk ? "is-valid" : "is-invalid");
  }

  function validarEmail() {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($email.val());
    $email.removeClass("is-invalid");
    $email.addClass(emailOk ? "is-valid" : "is-invalid");
  }

  function validarSelect() {
    let sel = $("select option:selected");
    if (sel != 0) {
      $(".errores").hide();
    } else {
      $(".errores").show();
    }
  }

  //   function validarPhone() {
  //     const phoneOk = /^9\d{8}$/.test($phone.val());
  //     $phone.removeClass("is-invalid");
  //     $phone.addClass(phoneOk ? "is-valid" : "is-invalid");
  //   }

  function validar(e) {
    e.preventDefault();

    validarEmail();
    validarSelect();

    validarPhone();
  }

  $("input, select, textarea").on("mouseenter", function () {
    $(this).addClass("shadow");
  });

  $("input, select, textarea").on("mouseleave", function () {
    $(this).removeClass("shadow");
  });

  $first_name.on("input", validarName);
  $email.on("input", validarEmail);
  $phone.on("input", validarPhone);
  $options.on("input", validarSelect);
  $form.on("submit", validar);
});
