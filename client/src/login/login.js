import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);

function handleLoginForm(email, password) {
    const hashedPassword = bcrypt.hashSync(password) // hash created previously created upon sign up

    fetch('https://api.sampleapis.com/beers/ale', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
      }),
    })
  }