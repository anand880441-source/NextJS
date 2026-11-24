type AboutPageProps = {
  searchParams: Promise<{
    name: string,
    age: number,
  }>;
};

const About = async ({ searchParams }: AboutPageProps) => {
  const {name, age } = await searchParams;

  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
    </div>
  );
};

export default About;