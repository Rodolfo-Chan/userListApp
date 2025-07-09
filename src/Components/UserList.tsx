import { useEffect, useState } from 'react';
import { fetchUsers } from '../features/services';
import type { User } from '../types/user';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        {/* Logo + Título */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="https://comco.me/assets/images/comco-comco-mx-comco.me-lalo-comco-cdmx-mexico-diseo-xochimilco-comco.mx-2020.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
          <h1 className="text-3xl font-semibold text-gray-800">
            Empleados
          </h1>
        </div>

        {/* Input de búsqueda */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabla de usuarios */}
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-800 bg-white">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 border-b border-gray-200">#</th>
                <th className="px-6 py-3 border-b border-gray-200">Nombre</th>
                <th className="px-6 py-3 border-b border-gray-200">Correo</th>
                <th className="px-6 py-3 border-b border-gray-200">Teléfono</th>
                <th className="px-6 py-3 border-b border-gray-200">País</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.login.uuid} className="even:bg-gray-50 hover:bg-blue-50 transition">
                    <td className="px-4 py-4 border-b border-gray-200">{index + 1}</td>
                    <td className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full border border-gray-300"
                        src={user.picture.thumbnail}
                        alt="Foto"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{user.name.first} {user.name.last}</div>
                        <div className="text-gray-500 text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.email}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.phone}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.location.country}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
