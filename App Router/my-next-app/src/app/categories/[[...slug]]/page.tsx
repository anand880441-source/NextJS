type CategoryPageProps = {
    params : Promise<{
        slug?: string[]
    }>
}

export default async function CategoryPage({
    params,
}: CategoryPageProps){
    const {slug} = await params;

    if(!slug){
        return(
            <main>
                <h1>All Category</h1>
            </main>
        )
    }

    return(
        <main className="p-8">
            <h1>Category Explorer</h1>

            <p>Selected Category path:</p>

            <p>{slug.join(" / ")}</p>

            <h2>All segments:</h2>

            {
                slug.map((category, index) => (
                    <p key={index}>
                        Level {index+1} : {category}
                    </p>
                ))
            }
        </main>
    )
}