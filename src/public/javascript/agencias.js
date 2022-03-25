
async function savlarAgencia(){
    try {
        const id_agencia = document.getElementById('idAgencia').value

        if(id_agencia === "" || idAgencia === null){
            const dadoAgencia = {
                nome: document.getElementById('nomeAgencia').value,
                endereco: document.getElementById('enderecoAgencia').value
            }
            await axios.post('/agencias/save', dadoAgencia)
            alert('agência salva com sucesso')
            return
        }
        EditarAgencia(id_agencia)
    } catch (error) {
        console.log(error)
        alert('Não foi possível salvar a agência')
        
    }
}
async function EditarAgencia(idAgencia){
    try {
        const dadoAgencia = {
            nome: document.getElementById('nomeAgencia').value,
            endereco: document.getElementById('enderecoAgencia').value
        }
        await axios.put('/agencias/update/'+idAgencia, dadoAgencia)
        alert('agência editada com sucesso')
    } catch (error) {
        console.log(error.response)
        alert('Não foi possível editar a agência')
        
    }
}

async function preencherTable() {
    try {
        console.log('aquiiiii')
        const dadosAgencia = await axios.get('/agencias/read')
        console.log(dadosAgencia)

        $("#tb_agencias tbody").empty()
        for (const item of dadosAgencia.data[0]) {
            $("#tb_agencias tbody").append(`
                    <tr> 
                        <td>${item.id_agencia}</td> 
                        <td>${item.nome || ''}</td>
                        <td>${item.endereco}</td>
                        <td>
                            <button class="btn btn-danger" onclick="Excluir('${item.id_agencia}')">Excluir</button>
                        </td>
                        <td>
                            <button class="btn btn-primary" onclick="selecionarAgencia('${item.id_agencia}')">Editar</button>
                        </td>
                    </tr>
                `);
        }
    } catch (error) {
        console.log(error)
        alert('erro ao pesquisar')
    }
}

async function selecionarAgencia(id_agencia){
    try {
        console.log('aquiiiii')
        const dadosCliente = await axios.get(`/agencias/read/unico/${id_agencia}`)
        console.log(dadosCliente.data[0])
        for (const item of dadosCliente.data[0]) {
            document.getElementById('idAgencia').value = item.id_agencia
            document.getElementById('nomeAgencia').value = item.nome
            document.getElementById('enderecoAgencia').value = item.endereco

        }
        $('#nav-home-tab').click();
        $('#home-tab').click();
    } catch (error) {
        console.log(error.response)
    }
}

async function Excluir(idAgencia){
    try {
        await axios.delete('/agencias/delete/'+idAgencia)
        alert('Agencia excluida')
    } catch (error) {
        console.log(error.response)
        alert('Agencia excluida')

        
    }
}