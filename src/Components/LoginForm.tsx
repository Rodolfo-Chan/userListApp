import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import type { User } from '../types/user';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const fakeUser: User = {
      gender: 'male',
      name: {
        title: '',
        first: name,
        last: 'Apellido',
      },
      location: {
        street: { number: 0, name: 'Calle Falsa' },
        city: 'Ciudad',
        state: 'Estado',
        country: 'País',
        postcode: '00000',
      },
      email,
      login: {
        uuid: crypto.randomUUID(),
        username: email.split('@')[0],
        password: 'contraseña-temporal'
      },
      phone: '000-000-0000',
      cell: '000-000-0000',
      picture: {
        large: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
        medium: `https://randomuser.me/api/portraits/med/men/${Math.floor(Math.random() * 100)}.jpg`,
        thumbnail: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random() * 100)}.jpg`,
      },
      dob: {
        date: new Date().toISOString(),
        age: 30
      }
    };

    dispatch(login(fakeUser));
    setEmail('');
    setName('');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-12">
      {/* Imagen centrada arriba del título */}
      <div className="flex justify-center mb-4">
        <img
          src="https://comco.me/assets/images/comco-comco-mx-comco.me-lalo-comco-cdmx-mexico-diseo-xochimilco-comco.mx-2020.png"
          alt="Logo"
          className="w-24 h-24 object-contain"
        />
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;