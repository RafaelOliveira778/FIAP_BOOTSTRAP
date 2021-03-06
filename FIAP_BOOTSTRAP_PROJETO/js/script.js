const inputBox = document.querySelector('#entrada');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = _=> { // Arrow Function _=> ou () =>
    let userData = inputBox.value; // Esta variavel pega o valor digitado pelo usuario */
    
    if(userData.trim() != 0){// Verifica se o que o usuario digitou se não é um espaço vazio */
        addBtn.classList.add('active');
    }else{
        addBtn.classList.remove('active');
    }
}

showTasks();

addBtn.onclick = _ =>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('New Todo');// Esta variavel vai pegar o armazenamento local //

    if(getLocalStorage == null){ // Verificar se o armazenamento local for nulo 
        listArr = []; // Cria um array vazio não adicionando o let voce consegue usar num escopo inteiro e nao so no if
    }else{
        listArr = JSON.parse(getLocalStorage)// Adicionando dados do usuario a nossa lista
    }
    listArr.push(userData); // Empurrando para dentro do array os dados do usuario
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    //Estamos transformando um objeto JS em um Fragmento JS

    showTasks();
}

//funcao para adicionar tarefas dentro da lista
function showTasks(){
    let getLocalStorage = localStorage.getItem('New Todo');

    if(getLocalStorage == null){
        listArr =[]
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNum = document.querySelector('.pendingNum');
    pendingNum.textContent = listArr.length;
    
    if(listArr.length>0){
        deleteAllBtn.classList.add('active');// Ativa a classe active 
    }else{
        deleteAllBtn.classList.remove('active');// Desativa a classe active 
    }

    let newLiTag = '';
    addBtn.classList.remove('active');
    listArr.forEach((element, index) => { //para cada elemento da lista faca algo
        newLiTag += `
            <li>${element}<span onclick= "deleteTask(${index})"><i class="fa-regular fa-trash-can"></i></span></li>
        `
    })
    todoList.innerHTML = newLiTag; //estamos adicionando um LI na lista html
    inputBox.value = '';//uma vez adicionada a tarefa deixa o campo em branco

}

//Funcao para deletar uma tarefa especifica
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New Todo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1); //Exclui ou remove um determinado item indexado
    //depois de remover o item atualize novamente o armazenamento local
    localStorage.setItem('New Todo',JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick = _=>{
    listArr = [];
    localStorage.setItem('New Todo',JSON.stringify(listArr));
    showTasks();
}