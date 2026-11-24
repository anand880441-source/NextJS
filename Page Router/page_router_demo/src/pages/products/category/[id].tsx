import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);

  const { query } = context;
  console.log(query);

  return {
    props: {
     id: 123354
    },
  };
};

interface HelloProps{
  id: number;
}

const Category = ({id} : HelloProps) => {
    return(
        <div>Category Page ID: {id}</div>
    )
}

export default Category;