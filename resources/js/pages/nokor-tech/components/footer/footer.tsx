import React from 'react'
import { Input } from '../ui/input'


import AccordionComponent from './my-footer-accordion';
import AccordionAdreesComponent from './my-footer-address-accordion';
import Image from 'next/image';


const informations = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Products', href: '/products' },
];

const categories = [
    { label: 'Laptop', href: '#' },
    { label: 'Desktop', href: '#' },
    { label: 'Network Devices', href: '#' },
    { label: 'Smartphones', href: '#' },
    // { label: 'Tablets', href: '#' },
    // { label: 'Printers', href: '#' },
    // { label: 'Monitors', href: '#' },
    // { label: 'Storage Devices', href: '#' },
    // { label: 'Gaming Consoles', href: '#' },
    // { label: 'Smartwatches', href: '#' },
];

const brands = [
    { label: 'MSI', href: '#' },
    { label: 'DELL', href: '#' },
    { label: 'ASUS', href: '#' },
    { label: 'APPLE', href: '#' },
];



const desktopPCs = [
    {
        title: 'Desktop PCs',
        links: [
            { label: 'Custom PCs', href: '/desktop-pcs/custom' },
            { label: 'Servers', href: '/desktop-pcs/servers' },
            { label: 'MSI All-In-One PCs', href: '/desktop-pcs/msi-all-in-one' },
            { label: 'HP/Compaq PCs', href: '/desktop-pcs/hp-compaq' },
            { label: 'ASUS PCs', href: '/desktop-pcs/asus' },
            { label: 'Tecs PCs', href: '/desktop-pcs/tecs' }
        ]
    }
];

const laptops = [
    {
        title: 'Laptops',
        links: [
            { label: 'Everyday Use Notebooks', href: '/laptops/everyday-use' },
            { label: 'MSI Workstation Series', href: '/laptops/msi-workstation' },
            { label: 'MSI Prestige Series', href: '/laptops/msi-prestige' },
            { label: 'Tablets and Pads', href: '/laptops/tablets-pads' },
            { label: 'Netbooks', href: '/laptops/netbooks' },
            { label: 'Infinity Gaming Notebooks', href: '/laptops/infinity-gaming' }
        ]
    }
];

const address = {
    title: 'Current Address',
    details: [
        { label: 'Address', content: '1234 Street Address City Address, 1234' },
        { label: 'Phones', content: <a href="tel:+0012345678" className='text-blue-500'>(00) 1234 5678</a> },
        { label: 'E-mail', content: <a href="mailto:shop@email.com" className='text-blue-500'>shop@email.com</a> },
        { label: 'Website', content: <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className='text-blue-500'>www.example.com</a> },
    ]
};


const Footer = () => {
    return (
        <div className='bg-primary'>
            <div className='mx-auto lg:flex justify-between gap-8 max-w-screen-xl text-white pt-4 px-4'>
                <header className='w-64'>
                    <div className='flex flex-col justify-center items-center'>
                        <Image
                            width={65}
                            height={65}
                            src="/images/logo/logo.png"
                            alt=""
                            className=" hover:cursor-pointer"
                        />
                        <p className='font-semibold text-2xl'>Nokor-Tech</p>
                    </div>
                </header>
                <div className='grid grid-cols-4'>
                    {/* start imformation */}
                    <div className='md:hidden'>
                        {/* <AccordionComponent data={information} /> */}
                    </div>
                    <div className='hidden md:block'>
                        <div>
                            <p className="text-xl font-semibold text-white">Informations</p>
                            <ul className="py-4 text-sm flex flex-col gap-1 text-white">
                                {informations.map((item, idx) => (
                                    <li key={idx}>
                                        <a href={item.href} className=" hover:underline underline-offset-2">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* end imformation */}

                    {/* <div className='md:hidden'>
                        <AccordionComponent data={categories} />
                    </div> */}
                    <div className='hidden md:block'>
                        <div>
                            <div>
                                <p className="text-xl font-semibold text-white">Cateogries</p>
                                <ul className="py-4 text-sm flex flex-col gap-1 text-white">
                                    {categories.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className=" hover:underline underline-offset-2">
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className='md:hidden'>
                        <AccordionComponent data={brands} />
                    </div> */}
                    <div className='hidden md:block'>
                        <div>
                            <div>
                                <p className="text-xl font-semibold text-white">Brands</p>
                                <ul className="py-4 text-sm flex flex-col gap-1 text-white">
                                    {brands.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className=" hover:underline underline-offset-2">
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* start address */}
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-white">{address.title}</p>
                        <ul className="py-4 text-sm flex flex-col gap-1 text-white">
                            {address.details.map((detail, idx) => (
                                <li key={idx} className="flex">
                                    <span className="font-semibold mr-2">{detail.label}:</span>
                                    <span>{detail.content}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* end address */}

                </div>

            </div>
            {/* start bank */}
            <hr className='bg-white' />
            <div className='py-4'>
                <div className='py-4 flex flex-wrap justify-between items-center'>
                    <div className='flex gap-4'>
                        <img src="/icons/ig.png" alt="" width={25} className='hover:cursor-pointer' />
                        <img src="/icons/fb.png" alt="" width={25} className='hover:cursor-pointer' />
                    </div>
                    <div className='hidden md:flex gap-4 '>
                        <img src="/icons/banks/aba.jpg" alt="ABA" className='w-16 h-10 object-cover rounded-lg' />
                        <img src="/icons/banks/wing.jpg" alt="wing" className='w-16 h-10 object-cover rounded-lg' />
                        <img src="/icons/banks/truemoney.jpg" alt="True Money" className='w-16 h-10 object-cover rounded-lg' />
                    </div>
                    <p className='text-sm md:text-xl text-gray-500'>Copyright © 2020 Shop Pty. Ltd.</p>
                </div>
                <div className='md:hidden flex gap-4 justify-center mb-4'>
                    <img src="/icons/banks/aba.jpg" alt="ABA" className='w-10 h-6 md:w-16 md:h-10 object-cover rounded-sm md:rounded-lg' />
                    <img src="/icons/banks/wing.jpg" alt="wing" className='w-10 h-6 md:w-16 md:h-10 object-cover rounded-sm md:rounded-lg' />
                    <img src="/icons/banks/truemoney.jpg" alt="True Money" className='w-10 h-6 md:w-16 md:h-10 object-cover rounded-sm md:rounded-lg' />
                </div>
            </div>
            {/* end bank */}
        </div>
    )
}

export default Footer
