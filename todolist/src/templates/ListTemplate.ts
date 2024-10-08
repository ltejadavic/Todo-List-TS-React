// templates/ListTemplate.ts
import FullList from '../model/FullList';
import ListItem from '../model/ListItem';

export default class ListTemplate {
  private static instance: ListTemplate;
  private constructor(private container: HTMLUListElement) {}

  // Singleton pattern for ListTemplate
  static getInstance(container: HTMLUListElement): ListTemplate {
    if (!ListTemplate.instance) {
      ListTemplate.instance = new ListTemplate(container);
    }
    return ListTemplate.instance;
  }

  // Render the to-do list
  renderList() {
    const fullList = FullList.getInstance();
    fullList.load();

    this.container.innerHTML = '';  // Clear any existing list items

    fullList.list.forEach((item: ListItem) => {
      // Create <li> element
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

      // Create a <div> to contain the checkbox and label
      const itemDiv = document.createElement('div');

      // Create checkbox to mark the item as completed
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = item.id;
      checkbox.checked = item.checked;
      checkbox.className = 'form-check-input me-2';
      checkbox.addEventListener('change', () => {
        item.checked = !item.checked;  // Toggle completion status
        fullList.save();  // Save the updated state
        this.renderList();  // Re-render the list
      });

      // Create label for item text
      const label = document.createElement('label');
      label.htmlFor = item.id;
      label.textContent = item.item;
      label.className = item.checked ? 'completed' : '';  // Add a 'completed' class if item is checked

      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(label);

      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        fullList.removeItem(item.id);  // Remove the item from the list
        this.renderList();  // Re-render the list
      });

      // Append <div> and delete button to the <li>
      listItem.appendChild(itemDiv);
      listItem.appendChild(deleteButton);

      // Append <li> to the <ul> container
      this.container.appendChild(listItem);
    });
  }
}