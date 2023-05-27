import { faker } from "@faker-js/faker";
import { type NextPage } from "next";
import Head from "next/head";
import { useState, type HTMLAttributes, useEffect } from "react";
import { api } from "~/utils/api";

type FakeUserData = { firstName: string; lastName: string; email: string };

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
  const saveToDBMutation = api.users.createNewUser.useMutation();
  const fetchAllUsersQuery = api.users.getAll.useQuery();
  const utils = api.useContext();

  function getFakeUserData(): FakeUserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
    };
  }

  const [fakeUserData, setFakeUserData] = useState<FakeUserData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setFakeUserData(getFakeUserData());
  }, []);

  function createNewUser() {
    saveToDBMutation.mutate(fakeUserData, {
      onSuccess: () => {
        void utils.users.invalidate();
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
              {fetchAllUsersQuery.data
                .map((u) => `${u.firstName} ${u.lastName}`)
                .join(", ")}
            </UsernameList>
          )}
          <Button onClick={createNewUser}>Create new fake user</Button>
          <div className="text-neutral-500">
            {`${fakeUserData.firstName} ${fakeUserData.lastName}`},{" "}
            {fakeUserData.email}
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
