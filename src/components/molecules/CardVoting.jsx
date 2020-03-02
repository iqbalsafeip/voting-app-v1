import React from 'react';

const CardVoting = (props) => {
	console.log(props);
	return (
		<div className="card col-11 col-lg-4 mx-lg-3 my-3 mx-auto px-2 py-2 shadow">
			<div
				className="card-img-top mx-auto"
				style={{
					width: 300,
					height: 300,
					backgroundColor: '#82b2ff',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundImage: `url(${props.image})`
				}}
			/>
			<div className="card-body">
				<h5 className="card-title mt-auto">{props.name}</h5>
				<p className="mt-auto">Voted By : {props.votedBy}</p>
			</div>
		</div>
	);
};

export default CardVoting;
