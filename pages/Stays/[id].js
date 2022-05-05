export const getStaticPaths = async (params) => {
  const staysArray = await getCabins(apiCall);

  const paths = staysArray.map((stays) => {
    return {
      params: { id: stays.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const stays = await getCabins(apiCall + '/' + id);
  return {
    props: { stays },
  };
};


