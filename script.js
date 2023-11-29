function generateFakeSentence() {
    const baseUrl = 'https://fakerapi.it/api/v1/';
    const resources = [
      'addresses',
      'books',
      'companies',
      'persons?_gender=male&_birthday_start=2005-01-01',
      'places',
      'texts?_characters=500'
    ];
    const quantity = 1;
  
    // Realizar solicitud GET a la API para cada recurso
    Promise.all(resources.map(resource =>
      fetch(`${baseUrl}${resource}?_quantity=${quantity}`)
        .then(response => response.json())
    ))
      .then(data => {
        // Manipular la respuesta de la API
        const fakeSentenceElement = document.getElementById('fakeSentence');
        fakeSentenceElement.innerHTML = '<h2>Oración Falsa Generada</h2>';
  
        // Utilizar datos de la primera persona generada para construir una oración
        const personData = data[3].data[0]; // Datos de la primera persona
        const sentence = `Mi nombre es ${personData.firstname} ${personData.lastname}. Vivo en ${personData.address.street}, ${personData.address.city}, ${personData.address.country}.`;
  
        // Mostrar la oración generada en el HTML
        fakeSentenceElement.innerHTML += `<p>${sentence}</p>`;
      })
      .catch(error => {
        console.error('Error al obtener datos de la API', error);
      });
  }
  