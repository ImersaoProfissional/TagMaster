// document.querySelectorAll('td').forEach(td => {
//     if (td.innerText.length > 60) {
//         td.innerText = td.innerText.substring(0, 60) + '...';
//     }
// });

const openPopupCriarNota = document.getElementById('openPopupCriarNota');
const openPopupFiltrarNota = document.getElementById('openPopupFiltrarNota');
const openPopupeEditar = document.getElementById('openPopupeEditar');
const openPopupExcluir = document.getElementById('openPopupExcluir');
const currentColor = document.getElementById('currentColor');
const openPopupTags = document.getElementById('openPopupTags');
const openPopupLixeira = document.getElementById('openPopupLixeira');
const closePopup = document.getElementById('closePopup');
const overlay = document.getElementById('overlay');

// Abre o popup
openPopupCriarNota.addEventListener('click', () => {
    overlay.style.display = 'flex'; // Exibe o overlay e o popup

    // Obtendo o elemento popup corretamente
    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


    if (popup) {
        popup.innerHTML = `
        <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Criar Nota</h1>
        <form id="formCriarNota">
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
                <button type="button" class="btn btn-danger" id="closePopup">Cancelar</button>
                <button type="submit" class="btn azulEscuro">Confirmar</button>
            </div>
        </form>
    `;
    }
});


openPopupTags.addEventListener('click', () => {
    overlay.style.display = 'flex'; // Exibe o overlay e o popup

    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto


    if (popup) {
        popup.innerHTML = `
         <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Tags</h1>
            <div class="container">
                <button class="btn btn-custom btn-create mt-5 mb-2" id="">+ Criar Tag</button>
            <table class="table  table-secondary table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Cor</th>
                        <th scope="col">Ações</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Faculdade</td>
                        <td>
                            <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#007bff" title="Choose your color" disabled>
                        </td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-square me-3" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash3 me-3" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td>Urgente</td>
                        <td>
                            <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#dc3545" title="Choose your color" disabled>
                        </td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-square me-3" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash3 me-3" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </td>
                    </tr>        
                    <!-- Linhas adicionais podem ser adicionadas aqui -->
                </tbody>
            </table>
            <button type="button" class="btn azulEscuro mb-2" id="closePopup">Voltar</button>
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

openPopupeEditar.addEventListener('click', () => {
    overlay.style.display = 'flex';
    const popup = document.querySelector('.popup'); // Certifique-se de que o seletor corresponde ao elemento correto

    if (popup) {
        popup.innerHTML = `
        <h1 class="fs-1 text- azulEscuro text-white p-2 fw-bold">Editar Nota</h1>
        <form id="formCriarNota">
            <div class="mb-1 p-2 mt-5">
                <label for="text" class="form-label fs-6 fw-bold">Título</label>
                <input type="text" class="form-control bg-secondary text-white" id="text" name="titulo" value="Fazer AEP" required>
            </div>
            <div class="mb-1 p-2">
                <label for="exampleFormControlTextarea1" class="form-label fs-6 fw-bold">Conteúdo</label>
                <textarea class="form-control bg-secondary text-white" id="exampleFormControlTextarea1" name="conteudo" rows="7" required>Fazer vídeo da AEP para entregar 18/11</textarea>
            </div>
            <div class="mb-1 p-2">
                <label for="data" class="form-label fs-6 fw-bold">Data</label>
                <input type="date" class="form-control bg-secondary text-white" id="data" name="data" value="2024-11-14" required>
            </div>
            <div class="p-2 mb-3">
                <label for="tags" class="form-label fs-6 fw-bold">Tags</label>
                <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="tags" value="faculdade" checked>
                    <label class="form-check-label tag tag-faculdade" for="inlineCheckbox1">Faculdade</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="tags" value="urgente" checked>
                    <label class="form-check-label tag tag-urgente" for="inlineCheckbox2">Urgente</label>
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