import { url } from 'inspector';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React from 'react';

interface IconProp {
  icon: React.ReactNode;
  name: string;
  link?:Url;
  onSubmit?: () => void;
}

const IconBtn: React.FC<IconProp> = ({ icon, name,link, onSubmit }) => {
  return (
    <div className="">
      <button onClick={onSubmit}  className='flex gap-2 items-center p-4'>
      {icon} <p className='font-bold'>{name}</p>
      </button>
    </div>
  );
};

export default IconBtn;
