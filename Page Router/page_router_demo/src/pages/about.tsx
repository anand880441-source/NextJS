import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);

  const { query } = context;
  console.log(query);

  let name = []

  console.log("Type: ", typeof(query.name))

  if(typeof(query.name) === 'string'){
    name = [query.name]
  }else{
    name = query?.name || []
  }

  return {
    props: {
      // name: [query?.name] || '',
      name,
      age: query?.age || null
    },
  };
};

interface AboutProps{
  name: string[];
  age: number | null;
}

const About = ({ name,age }: AboutProps) => {
  return(
    <>
      {/* <h1>Name: {name}</h1> */}
      {age && <h1>Age: {age}</h1>}
      <div>
        {name && name.map((n) => (
          <div>Name: {n}</div>
        ))}
      </div>
    </>
  )
};

export default About;
