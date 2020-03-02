import React from 'react';

const ButtonSubmit = (props) => {
	return (
		<button
			type="submit"
			className={`btn btn-${props.variant} rounded-pill mx-3 `}
			onClick={props.onClick ? props.onClick : null}
			disabled={props.isLoading ? true : false}
		>
			{props.isLoading ? (
				<div>
					<span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true" />
					Loading...
				</div>
			) : (
				props.text
			)}
		</button>
	);
};

export default ButtonSubmit;
