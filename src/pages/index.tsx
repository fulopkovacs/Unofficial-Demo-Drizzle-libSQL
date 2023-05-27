import { faker } from "@faker-js/faker";
import { type NextPage } from "next";
import Head from "next/head";
import { useState, type HTMLAttributes } from "react";
import { api } from "~/utils/api";

function Button(
  buttonProps: Omit<HTMLAttributes<HTMLButtonElement>, "className">
) {
  return (
    <button
      className="w-max cursor-pointer rounded-md border border-neutral-400 bg-neutral-700 px-2 py-1 transition-colors hover:border-neutral-500 hover:bg-neutral-800 active:border-neutral-600 active:bg-neutral-900"
      {...buttonProps}
    >
      {buttonProps.children}
    </button>
  );
}

function UsernameList({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-neutral-500">
      <h2 className="mb-3 text-sm uppercase text-neutral-500">Usernames</h2>
      <span className="text-white">{children}</span>
    </div>
  );
}

const Home: NextPage = () => {
  const saveToDBMutation = api.example.saveToDB.useMutation();
  const fetchAllUsersQuery = api.example.fetchAllUsers.useQuery();
  const utils = api.useContext();

  function getFakeUserData() {
    return {
      fullName: faker.person.firstName(),
      email: faker.internet.email(),
    };
  }

  const [fakeUserData, setFakeUserData] = useState(getFakeUserData());

  function createNewUser() {
    saveToDBMutation.mutate(fakeUserData, {
      onSuccess: () => {
        void utils.example.invalidate();
      },
    });
    setFakeUserData(getFakeUserData());
  }

  return (
    <>
      <Head>
        <title>DrizzleORM + libSQL</title>
        <meta
          name="description"
          content="Experimenting with DrizzleORM + libSQL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
        <div className="grid max-w-full  gap-3 sm:max-w-sm">
          {fetchAllUsersQuery.isSuccess && (
            <UsernameList>
              {fetchAllUsersQuery.data.map((u) => u.fullName).join(", ")}
            </UsernameList>
          )}
          <Button onClick={createNewUser}>Create new fake user</Button>
          <div className="text-neutral-500">
            {fakeUserData.fullName}, {fakeUserData.email}
          </div>
          <span className="text-yellow-800">
            last inserted id:{" "}
            {saveToDBMutation.data && saveToDBMutation.data[0]?.insertedId}
          </span>
        </div>
      </main>
    </>
  );
};

export default Home;
