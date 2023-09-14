import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useLoaderData } from 'react-router-dom';
import './Home.css';


/*
count, : loaded
perPage (size): 10
pages: count/perPage
currentPage (page)

*/

const Home = () => {
    // const { data, count } = useLoaderData();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);

    // const [result, setResult] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const url = `https://volunteer-network-server-dusky.vercel.app/data?page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                // setData(data.data);
                console.log(data);
                const match = data.data.filter(d => d.title.includes(search));
                setData(match)
            })
    }, [page, size, search]);

    const pages = Math.ceil(count / size);


    // const [result, setResult] = useState([]);
    // const [search, setSearch] = useState('');

    // useEffect(() => {
    //     fetch('https://volunteer-network-server-dusky.vercel.app/data')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             const match = data.data.filter(d => d.title.includes(search));
    //             setResult(match)
    //         })
    // }, [search]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const value = event.target.input;
    //     console.log(value);
    // }


    return (
        <>
            <div className=''>
                <p className='text-3xl text-center font-bold uppercase py-5'>I grow by helping people in need.</p>
                <div className="lg:w-1/3 md:w-2/4 sm:w-2/4 mx-auto mb-3 ">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            onChange={handleChange}
                            type="search"
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search...."
                            aria-label="Search"
                            aria-describedby="button-addon1"
                        />
                        <button
                            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-md leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                            type="button"
                            id="button-addon1"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Search
                        </button>
                    </div>
                    <h2 className='text-center'>Search result: {data.length}</h2>
                </div>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 py-5'>
                    {
                        data.map(rs => <Card
                            key={rs._id}
                            rs={rs}
                        ></Card>)
                    }
                </div>
            </div>
            <div className='w-72 mx-auto pagination'>
                <p className='my-2'>Currently selected page: {page} & size: {size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        className={page === number ? 'selected' : ' '}
                        onClick={() => setPage(number)}
                    >
                        {number + 1}
                    </button>)
                }
                <select defaultValue='6' onChange={event => setSize(event.target.value)}>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>
            </div>
        </>
    );
};

export default Home;