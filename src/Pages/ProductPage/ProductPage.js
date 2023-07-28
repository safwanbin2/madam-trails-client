import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Components/LoadingPage';
import ProductCard from '../../Components/ProductCard';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const ProductPage = () => {
    const searchText = useLoaderData();
    const {subCategoryText, setSubCategoryText} = useContext(AuthContext);
    // const [searchText, setSearchText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    // const [subCategoryText, setSubCategoryText] = useState("");
    
    const { data: products, isLoading } = useQuery({
        queryKey: [searchText, "/products/find", categoryText, subCategoryText],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/find?q=${searchText ? searchText : ""}&category=${categoryText}&subCategory=${subCategoryText}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <div className=''>
                <div className='w-11/12 mx-auto py-2 md:py-4 flex flex-col md:flex-row gap-2'>
                    <div className=''>
                        <h2 className='text-xl mb-3 text-grey'>Filter: </h2>
                        {/* <div className='w-10/12 md:w-6/12 flex gap-2'>
                            <button onClick={handleReset} className={`${categoryText === "" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full`}>All</button>
                            <button onClick={() => setCategoryText("men")} className={`${categoryText === "men" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full`}>Men</button>
                            <button onClick={() => setCategoryText("women")} className={`${categoryText === "women" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent "} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border transition-all duration-300 w-full`}>Women</button>
                        </div> */}
                        <div className='w-auto md:w-6/12 flex gap-2 '>
                            <button onClick={() => setSubCategoryText("")} className={`${subCategoryText === "" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full tracking-widest`}>All</button>
                            <button onClick={() => setSubCategoryText("fashion")} className={`${subCategoryText === "fashion" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full tracking-widest`}>Fashion</button>
                            <button onClick={() => setSubCategoryText("makeup")} className={`${subCategoryText === "makeup" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent "} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border transition-all duration-300 w-full tracking-widest`}>MakeUp</button>
                            <button onClick={() => setSubCategoryText("skincare")} className={`${subCategoryText === "skincare" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent "} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border transition-all duration-300 w-full tracking-widest`}>SkinCare</button>
                            <button onClick={() => setSubCategoryText("haircare")} className={`${subCategoryText === "haircare" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent "} px-4 md:px-6 py-1 text-sm  rounded-3xl hover:shadow-lg border transition-all duration-300 w-full tracking-widest`}>HairCare</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-11/12 mx-auto my-6'>
                {
                    isLoading ? <LoadingPage />
                        : (products.length === 0 ? <div className='text-xl font-semibold text-grey'>No Products Available</div> : <div className='grid grid-cols-2 md:grid-cols-7 gap-2'>
                            {
                                products.map(product => <ProductCard
                                    key={product._id}
                                    product={product}
                                ></ProductCard>)
                            }
                        </div>)
                }
            </div>
        </div>
    );
};

export default ProductPage;