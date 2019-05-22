/*
Código propio para el input file
*/
$(".custom-file-input").on("change", function () {
  let fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

const $imagen = document.querySelector("#archivo"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion"),
  $btnDetectar = document.querySelector("#btnDetectar"),
  $estado = document.querySelector("#estado");

$imagen.addEventListener("change", () => {
  if (!$imagen.files || !$imagen.files.length) {
    $imagenPrevisualizacion.src = "";
    return;
  }
  const reader = new FileReader(),
    file = $imagen.files[0];
  reader.readAsDataURL(file);
  reader.onload = function () {
    $imagenPrevisualizacion.src = reader.result;
  };
})

$btnDetectar.addEventListener("click", () => {
  const archivos = $imagen.files;
  if (!archivos.length) return alert("No hay imágenes");
  const worker = new Tesseract.TesseractWorker();
  worker
    .recognize(archivos[0], 'spa')
    .progress(p => {
      $estado.innerHTML += `<br><strong>Estado: ${p.status}</strong> (${p.progress * 100} % )`;
    })
    .then((result) => {
      $estado.innerHTML = "<strong>El texto es: </strong><pre>" + result.text + "</pre>";

    });
});

