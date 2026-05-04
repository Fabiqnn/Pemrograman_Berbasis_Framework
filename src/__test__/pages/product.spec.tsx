import { render } from "@testing-library/react";
import TampilanProduk from "@/views/produk";
import { describe, expect, it } from '@jest/globals';
import { ProductType } from "@/types/Product.type";

const mockProducts: ProductType[] = [
    {
        id: "1",
        name: "Sepatu Test",
        price: 250000,
        image: "/images/test-product.jpg",
        category: "Fashion",
    },
];

describe("Product Page", () => {
    it("renders product page correctly", () => {
        const page = render(<TampilanProduk products={mockProducts} />);
        // expect(screen.getByTestId("title").textContent).toBe("Product Page");
        expect(page).toMatchSnapshot();
    });
});
