preencherSelectBox();

async function preencherSelectBox() {
    try {
        console.log('aquiiiii')
        const dadosAgencia = await axios.get('/agencias/read')
        console.log(dadosAgencia)

        $("#selectAgencia").empty()
        for (const item of dadosAgencia.data[0]) {
            $("#selectAgencia").append(`
            <option value="${item.id_agencia}">
               ${item.nome}
            </option>
            `)
        }
        console.log('aquiiiii')
        const dadosCliente = await axios.get('/clientes/read')
        console.log(dadosCliente)

        $("#selectCliente").empty()
        for (const item of dadosCliente.data[0]) {
            $("#selectCliente").append(`
            <option value="${item.id_cliente}">
               ${item.nome}
            </option>
            `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function salvarConta(){
    try {
        const id_conta = document.getElementById('idConta').value
        if(id_conta ==="" || id_conta === null){
            const dados = {
                id_agencia: document.getElementById('selectAgencia').value,
                id_cliente: document.getElementById('selectCliente').value,
                saldo: document.getElementById('saldoConta').value,
                tipo_conta: document.getElementById('selectTipo').value,
            }
            console.log(dados)
    
            await axios.post('/contas/save', dados)
            alert('Conta salva com sucesso')
            return
        }
        editarConta(id_conta)
    } catch (error) {
        console.log(error.response)
        alert('Não foi possível salvar conta')
        
    }
}

async function editarConta(id_conta){
    try {
        const dados = {
            id_agencia: document.getElementById('selectAgencia').value,
            id_cliente: document.getElementById('selectCliente').value,
            saldo: document.getElementById('saldoConta').value,
            tipo_conta: document.getElementById('selectTipo').value,
        }

        await axios.put('/contas/update/'+id_conta, dados)
        alert('Conta editada com sucesso')
        
    } catch (error) {
        console.log(error.response)
        alert('Não foi possível editar conta')
    }
}

async function preencherTable() {
    try {
        console.log('aquiiiii')
        const dadosConta = await axios.get('/contas/read')
        console.log(dadosConta.data[0])

        $("#tb_contas tbody").empty()
        for (const item of dadosConta.data[0]) {
            $("#tb_contas tbody").append(`
                    <tr> 
                        <td>${item.id_conta}</td> 
                        <td>${item.id_agencia}</td> 
                        <td>${item.id_cliente}</td> 
                        <td>${item.saldo || ''}</td>
                        <td>${item.tipo_conta}</td>
                        <td>
                            <button class="btn btn-danger" onclick="Excluir('${item.id_conta}')">Excluir</button>
                        </td>
                        <td>
                            <button class="btn btn-primary" onclick="selectConta('${item.id_conta}')">Editar</button>
                        </td>
                    </tr>
                `);
        }
    } catch (error) {
        console.log(error)
        alert('erro ao pesquisar')
    }
}

async function selectConta(id_conta){
    try {
        const dadosConta = await axios.get('/contas/read/unico/'+id_conta)
        for (const item of dadosConta.data[0]) {
            document.getElementById('idConta').value = item.id_conta
            document.getElementById('selectAgencia').value = item.id_agencia
            document.getElementById('selectCliente').value = item.id_cliente
            document.getElementById('saldoConta').value = item.saldo
            document.getElementById('selectTipo').value = item.tipo_conta

        }
        $('#nav-home-tab').click();
        $('#home-tab').click();
    } catch (error) {
        console.log(error.response)
    }
}
async function selectConta(id_conta){
    try {
        const dadosConta = await axios.get('/contas/read/unico/'+id_conta)
        for (const item of dadosConta.data[0]) {
            document.getElementById('idConta').value = item.id_conta
            document.getElementById('selectAgencia').value = item.id_agencia
            document.getElementById('selectCliente').value = item.id_cliente
            document.getElementById('saldoConta').value = item.saldo
            document.getElementById('selectTipo').value = item.tipo_conta

        }
        $('#nav-home-tab').click();
        $('#home-tab').click();
    } catch (error) {
        console.log(error.response)
    }
}
async function Excluir(idConta){
    try {
        await axios.delete('/contas/delete/'+idConta)

        preencherTable() 
        alert('Conta deletada')
    } catch (error) {
        alert('Não foi possível deletar')
        
    }
}