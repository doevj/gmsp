'use server'

let dbChecked = false;

function isDbChecked() {
  return dbChecked;
}

function setDbChecked(value: boolean) {
  dbChecked = value;
}

export async function checkDb() {
  'use server'
  if (isDbChecked()) {
    console.log('DB already checked');
    return;
  }
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/healthcheck`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.error('DB not reachable');
        setDbChecked(false);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      setDbChecked(true);
    })
    .catch((error) => {
      console.error('Error:', error);
      setDbChecked(false);
    });
}