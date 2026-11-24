type ProductPageProps = {
    params: Promise<{
        slug: string
    }>
}

const Category = async({params} : ProductPageProps) => {
    const {slug} = await params
    return(
        <div>This is params Product: {slug}</div>
    )
}

export default Category;