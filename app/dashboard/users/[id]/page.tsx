const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <h1>Данные пользователя</h1>
      <div>{id}</div>
    </div>
  );
};

export default UserDetails;
