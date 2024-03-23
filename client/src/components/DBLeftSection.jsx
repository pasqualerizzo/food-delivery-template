import React from 'react';
import { Logo } from '../assets';
import { NavLink } from 'react-router-dom';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';

const DBLeftSection = () => {
  return (
    <div className='h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3'>
        <NavLink to={"/"} className="flex items-center justify-start gap-4 px-6">
            <img src={Logo} alt="logo" className='w-12' />
            <p className='font-semibold text-xl'>
                Chicken
            </p>
        </NavLink>

        <hr />

        <ul className='flex flex-col gap-4'>
            <NavLink
                to={"/dashboard/home"} 
                className={({isActive}) => 
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                } 
            >
                Home
            </NavLink>
            <NavLink
                to={"/dashboard/orders"} 
                className={({isActive}) => 
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                } 
            >
                Ordini
            </NavLink>
            <NavLink
                to={"/dashboard/items"} 
                className={({isActive}) => 
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                } 
            >
                Prodotti
            </NavLink>
            <NavLink
                to={"/dashboard/newItem"} 
                className={({isActive}) => 
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                } 
            >
                Crea Prodotto
            </NavLink>
            <NavLink
                to={"/dashboard/users"} 
                className={({isActive}) => 
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                } 
            >
                Utenti
            </NavLink>            
        </ul>

        <div className=' w-full items-center justify-center flex h-225 mt-auto px-2'>
            <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
                <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
                    <p className='text-2xl font-bold text-red-500'>
                        ?
                    </p>
                </div>
                <p className="text-xl text-primary font-semibold">
                    Help Center
                </p>
                <p className='text-base text-gray-300 text-center'>
                    Per Ulteriori Domande
                </p>
                <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
                    Contattaci
                </p>
            </div>
        </div>
    </div>
  )
}

export default DBLeftSection