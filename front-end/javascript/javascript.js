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
                <form id="formCriarTag">
                    <button class="btn btn-custom btn-create mt-5 mb-2" type="submit">+ Criar Tag</button>
                    <div class="input-group mb-3">
                        <div class="input-group-text">
                            <input type="color" class="form-control form-control-color" id="tagColor" value="#dc3545"
                                title="Escolha uma cor" name="tagColor" required>
                        </div>
                        <input type="text" class="form-control text-white bg-secondary" id="tagName"
                            placeholder="Nome da tag" name="tagName" required>
                    </div>
                </form>

                <table class="table table-secondary table-bordered table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" class="form-control text-white bg-secondary tituloTag" 
                                    value="Urgente" name="titulo" disabled>
                            </td>
                            <td>
                                <input type="color" class="form-control form-control-color colorTag"
                                    value="#dc3545" name="cor" disabled>
                            </td>
                            <td>
                              <button class="btn btn-primary me-1 btnEditar">
                                <i class="bi bi-pencil editar"></i>
                              </button>
                              <button class="btn btn-danger me-1 my-1 btnExcluir">
                                <i class="bi bi-trash"></i>
                              </button>
                            </td>
                        </tr>
                        <!-- Linhas adicionais podem ser adicionadas aqui -->
                    </tbody>
                </table>
                <button type="button" class="btn azulEscuro mb-2" id="closePopup">Voltar</button>
            </div>
        `;

        // Adiciona o evento de clique a todos os botões de edição
        document.querySelectorAll('.btnEditar').forEach(button => {
            button.addEventListener('click', async (event) => {
                // Obtém a linha correspondente
                const row = event.target.closest('tr');
                
                // Seleciona os inputs dentro da linha
                const tituloInput = row.querySelector('.tituloTag');
                const colorInput = row.querySelector('.colorTag');
                const icon = button.querySelector('i');

                // Verifica se os inputs estão desabilitados
                const isDisabled = tituloInput.disabled;

                if (isDisabled) {
                    // Alterna para modo editável
                    tituloInput.disabled = false;
                    colorInput.disabled = false;
                    icon.className = 'bi bi-check-circle verificado';
                    tituloInput.focus(); // Foco no input editável
                } else {
                    // Salva os dados ao alternar para modo desabilitado
                    tituloInput.disabled = true;
                    colorInput.disabled = true;
                    icon.className = 'bi bi-pencil editar';

                    // Envia os dados via fetch
                    const titulo = tituloInput.value;
                    const cor = colorInput.value;

                    // try {
                    //     const response = await fetch('https://sua-api-endpoint/aqui', {
                    //         method: 'PUT', // Altere para POST ou PUT, conforme necessário
                    //         headers: {
                    //             'Content-Type': 'application/json',
                    //         },
                    //         body: JSON.stringify({
                    //             titulo,
                    //             cor,
                    //         }),
                    //     });

                    //     if (response.ok) {
                    //         console.log('Dados salvos com sucesso!');
                    //     } else {
                    //         console.error('Erro ao salvar dados:', response.statusText);
                    //         alert('Erro ao salvar dados.');
                    //     }
                    // } catch (error) {
                    //     console.error('Erro na requisição:', error);
                    //     alert('Erro ao salvar os dados. Tente novamente.');
                    // }
                }
            });
        });
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

