import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { FaUser, FaEnvelope, FaCalendar, FaMapMarkerAlt, FaPhone, FaLock } from 'react-icons/fa';
import type { User } from '../types/user';

type SectionData = {
  title: string;
  value: string;
  icon: React.ReactNode;
  noCaps?: boolean;
};

const UserProfileCard = () => {
  const user = useAppSelector(state => state.auth.user) as User;
  const [activeSection, setActiveSection] = useState('name');

  if (!user) return <p>No hay usuario</p>;

  const getSafeImageUrl = () => {
    if (user.picture?.large?.trim()) return user.picture.large;
    if (user.picture?.medium?.trim()) return user.picture.medium;
    const gender = user.gender || 'male';
    return `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/20.jpg`;
  };

  // Función para formatear la dirección completa
  const formatAddress = () => {
    const street = `${user.location.street.number} ${user.location.street.name}`;
    const cityState = `${user.location.city}, ${user.location.state}`;
    return `${street}, ${cityState}, ${user.location.country}`;
  };

  // Función para mostrar la contraseña de forma segura
  const formatPassword = () => {
    if (!user.login.password) return '******';
    const { password } = user.login;
    return `${password.substring(0, 1)}****${password.slice(-1)}`;
  };

  const sections: Record<string, SectionData> = {
    name: {
      title: `Hi, My name is`,
      value: `${user.name.title} ${user.name.first} `.trim(),
      icon: <FaUser />
    },
    email: {
      title: `My email address is`,
      value: user.email,
      icon: <FaEnvelope />,
      noCaps: true
    },
    birthday: {
      title: `My birthday is`,
      value: new Date(user.dob.date).toLocaleDateString(),
      icon: <FaCalendar />
    },
    location: {
      title: `My address is`,
      value: formatAddress(),
      icon: <FaMapMarkerAlt />
    },
    phone: {
      title: `My phone number is`,
      value: user.phone || user.cell,
      icon: <FaPhone />
    },
    password: {
      title: `My password is`,
      value: formatPassword(),
      icon: <FaLock />,
      noCaps: true
    }
  };

  const activeData = sections[activeSection];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6 text-center">
      <div className="flex justify-center mb-4">
        <img
          src={getSafeImageUrl()}
          alt={`Foto de ${user.name.first}`}
          className="w-24 h-24 object-cover rounded-full border-4 border-white shadow"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.name.first}+${user.name.last}`;
          }}
        />
      </div>

      <div className="details mb-6">
        <p className="text-gray-500 text-sm">{activeData.title}</p>
        <p className={`text-lg font-medium ${activeData.noCaps ? '' : 'capitalize'}`}>
          {activeData.value}
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-6 text-gray-400 dark:text-gray-500 text-xl">
        {Object.entries(sections).map(([key, section]) => (
          <div 
            key={key}
            onClick={() => setActiveSection(key)}
            className={`cursor-pointer p-2 rounded-full ${activeSection === key ? 'bg-green-100 text-green-600' : 'hover:text-green-500'}`}
            title={section.title}
          >
            {section.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileCard;