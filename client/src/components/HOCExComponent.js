import React, { useState } from "react";

const HOCExComponent = WrappedComponent => {
	function ClickItWapper() {
		// Declare a new state variable, which we'll call "count"
		const [count, setCount] = useState(99);

		return (
			<div>
				<button onClick={() => setCount(count - 1)}>Click me</button>
				<WrappedComponent count={count} />
			</div>
		);
	}

	return ClickItWapper();
};

export default HOCExComponent;
