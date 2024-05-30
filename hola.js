$(document).ready(function() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let editingIndex = null;

    const renderContacts = () => {
        $('#contactList').empty();
        contacts.forEach((contact, index) => {
            $('#contactList').append(`
                <li class="list-group-item">
                    <strong>${contact.name}</strong> - ${contact.phone} - ${contact.email}
                    <button class="btn btn-secondary btn-sm float-right ml-2 edit-contact" data-index="${index}"><i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="btn btn-danger btn-sm float-right delete-contact" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </li>
            `);
        });
    };

    const saveContacts = () => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        const name = $('#name').val();
        const phone = $('#phone').val();
        const email = $('#email').val();

        const newContact = { name, phone, email };

        if (editingIndex === null) {
            contacts.push(newContact);
        } else {
            contacts[editingIndex] = newContact;
            editingIndex = null;
        }

        saveContacts();
        renderContacts();
        this.reset();
        $('#index').val('');
    });

    $(document).on('click', '.delete-contact', function() {
        const index = $(this).data('index');
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    });

    $(document).on('click', '.edit-contact', function() {
        const index = $(this).data('index');
        const contact = contacts[index];
        $('#name').val(contact.name);
        $('#phone').val(contact.phone);
        $('#email').val(contact.email);
        $('#index').val(index);
        editingIndex = index;
    });

    renderContacts();
});
