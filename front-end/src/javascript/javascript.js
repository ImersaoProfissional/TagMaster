const openPopupCriarNota = document.getElementById("openPopupCriarNota");
const openPopupFiltrarNota = document.getElementById("openPopupFiltrarNota");
const openPopupeEditar = document.getElementById("openPopupeEditar");
const openPopupExcluir = document.getElementById("openPopupExcluir");
const currentColor = document.getElementById("currentColor");
const openPopupTags = document.getElementById("openPopupTags");
const openPopupLixeira = document.getElementById("openPopupLixeira");
const closePopup = document.getElementById("closePopup");
const overlay = document.getElementById("overlay");

// Funcionando
function criarTag() {
  const tagName = document.getElementById("texto").value;
  const tagColor = document.getElementById("cor").value;

  console.log("Criar Tag:", tagName, tagColor);

  // Verificar se os campos não estão vazios
  if (!tagColor || !tagName) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Enviar a requisição POST para o backend
  fetch("http://localhost:3001/criarTag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tagName, tagColor }), // Envia os dados no corpo da requisição
  });
  fetch("http://localhost:3001/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  fecharPopup();
}
// Funcionando
function editarTag(id) {
  const titulo = document.getElementById("texto").value;
  const cor = document.getElementById("cor").value;

  console.log("Editar Tag:", id, titulo, cor);

  // Verificar se os campos não estão vazios
  if (!titulo || !cor) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Enviar a requisição POST para o backend com o ID na URL
  fetch(`http://localhost:3001/editarTag/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, cor }), // Envia os dados no corpo da requisição
  })
    .then((response) => response.json()) // Espera pela resposta e a converte para JSON
    .then((data) => {
      if (data.success) {
        alert("Tag editada com sucesso!");
      } else {
        alert("Falha ao editar tag.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao editar a tag.");
    });
  fecharPopup();
}
// Funcionando
function excluirTag(id) {
  console.log("Excluir Tag:", id);

  // Enviar a requisição POST para o backend para excluir a tag com o ID especificado
  fetch(`http://localhost:3001/excluirTag/${id}`, {
    method: "POST", // Usamos POST para excluir a tag
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json()) // Espera pela resposta e a converte para JSON
    .then((data) => {
      if (data.success) {
        alert("Tag excluída com sucesso!");
      } else {
        alert("Falha ao excluir tag.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao excluir a tag.");
    });
  fecharPopup();
}
// Funcionando  --> falta mostrar tags
function editarNota(tags, id, titulo, desc, data) {
  console.log("ENTREIII");
  overlay.style.display = "flex";
  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto
  console.log(id, titulo, desc, data, tags);
  if (popup) {
    popup.innerHTML = `
             <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Editar Nota</h1>
            <form id="formCriarNota" method="post" action="http://localhost:3001/editarNota/${id}">
                <div class="mb-1 p-2 mt-5">
                    <label for="text" class="form-label fs-6 fw-bold">Título</label>
                    <input type="text" class="form-control bg-secondary text-white" id="text" name="titulo"
                        value="${titulo}" required>
                </div>
                <div class="mb-1 p-2">
                    <label for="exampleFormControlTextarea1" class="form-label fs-6 fw-bold">Conteúdo</label>
                    <textarea class="form-control bg-secondary text-white" id="exampleFormControlTextarea1"
                        name="conteudo" rows="7" required>${desc}</textarea>
                </div>

                <div class="mb-1 p-2">
                    <label for="data" class="form-label fs-6 fw-bold">Data</label>
                    <input type="date" class="form-control bg-secondary text-white" id="data" name="data"
                        value="${data}" required>
                </div>
                <div class="p-2 mb-3">
                <label for="tags" class="form-label fs-6 fw-bold">Tags</label>
                <br>
                ${tags
                  .map(
                    (tag) => `
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="${tag.id}">
                    <label class="form-check-label tag text-white" style="background-color: ${tag.cor};" for="inlineCheckbox1">
                        ${tag.titulo}
                    </label>
                </div>

                `
                  )
                  .join("")}
                <button type="button" class="btn btn-outline-secondary tag">+ Adicionar Tag</button>
            </div>
                <div class="d-flex justify-content-between mb-3 p-2">
                    <button type="button" class="btn btn-danger mb-3" onClick='fecharPopup()'>Cancelar</button>
                    <button type="submit" class="btn azulEscuro">Confirmar</button>
                </div>
            </form>
        `;
  }
}
// Funcionando
function abrirPopupExcluirNota(id) {
  overlay.style.display = "flex";
  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

  if (popup) {
    popup.innerHTML = `<div class="container p-3 text-center">
            <h4 class="mb-5">Deseja realmente excluir essa nota?</h4>
            <div class="d-flex justify-content-between mb-3 p-2 mx-5">
                <button type="button" class="btn btn-danger " onClick="fecharPopup()">CANCELAR</button>
                <button type="submit" class="btn azulEscuro pe-5 ps-5" onclick="excluirNota(${id})">SIM</button>
            </div>
        </div>`;
  }
}
// Funcionando
function excluirNota(id) {
  fetch(`http://localhost:3001/excluirNota/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      fecharPopup();
      alert("Nota excluída com sucesso");
    } else {
      alert("Erro ao excluir a nota");
    }
  });

  renderizarNotas();
}
// Funcionando -> falta mostrar tags
function visualizarNota(tags, id, titulo, desc, data) {
  overlay.style.display = "flex";
  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto
  console.log(id, titulo, desc, data, tags);
  if (popup) {
    popup.innerHTML = `
             <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Vizualizar Nota</h1>
            <form id="formCriarNota" method="post" action="http://localhost:3001/editarNota/${id}">
                <div class="mb-1 p-2 mt-5">
                    <label for="text" class="form-label fs-6 fw-bold">Título</label>
                    <input type="text" class="form-control bg-secondary text-white" id="text" name="titulo"
                        value="${titulo}" disabled>
                </div>
                <div class="mb-1 p-2">
                    <label for="exampleFormControlTextarea1" class="form-label fs-6 fw-bold">Conteúdo</label>
                    <textarea class="form-control bg-secondary text-white" id="exampleFormControlTextarea1"
                        name="conteudo" rows="7" disabled>${desc}</textarea>
                </div>

                <div class="mb-1 p-2">
                    <label for="data" class="form-label fs-6 fw-bold">Data</label>
                    <input type="date" class="form-control bg-secondary text-white" id="data" name="data"
                        value="${data}" disabled>
                </div>
                <div class="p-2 mb-3">
                    <label for="tags" class="form-label fs-6 fw-bold">Tags</label>
                <br>
                ${tags
                  .map(
                    (tag) => `
                <div class="d-inline-block me-1">
                  <input class="form-check-input" type="hidden" id="inlineCheckbox1" name="tags" value="${tag.id}">
                  <label class="form-check-label tag text-white" style="background-color: ${tag.cor};">
                    ${tag.titulo}
                  </label>
                </div>

                `
                  )
                  .join("")}
                </div>
                <div class="d-flex justify-content-between mb-3 p-2">
                    <button type="button" class="btn btn-danger mb-3" onClick='fecharPopup()'>Voltar</button>
                </div>
            </form>
        `;
  }
}

function abrirPopupTags(tags) {
  overlay.style.display = "flex"; // Exibe o overlay e o popup

  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

  console.log("Dados de tags aqui--> ", tags);

  if (popup) {
    popup.innerHTML = `
            <h1 class="fs-1 text-white p-4 fw-bold text-center" style="background-color: #003366;">Tags</h1>
            <!-- Container -->
            <div class="container mt-4">
                <!-- Botão para Criar Tag -->
                <button class="btn btn-primary mb-4" onclick="criarTag()">+ Criar Tag</button>

                <!-- Inputs para Criar ou Editar Tag -->
                <div class="row mb-4">
                    <div class="col-md-6 mb-3">
                        <label for="texto" class="form-label">Título da Tag</label>
                        <input type="text" name="texto" id="texto" class="form-control text-white" placeholder="Digite o título da tag">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="cor" class="form-label">Cor</label>
                        <input type="color" name="cor" id="cor" class="form-control">
                    </div>
                </div>

                <!-- Tabela de Tags -->
                <table class="table table-striped tag-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Cor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tags-list">
                        ${tags
                          .map(
                            (tag) => `
                            <tr>
                                <td>${tag.titulo}</td>
                                <td>
                                    <input type="color" name="cor" class="form-control" value="${tag.cor}" disabled>
                                </td>
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick="editarTag(${tag.id})">Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick="excluirTag(${tag.id})">Excluir</button>
                                </td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <button type="button" class="btn btn-danger mb-3" id="closePopup" onClick='fecharPopup()'>Voltar</button>
            </div>
        `;
  }
}

function openPopupCriarNotas(tags) {
  overlay.style.display = "flex"; // Exibe o overlay e o popup
  console.log("Dados de tags aqui--> ", tags);
  // Obtendo o elemento popup corretamente
  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

  if (popup) {
    popup.innerHTML = `
        <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Criar Nota</h1>
        <form id="formCriarNota" method="post" action="http://localhost:3001/criarNota">
            <div class="mb-1 p-2 mt-5">
                <label for="text" class="form-label fs-6 fw-bold">Título</label>
                <input type="text" class="form-control bg-secondary text-white" id="text" name="titulo" required>
            </div>
            <div class="mb-1 p-2">
                <label for="exampleFormControlTextarea1" class="form-label fs-6 fw-bold">Conteúdo</label>
                <textarea class="form-control bg-secondary text-white" id="exampleFormControlTextarea1" name="conteudo" rows="7" required></textarea>
            </div>
            <div class="p-2 mb-3">
                <label for="tags" class="form-label fs-6 fw-bold">Tags</label>
                <br>
                ${tags
                  .map(
                    (tag) => `
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="${tag.id}">
                    <label class="form-check-label tag text-white" style="background-color: ${tag.cor};" for="inlineCheckbox1">
                        ${tag.titulo}
                    </label>
                </div>

                `
                  )
                  .join("")}
            </div>
            <div class="d-flex justify-content-between mb-3 p-2">
                <button type="button" class="btn btn-danger mb-3" id="closePopup" onClick='fecharPopup()'>Cancelar</button>
                <button type="submit" class="btn azulEscuro">Confirmar</button>
            </div>
        </form>
    `;
  }
}

function openPopupFiltrarNotasPorTags(notas, tags) {
  overlay.style.display = "flex"; // Exibe o overlay e o popup

  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

  if (popup) {
    popup.innerHTML = `
         <h1 class="fs-1 azulEscuro text-white p-2 fw-bold">Filtrar por tags</h1>
            <form id="formCriarNota">
                <div class="container my-5">

                    <h5 class="fw-bold">Obrigatórios</h5>
                    <p>serão exibidas notas marcadas com todas as tags selecionadas nesse campo.</p>
                    <div class="p-2 mb-2 bg-secondary-subtle text-white rounded">  
                        ${tags
                          .map(
                            (tag) => `
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="${tag.id}">
                    <label class="form-check-label tag text-white" style="background-color: ${tag.cor};" for="inlineCheckbox1">
                        ${tag.titulo}
                    </label>
                </div>

                `
                          )
                          .join("")}
                <div class="d-flex justify-content-between mb-3 p-2">
                    <button type="button" class="btn btn-danger" id="closePopup">Cancelar</button>
                    <button type="submit" class="btn azulEscuro">Confirmar</button>
                </div>
            </form>
    `;
    const form = document.getElementById("formCriarNota");
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Previne o envio do formulário

      // Captura as tags selecionadas
      const obrigatorias = [];
      const opcionais = [];

      // Captura as tags obrigatórias
      const checkboxesObrigatorios = document.querySelectorAll(
        'input[name="tags"]:checked'
      );
      checkboxesObrigatorios.forEach((checkbox) => {
        const tagId = checkbox.value;
        if (
          checkbox
            .closest(".bg-secondary-subtle")
            .classList.contains("text-white")
        ) {
          obrigatorias.push(tagId);
        } else {
          opcionais.push(tagId);
        }
      });

      const tagsSelecionadas = { obrigatorias, opcionais };
      console.log("FILTREI AS TAGS", tagsSelecionadas);
      console.log("NOTAS PASSADAS", notas);
      // Filtra as notas com as tags selecionadas
      const notasFiltradas = filtrarPorTags(notas, tagsSelecionadas);
      console.log("FILTREI KRL", notasFiltradas);
      // Renderiza as notas filtradas
      renderizarNotas(notasFiltradas, tagsSelecionadas);
    });
  }
}

function abrirPopupLixeira(notas){
  overlay.style.display = "flex"; // Exibe o overlay e o popup

  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

  // if (popup) {
  //   popup.innerHTML = `
         
  //   `;
  // }
}

function fecharPopup() {
  overlay.style.display = "none";
  const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

  if (popup) {
    popup.innerHTML = ``;
  }
}

overlay.addEventListener("click", (event) => {
  // Verifica se clicou no botão "Cancelar"
  if (event.target.id === "closePopup") {
    overlay.style.display = "none";
    const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto

    if (popup) {
      popup.innerHTML = ``;
    }
  }

  // Fecha o popup ao clicar fora dele
  if (event.target === overlay) {
    overlay.style.display = "none";
    const popup = document.querySelector(".popup"); // Certifique-se de que o seletor corresponde ao elemento correto
    if (popup) {
      popup.innerHTML = ``;
    }
  }
});

//ordenarPorData
function renderizarNotas(notas, tags) {
  const listaNotas = document.getElementById("listaNotas");
  listaNotas.innerHTML = "";
  notas.forEach((nota) => {
    // Mapeia as tags
    const listaTagsHTML = nota.tags
      .map((tag) => {
        return `<span class="tag" style="background-color: ${tag.cor}; color: white;">
                  ${tag.titulo}
                  </span>`;
      })
      .join("");

    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
              <td>
                  ${nota.titulo}
              </td>
              <td>
                  ${nota.desc}
                  </td>
                  <td>
                      ${
                        nota.tags && nota.tags.length
                          ? listaTagsHTML
                          : "<p>Sem tags disponíveis.</p>"
                      }
              </td>
              <td>
                  ${new Date(nota.data).toLocaleDateString()}
              </td>
              <td class="action-icons">
                  <!-- Ícone de lápis -->
                  <button class="btn btn-primary me-1" id="openPopupeEditar">
                      <i class="bi bi-pencil"></i>
                  </button>
                  
                  <button class="btn btn-danger me-1 my-1"
                      onclick="abrirPopupExcluirNota(${nota.id})">
                      <i class="bi bi-trash-fill"></i>
                  </button>

                  <button class="btn btn-secondary" id="openPopupeVizualizar">
                      <i class="bi bi-eye"></i>
                      </button>
                      
                      </td>
          </tr>`;

    const btnEditar = tr.querySelector("#openPopupeEditar");
    btnEditar.addEventListener("click", () => {
      editarNota(
        tags,
        nota.id,
        `${nota.titulo}`,
        `${nota.desc}`,
        `${new Date(nota.data).toLocaleDateString("en-CA").replace(/\//g, "-")}`
      );
    });

    const btnVizualizar = tr.querySelector("#openPopupeVizualizar");
    btnVizualizar.addEventListener("click", () => {
      visualizarNota(
        tags,
        nota.id,
        `${nota.titulo}`,
        `${nota.desc}`,
        `${new Date(nota.data).toLocaleDateString("en-CA").replace(/\//g, "-")}`
      );
    });
    listaNotas.appendChild(tr);
  });
}

