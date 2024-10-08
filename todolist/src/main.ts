// main.ts
import FullList from './model/FullList';
import ListTemplate from './templates/ListTemplate';

// Get references to DOM elements
const listContainer = document.getElementById('todo-list') as HTMLUListElement;
const addItemForm = document.getElementById('add-item-form')!;
const input = document.getElementById('item-input') as HTMLInputElement;
const clearButton = document.getElementById('clear-items-btn')!;

// Initialize FullList and ListTemplate instances
const fullList = FullList.getInstance();
const listTemplate = ListTemplate.getInstance(listContainer);

// Add event listener for form submission to add new items
addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const itemName = input.value.trim();
  if (itemName) {
    // Add item to the list
    fullList.addItem(itemName);
    // Render the updated list
    listTemplate.renderList();
    // Clear input field after adding item
    input.value = '';
  }
});

// Add event listener for the clear button to remove all items
clearButton.addEventListener('click', () => {
  // Clear all items from the list
  fullList.clear();
  // Render the updated empty list
  listTemplate.renderList();
});

// Render the list on page load
window.addEventListener('load', () => {
  listTemplate.renderList();
});