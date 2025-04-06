export default function Register() {
  return (
    <div className='min-h-[100vh] w-full flex flex-col gap-20 items-center justify-center bg-teal-600/90 '>

      <h2 className='text-4xl text-center font-bold text-white'>Register</h2>

      <div className='w-[39%] min-w-[315px] bg-white p-10 rounded-lg shadow-lg relative overflow-visible'>
        <div className="absolute -top-7 left-0 w-full bg-teal-500 text-white text-xl font-bold p-3 rounded-t-2xl">
          Stay in touch!
        </div>
        <form action={handleSubmit} className='flex flex-col'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-900 text-xs text-bold'>Name</label>
            <input type='text' id='name' className='border border-gray-300 rounded w-full py-2 px-3' />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-900 text-xs text-bold'>Email</label>
            <input type='email' id='email' className='border border-gray-300 rounded w-full py-2 px-3' />
          </div>
          <div className='mb-8'>
            <label htmlFor='password' className='block text-gray-900 text-xs text-bold'>Password</label>
            <input type='password' id='password' className='border border-gray-300 rounded w-full py-2 px-3' />
          </div>
          <button type='submit' className='bg-teal-600 text-white font-bold py-2 px-4 rounded-lg'>Register</button>
        </form>
      </div>
    </div>
  );
}

const handleSubmit = async (formData: FormData) => {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  }).then((data) => {
    console.log('Success:', data);
  }).catch((error) => {
    console.error('Error:', error);
  });
};