let ordemCrescente = false;
function ordenarNotasPorData(notas, tags) {
  const ordenadas = notas.sort((a, b) => {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);

    if (ordemCrescente) {
      return dataA - dataB; //Crescente
    } else {
      return dataB - dataA; //Decrescente
    }
  });

  ordemCrescente = !ordemCrescente;

  renderizarNotas(ordenadas, tags);
}

function filtrarPorTags(notas, tags) {

  return notas.filter((nota) => {
    // Verifica se a nota contém todas as tags obrigatórias
    const tagsObrigatorias = tags.obrigatorias;
    const tagsOpcionais = tags.opcionais;
    const tagsSelecionadas = tags.obrigatorias.length > 0 && tags.opcionais.length === 0 ? 'obrigatoria' :
    tags.obrigatorias.length > 0 && tags.opcionais.length > 0 ? 'todas': null ;

    if(tagsSelecionadas === 'obrigatoria'){
   
      const temTagsObrigatorias = tagsObrigatorias.every(
        (tagId) =>
          nota.tags.some((tag) => String(tag.id) === String(tagId)) &&
        nota.tags.length === tagsObrigatorias.length
      );
      return temTagsObrigatorias;
    }
    else if (tagsSelecionadas === 'todas'){
      const temTagsObrigatorias = tagsObrigatorias.every(
        (tagId) =>
          nota.tags.some((tag) => String(tag.id) === String(tagId))
      );
      
      const temTagsOpcionais =
        tagsOpcionais.length === 0 || // Se não houver tags opcionais selecionadas
        tagsOpcionais.some((tagId) =>
          nota.tags.some((tag) => String(tag.id) === String(tagId))
        );
            
      // Verifica se a nota tem as tags obrigatórias e, se houver tags opcionais selecionadas,
      // ela pode ou não ter uma tag opcional.
      return temTagsObrigatorias && (tagsOpcionais.length === 0 || temTagsOpcionais);
    }

    });
    
}
