import Login from "./Login";
import React from "react";
import { cleanup, render } from "@testing-library/react";

describe("Login Componet", () => {
	beforeEach(cleanup);

	it("renders", () => {
		const { getByText } = render(<Login />);

		// .toBeInTheDocument() is an assertion that comes from jest-dom
		// otherwise you could use .toBeDefined()

		expect(getByText("sss")).toBeDefined();
	});
});
