import { SupplierInterface } from "./ISupplier";
import { CategoryInterface } from "./ICategory";

export interface ProductInterface {
    ID?: number;
    ProductName?: string;
    ProductPicture?: string;
    Price?: number;
    ProductDescription?: string;
    DateAdded?: string;
    CategoryID?: number;
    Category?: CategoryInterface;
    SupplierID?: number;
    Supplier?: SupplierInterface;
}