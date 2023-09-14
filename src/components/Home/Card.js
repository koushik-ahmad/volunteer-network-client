import React from 'react';

const Card = ({ rs }) => {
    const { img, title } = rs;

    return (
        <div>
            <div className="card w-full bg-base-100 shadow-xl border">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="w-60 rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                </div>
            </div>
        </div>
    );
};

export default Card;