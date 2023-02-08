/*MENU*/
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    /*lo que hace es ir al primer hijo y intercambiar el none si no lo tiene lo agrega y si lo tiene lo quita, todo eso lo hace en las classlist*/
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    /*Igual aca hace llo mismo con el isactive*/
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/*Contact form */

((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault(); /*evitar que se nevie el formulario*/
    $loader.classList.remove("none"); /*para que se vea el loader*/
    /*solicitamo el formsubmit de la pagina*/
    fetch("https://formsubmit.co/ajax/rey_pamoide@hotmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      /*si esta correcto regresa el res.json y si esta mal la promesa del catch*/
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        /*como ya paso bien borramos de nuevo el loader*/
        $loader.classList.add("none");
        /*para que se active la ventana de agradecimiento*/
        location.hash = "#gracias";
        /*Limpiar el formulario*/
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#cierre";
        }, 3000);
      });
  });
})(document);
