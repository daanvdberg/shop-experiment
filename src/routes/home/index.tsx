import Directory from "@components/directory";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://picsum.photos/id/338/500/300",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://picsum.photos/id/1005/500/300",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://picsum.photos/id/1001/500/300",
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://picsum.photos/id/777/500/300",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://picsum.photos/id/349/500/300",
    },
  ];

  return <Directory categories={categories} />;
};

export default Home;
