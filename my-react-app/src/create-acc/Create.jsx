const createAccountPage = () => {
    const container = document.createElement('div');
    container.className = 'container';
  
    const header = document.createElement('header');
    const logo = document.createElement('img');
    logo.src = 'logo.png';
    logo.alt = 'Heart in the Game Logo';
    logo.className = 'logo';
    header.appendChild(logo);
    container.appendChild(header);
  
    const content = document.createElement('div');
    content.className = 'content';
  
    // Create Account Section
    const createAccount = document.createElement('div');
    createAccount.className = 'create-account';
    const createAccountTitle = document.createElement('h2');
    createAccountTitle.textContent = 'Create Account';
    createAccount.appendChild(createAccountTitle);
  
    const form = document.createElement('form');
  
    const fields = [
      { label: 'Enter Phone Number', type: 'tel', id: 'phone', placeholder: 'Enter phone number' },
      { label: 'Enter Birthday (MM/DD/YYYY)', type: 'text', id: 'birthday', placeholder: 'MM/DD/YYYY' },
      { label: 'Create Password', type: 'password', id: 'password', placeholder: 'Create password' },
      { label: 'Confirm Password', type: 'password', id: 'confirm-password', placeholder: 'Confirm password' },
    ];
  
    fields.forEach(field => {
      const label = document.createElement('label');
      label.htmlFor = field.id;
      label.textContent = field.label;
      form.appendChild(label);
  
      const input = document.createElement('input');
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      input.placeholder = field.placeholder;
      input.required = true;
      form.appendChild(input);
    });
  
    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'checkbox-group';
  
    const roles = [
      { value: 'volunteer', label: 'Volunteer' },
      { value: 'participant', label: 'Participant' },
    ];
  
    roles.forEach(role => {
      const roleLabel = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'role';
      radio.value = role.value;
      roleLabel.appendChild(radio);
      roleLabel.appendChild(document.createTextNode(role.label));
      checkboxGroup.appendChild(roleLabel);
    });
  
    form.appendChild(checkboxGroup);
  
    const createAccountBtn = document.createElement('button');
    createAccountBtn.type = 'submit';
    createAccountBtn.className = 'create-account-btn';
    createAccountBtn.textContent = 'Create Account';
    form.appendChild(createAccountBtn);
  
    const orText = document.createElement('p');
    orText.className = 'or';
    orText.textContent = 'or';
    form.appendChild(orText);
  
    const loginBtn = document.createElement('button');
    loginBtn.type = 'button';
    loginBtn.className = 'login-btn';
    loginBtn.textContent = 'Log in';
    form.appendChild(loginBtn);
  
    createAccount.appendChild(form);
    content.appendChild(createAccount);
  
    // Mission Statement Section
    const missionStatement = document.createElement('div');
    missionStatement.className = 'mission-statement';
    const missionTitle = document.createElement('h2');
    missionTitle.textContent = 'Mission Statement';
    missionStatement.appendChild(missionTitle);
  
    const missionText = document.createElement('p');
    missionText.textContent = 'One in 300 youth has an undetected heart condition that puts them at risk for SCA. By providing screenings, we aim to improve survival from sudden cardiac arrest by educating the community on the importance and simplicity of bystander CPR.';
    missionStatement.appendChild(missionText);
  
    const missionIcon = document.createElement('div');
    missionIcon.className = 'mission-icon';
    const heartIcon = document.createElement('i');
    heartIcon.className = 'heart-icon';
    heartIcon.innerHTML = '&#x2764;';
    missionIcon.appendChild(heartIcon);
    missionStatement.appendChild(missionIcon);
  
    content.appendChild(missionStatement);
    container.appendChild(content);
  
    document.body.appendChild(container);
  };
  
  window.onload = createAccountPage;