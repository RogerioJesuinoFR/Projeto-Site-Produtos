class ListManager {
    constructor() {
        this.lists = JSON.parse(localStorage.getItem('lists')) || [];
        this.renderLists();
    }

    saveLists() {
        localStorage.setItem('lists', JSON.stringify(this.lists));
    }

    renderLists() {
        const listsContainer = document.getElementById('lists');
        listsContainer.innerHTML = '';
        this.lists.forEach(list => {
            const listElement = document.createElement('li');
            listElement.id = list.id;
            listElement.innerHTML = `
                <hr>
                <input type="text" value="${list.name}" onchange="listManager.editListName('${list.id}', this.value)">
                <button onclick="listManager.deleteList('${list.id}')">Excluir Lista</button>
                <ul id="${list.id}-items">
                    ${list.items.map(item => `
                        <li>
                            <span>${item.name}</span>
                            <button onclick="listManager.editItem('${list.id}', '${item.id}', '${item.name}')">Editar</button>
                            <button onclick="listManager.deleteItem('${list.id}', '${item.id}')">Excluir</button>
                        </li>
                    `).join('')}
                </ul>
                <input type="text" id="${list.id}-new-item" placeholder="Novo Item">
                <button onclick="listManager.addItem('${list.id}')">Adicionar Item</button>
            `;
            listsContainer.appendChild(listElement);
        });
        this.saveLists();
    }

    addList() {
        const newListName = document.getElementById('new-list').value.trim();
        if (newListName === '') {
            alert('Por favor, insira um nome para a lista.');
            return;
        }
        const newList = {
            id: Math.random().toString(36).substring(7),
            name: newListName,
            items: []
        };
        this.lists.push(newList);
        this.renderLists();
        document.getElementById('new-list').value = '';
    }

    editListName(listId, newName) {
        const listIndex = this.lists.findIndex(list => list.id === listId);
        this.lists[listIndex].name = newName;
        this.renderLists();
    }

    deleteList(listId) {
        this.lists = this.lists.filter(list => list.id !== listId);
        this.renderLists();
    }

    addItem(listId) {
        const newItemInput = document.getElementById(`${listId}-new-item`);
        const newItemName = newItemInput.value.trim();
        if (newItemName === '') {
            alert('Por favor, insira um nome para o item.');
            return;
        }
        const listIndex = this.lists.findIndex(list => list.id === listId);
        const newItem = {
            id: Math.random().toString(36).substring(7),
            name: newItemName
        };
        this.lists[listIndex].items.push(newItem);
        this.renderLists();
        newItemInput.value = '';
    }

    deleteItem(listId, itemId) {
        const listIndex = this.lists.findIndex(list => list.id === listId);
        const itemIndex = this.lists[listIndex].items.findIndex(item => item.id === itemId);
        this.lists[listIndex].items.splice(itemIndex, 1);
        this.renderLists();
    }

    editItem(listId, itemId, itemName) {
        const newName = prompt("Novo nome do item:", itemName);
        if (newName.trim() === '') {
            alert ("Insira um nome.");
        } else {
            const listIndex = this.lists.findIndex(list => list.id === listId);
            const itemIndex = this.lists[listIndex].items.findIndex(item => item.id === itemId);
            this.lists[listIndex].items[itemIndex].name = newName;
            this.renderLists();
        }
    }
    
}

const listManager = new ListManager();