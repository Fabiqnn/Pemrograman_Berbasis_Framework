import {render, screen} from "@testing-library/react";
import AboutPages from "@/pages/about";
import { describe, expect, it } from '@jest/globals';

describe("About Page", () => {
    it("renders about page correctly", () => {
        const page = render(<AboutPages />)
        // expect(screen.getByTestId("title").textContent).toBe("About Page")
        expect(page).toMatchSnapshot()
    });
});