
async function salvarCliente() {
    try {
        const id_cliente = document.getElementById('idCliente').value
        console.log(id_cliente)
        if(id_cliente ==="" || id_cliente === null){
            const dadosCliente = {
                nome: document.getElementById('nomeCliente').value,
                cpf: document.getElementById('cpfCliente').value,
                endereco: document.getElementById('enderecoCliente').value,
                email: document.getElementById('emailCliente').value,
                sexo: document.getElementById('sexoCliente').value,
            }
            console.log('aquiiii')
            const { data } = await axios.post('/clientes/save', dadosCliente)
            alert('cliente salvo com sucesso')
            return
        }
        editarCliente(id_cliente)
    } catch (error) {
        console.log(error)
        alert('nao foi possível salvar')
    }
}

async function editarCliente(idCliente) {
    try {
        const dadosCliente = {
            id_cliente: idCliente,
            nome: document.getElementById('nomeCliente').value,
            cpf: document.getElementById('cpfCliente').value,
            endereco: document.getElementById('enderecoCliente').value,
            email: document.getElementById('emailCliente').value,
            sexo: document.getElementById('sexoCliente').value,
        }
        await axios.put('/clientes/update/' + idCliente, dadosCliente)
        alert('cliente editado com sucesso')

    } catch (error) {
        console.log(error)
        alert('nao foi possível editar')
    }
}


async function preencherTable() {
    try {
        console.log('aquiiiii')
        const dadosCliente = await axios.get('/clientes/read')
        console.log(dadosCliente)

        $("#tb_clientes tbody").empty()
        for (const item of dadosCliente.data[0]) {
            $("#tb_clientes tbody").append(`
                    <tr> 
                        <td>${item.id_cliente}</td> 
                        <td>${item.nome || ''}</td>
                        <td>${item.cpf}</td>
                        <td>${item.email}</td> 
                        <td>
                            <button class="btn btn-danger" onclick="Excluir('${item.id_cliente}')">Excluir</button>
                        </td>
                        <td>
                            <button class="btn btn-primary" onclick="selecionarCliente('${item.id_cliente}')">Editar</button>
                        </td>
                    </tr>
                `);
        }
    } catch (error) {
        console.log(error)
        alert('erro ao pesquisar')
    }
}

async function selecionarCliente(idCliente) {
    try {

        const dadosCliente = await axios.get(`/clientes/read/unico/${idCliente}`)
        console.log(dadosCliente.data[0])
        for (const item of dadosCliente.data[0]) {
            document.getElementById('idCliente').value = item.id_cliente
            document.getElementById('nomeCliente').value = item.nome
            document.getElementById('cpfCliente').value = item.cpf
            document.getElementById('enderecoCliente').value = item.endereco
            document.getElementById('emailCliente').value = item.email
            document.getElementById('sexoCliente').value = item.sexo
        }
        $('#nav-home-tab').click();
        $('#home-tab').click();
    } catch (error) {
        alert('erro ao editar')
    }
}

async function Excluir(idCliente){
    try {
        await axios.delete('/clientes/delete/'+idCliente)

        preencherTable() 
        alert('cliente deletado')
    } catch (error) {
        alert('Não foi possível deletar')
        
    }
}