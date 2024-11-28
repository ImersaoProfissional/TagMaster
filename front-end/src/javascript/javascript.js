const openPopupCriarNota = document.getElementById('openPopupCriarNota');
const openPopupFiltrarNota = document.getElementById('openPopupFiltrarNota');
const openPopupeEditar = document.getElementById('openPopupeEditar');
const openPopupExcluir = document.getElementById('openPopupExcluir');
const currentColor = document.getElementById('currentColor');
const openPopupTags = document.getElementById('openPopupTags');
const openPopupLixeira = document.getElementById('openPopupLixeira');
const closePopup = document.getElementById('closePopup');
const overlay = document.getElementById('overlay');



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
    fetch('http://localhost:3001/criarTag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagName, tagColor }), // Envia os dados no corpo da requisição
    })

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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, cor }), // Envia os dados no corpo da requisição
    })
    .then(response => response.json()) // Espera pela resposta e a converte para JSON
    .then(data => {
        if (data.success) {
            alert("Tag editada com sucesso!");
        } else {
            alert("Falha ao editar tag.");
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao editar a tag.");
    });
}
// Funcionando
function excluirTag(id) {
    console.log("Excluir Tag:", id);

    // Enviar a requisição POST para o backend para excluir a tag com o ID especificado
    fetch(`http://localhost:3001/excluirTag/${id}`, {
        method: 'POST', // Usamos POST para excluir a tag
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) // Espera pela resposta e a converte para JSON
    .then(data => {
        if (data.success) {
            alert("Tag excluída com sucesso!");
        } else {
            alert("Falha ao excluir tag.");
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao excluir a tag.");
    });
}
// Funcionando
function editarNota(id, titulo, desc, data){
    overlay.style.display = 'flex';
    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto
    console.log(id,titulo,desc,data)
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
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags"
                            value="faculdade" checked>
                        <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente"
                            checked>
                        <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
                    </div>
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
openPopupCriarNota.addEventListener('click', () => {
    overlay.style.display = 'flex'; // Exibe o overlay e o popup

    // Obtendo o elemento popup corretamente
    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


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
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="faculdade">
                    <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente">
                    <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
                </div>
                <button type="button" class="btn btn-outline-secondary tag">+ Adicionar Tag</button>
            </div>
            <div class="d-flex justify-content-between mb-3 p-2">
                <button type="button" class="btn btn-danger mb-3" id="closePopup" onClick='fecharPopup()'>Cancelar</button>
                <button type="submit" class="btn azulEscuro">Confirmar</button>
            </div>
        </form>
    `;
    }
});
// Funcionando
openPopupTags.addEventListener('click', () => {
    overlay.style.display = 'flex'; // Exibe o overlay e o popup

    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto

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
                        <tr>
                            <td>Fazer AEP</td>
                            <td>
                                <input type="color" name="cor" id="cor" class="form-control" disabled>
                            </td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="editarTag(1)">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="excluirTag(1)">Excluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-danger mb-3" id="closePopup" onClick='fecharPopup()'>Voltar</button>
            </div>

        `;
    }
});

openPopupFiltrarNota.addEventListener('click', () => {
    overlay.style.display = 'flex'; // Exibe o overlay e o popup

    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


    if (popup) {
        popup.innerHTML = `
         <h1 class="fs-1 azulEscuro text-white p-2 fw-bold">Filtrar por tags</h1>
            <form id="formCriarNota">
                <div class="container my-5">

                    <h5 class="fw-bold">Obrigatórios</h5>
                    <p>serão exibidas notas marcadas com todas as tags selecionadas nesse campo.</p>
                    <div class="p-2 mb-2 bg-secondary-subtle text-white rounded">  
                       
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="faculdade">
                            <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente">
                            <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente">
                            <label class="form-check-label tag bg-secondary" for="inlineCheckbox2">Sem tag</label>
                        </div>
                    </div>

                    <h5 class="fw-bold">Opcionais</h5>
                    <p>Serão exibidas notas marcadas com ao menos uma das tags selecionadas nesse campo.</p>
                    <div class="p-2 mb-2 bg-secondary-subtle rounded">
                       
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="faculdade">
                            <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente">
                            <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente">
                            <label class="form-check-label tag bg-secondary text-white" for="inlineCheckbox2">Sem tag</label>
                        </div>
                    </div>

                </div>
                <div class="d-flex justify-content-between mb-3 p-2">
                    <button type="button" class="btn btn-danger" id="closePopup">Cancelar</button>
                    <button type="submit" class="btn azulEscuro">Confirmar</button>
                </div>
            </form>
    `;
    }
});

openPopupLixeira.addEventListener('click', () => {
    overlay.style.display = 'flex'; // Exibe o overlay e o popup

    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


    if (popup) {
        popup.innerHTML = `
         <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Lixeira</h1>
            <div class="container">
                <table class="table  table-secondary table-bordered table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Recuperar</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fazer EAP</td>
                            <td>Fazer vídeo da AEP para entregar 18/11
                            <td>
                                <button type="button" class="btn btn-primary"
                                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                                    Recuperar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn azulEscuro mb-2" id="closePopup">Voltar</button>
            </div>
    `;
    }
});

// openPopupeEditar.addEventListener('click', () => {
//     overlay.style.display = 'flex';
//     const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto

//     if (popup) {
//         popup.innerHTML = `
//         <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Editar Nota</h1>
//         <form id="formCriarNota" method="post" action="http://localhost:3001/editarNota/1">
//             <div class="mb-1 p-2 mt-5">
//                 <label for="text" class="form-label fs-6 fw-bold">Título</label>
//                 <input type="text" class="form-control bg-secondary text-white" id="text" name="titulo" value="Fazer AEP" required>
//             </div>
//             <div class="mb-1 p-2">
//                 <label for="exampleFormControlTextarea1" class="form-label fs-6 fw-bold">Conteúdo</label>
//                 <textarea class="form-control bg-secondary text-white" id="exampleFormControlTextarea1" name="conteudo" rows="7" required>Fazer vídeo da AEP para entregar 18/11</textarea>
//             </div>
//             <div class="mb-1 p-2">
//                 <label for="data" class="form-label fs-6 fw-bold">Data</label>
//                 <input type="date" class="form-control bg-secondary text-white" id="data" name="data" value="2024-11-14" required>
//             </div>
//             <div class="p-2 mb-3">
//                 <label for="tags" class="form-label fs-6 fw-bold">Tags</label>
//                 <br>
//                 <div class="form-check form-check-inline">
//                     <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="faculdade" checked>
//                     <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
//                 </div>
//                 <div class="form-check form-check-inline">
//                     <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente" checked>
//                     <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
//                 </div>
//             </div>
//             <div class="d-flex justify-content-between mb-3 p-2">
//                 <button type="button" class="btn btn-danger" id="closePopup">Cancelar</button>
//                 <button type="submit" class="btn azulEscuro">Confirmar</button>
//             </div>
//         </form>
//         `;
//     }
// });

openPopupExcluir.addEventListener('click', () => {
    overlay.style.display = 'flex';
    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto

    if (popup) {
        popup.innerHTML = `
            <div class="container p-3 text-center">
                <h4 class="mb-5">Deseja realmente excluir essa nota?</h4>
                <div class="d-flex justify-content-between mb-3 p-2 mx-5">
                    <button type="button" class="btn btn-danger " id="closePopup">CANCELAR</button>
                    <button type="submit" class="btn azulEscuro pe-5 ps-5">SIM</button>
                </div>
            </div>
        `;
    }
});

openPopupeVisualizar.addEventListener('click', () => {
    overlay.style.display = 'flex';
    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto

    if (popup) {
        popup.innerHTML = `
            <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Visualizar</h1>
            <div class="container">
                <div class="mb-1 p-2 mt-5">
                    <label for="text" class="form-label fs-6 fw-bold">Título</label>
                    <input type="text" class="form-control bg-secondary text-white" id="text" name="titulo"
                        value="Fazer AEP" readonly>
                </div>
                <div class="mb-1 p-2">
                    <label for="exampleFormControlTextarea1" class="form-label fs-6 fw-bold">Conteúdo</label>
                    <textarea class="form-control bg-secondary text-white" id="exampleFormControlTextarea1"
                        name="conteudo" rows="7" readonly>Fazer vídeo da AEP para entregar 18/11</textarea>
                </div>
                <div class="mb-1 p-2">
                    <label for="data" class="form-label fs-6 fw-bold">Data</label>
                    <input type="date" class="form-control bg-secondary text-white" id="data" name="data"
                        value="2024-11-14" readonly>
                </div>
                <div class="p-2 mb-3">
                    <label for="tags" class="form-label fs-6 fw-bold">Tags</label>
                    <br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags"
                            value="faculdade" checked disabled>
                        <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente"
                            checked disabled>
                        <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
                    </div>
                </div>
                <button type="button" class="btn azulEscuro mb-2 " id="closePopup">Voltar</button>
            </div>
        `;
    }
});

// Fecha o popup

function fecharPopup(){
    overlay.style.display = 'none';
        const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


        if (popup) {
            popup.innerHTML = ``;
        }
}

overlay.addEventListener('click', (event) => {
    // Verifica se clicou no botão "Cancelar"
    if (event.target.id === 'closePopup') {
        overlay.style.display = 'none';
        const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


        if (popup) {
            popup.innerHTML = ``;
        }
    }

    // Fecha o popup ao clicar fora dele
    if (event.target === overlay) {
        overlay.style.display = 'none';
        const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto
        if (popup) {
            popup.innerHTML = ``;
        }
    }
});

